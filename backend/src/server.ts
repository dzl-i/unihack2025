// Server imports
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import errorHandler from 'middleware-http-errors';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';
import { get, Server } from 'http';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Server as SocketIOServer } from 'socket.io';
import multer from 'multer';
import { parse } from 'cookie';

// Swagger
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

// Helper functions
import { deleteToken, generateToken } from './helper/tokenHelper';
import { getUserById } from './helper/userHelper';

// Route imports
import { authRegister } from './auth/register';
import { authLogin } from './auth/login';
import { authLogout } from './auth/logout';
import { userProfile } from './user/profile';
import { projectCreate } from './project/create';
import { projectList } from './project/list';
import { projectDetails } from './project/details';
import { projectDelete } from './project/delete';
import { projectJoin } from './project/join';
import { projectSendMessage } from './project/send';
import { projectUploadDataSource } from './project/uploadData';
import { projectDeleteDataSource } from './project/deleteData';
import { projectGetData } from './project/getData';
import { projectAddCollaborator } from './project/addCollaborator';


interface MulterRequest extends Request {
  file?: Express.Multer.File;
}


// Database client
const prisma = new PrismaClient();

// Set up web app using JSON
const app = express();
const upload = multer({ storage: multer.memoryStorage() });


app.use(cookieParser());
// app.use(upload.single('file'));
app.use(express.json({ limit: '50mb' }));

const httpServer = new Server(app);

const io = new SocketIOServer(httpServer, {
  cors: {
    origin: ["http://localhost:3001", "https://collabai.denzeliskandar.com"],
    methods: ["GET", "POST"],
    credentials: true
  }
});


// Use middleware that allows for access from other domains
app.use(cors({
  origin: ["http://localhost:3001", "https://collabai.denzeliskandar.com"],
  credentials: true
}));


const PORT: number = parseInt(process.env.PORT || '3000');
const isProduction: boolean = process.env.NODE_ENV === "production";

const swaggerDocument = YAML.load(path.join(__dirname, '../api-docs.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


///////////////////////// ROUTES /////////////////////////


// HEALTH CHECK ROUTE
app.get('/', async (req: Request, res: Response) => {
  console.log("Health check")
  res.status(200).json({
    message: "Server is up!"
  });
});


// AUTH ROUTES

// Register a new user
app.post('/auth/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password, username, profilePic } = req.body;
    const user = await authRegister(name, email, password, username, profilePic || process.env.PROFILE_PIC_BASE64 as string);

    // Assign cookies
    res.cookie('accessToken', user.accessToken, { httpOnly: isProduction, path: "/", secure: isProduction, sameSite: isProduction ? "none" : "lax", domain: isProduction ? "collabai.denzeliskandar.com" : ".localhost", maxAge: 1800000 });
    res.cookie('refreshToken', user.refreshToken, { httpOnly: isProduction, path: "/", secure: isProduction, sameSite: isProduction ? "none" : "lax", domain: isProduction ? "collabai.denzeliskandar.com" : ".localhost", maxAge: 7776000000 });

    res.header('Access-Control-Allow-Credentials', 'true');

    res.status(200).json({ userId: user.userId, name: user.name, email: user.email, profilePic: user.profilePic });
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || "An error occurred." });
  }
});

// Login a user
app.post('/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authLogin(email, password);

    // Assign cookies
    res.cookie('accessToken', user.accessToken, { httpOnly: isProduction, path: "/", secure: isProduction, sameSite: isProduction ? "none" : "lax", domain: isProduction ? "collabai.denzeliskandar.com" : ".localhost", maxAge: 1800000 });
    res.cookie('refreshToken', user.refreshToken, { httpOnly: isProduction, path: "/", secure: isProduction, sameSite: isProduction ? "none" : "lax", domain: isProduction ? "collabai.denzeliskandar.com" : ".localhost", maxAge: 7776000000 });

    res.header('Access-Control-Allow-Credentials', 'true');

    res.status(200).json({ userId: user.userId, name: user.name, email: user.email, profilePic: user.profilePic });
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || "An error occurred." });
  }
});

// Logout a user
app.post('/auth/logout', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    const refreshToken = req.cookies.refreshToken;
    await authLogout(refreshToken);

    // Assign cookies
    res.clearCookie('accessToken', { domain: isProduction ? "collabai.denzeliskandar.com" : ".localhost" });
    res.clearCookie('refreshToken', { domain: isProduction ? "collabai.denzeliskandar.com" : ".localhost" });

    res.sendStatus(200);
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || "An error occurred." });
  }
});


// USER ROUTES

// Get user profile
app.get('/user/profile', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    const user = await userProfile(userId);

    res.status(200).json(user);
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || "An error occurred." });
  }
});


// PROJECT ROUTES

// Create a new project
app.post('/project', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    const { name } = req.body;
    const project = await projectCreate(userId, name);

    res.status(200).json(project);
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || "An error occurred." });
  }
});

// List all projects for a user
app.get('/project/list', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    const projects = await projectList(userId);

    res.status(200).json(projects);
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || "An error occurred." });
  }
});

// Get details of a project
app.get('/project/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    const projectId = req.params.id;

    const project = await projectDetails(userId, projectId);

    res.status(200).json(project);
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || "An error occurred." });
  }
});

// Delete a project
app.delete('/project/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    const projectId = req.params.id;

    const project = await projectDelete(userId, projectId);

    res.status(200).json(project);
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || "An error occurred." });
  }
});

// Join a project
app.post('/project/join', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    const { code } = req.body;

    const project = await projectJoin(userId, code);

    res.status(200).json(project);
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || "An error occurred." });
  }
});

// Send a message to a project
app.post('/project/:id/send', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    const projectId = req.params.id;
    const { content } = req.body;

    const message = await projectSendMessage(userId, projectId, content);

    res.status(200).json(message);
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || "An error occurred." });
  }
});

// Get a file from a project
app.get('/project/data/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const dataId = req.params.id;
    const url = await projectGetData(dataId);

    res.status(200).json(url);
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || "An error occurred." });
  }
});

// Upload a file to a project
app.post('/project/:id/upload', authenticateToken, upload.single('file'), async (req: MulterRequest, res: Response) => {
  try {
    const userId = res.locals.userId;
    const projectId = req.params.id;
    console.log("Uploaded file:", req.file);
    const file = await projectUploadDataSource(userId, projectId, req.file);

    res.status(200).json(file);
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || "An error occurred." });
  }
});

// Delete a file from a project
app.delete('/project/data/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    const dataId = req.params.id;

    const data = await projectDeleteDataSource(userId, dataId);

    res.status(200).json(data);
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || "An error occurred." });
  }
});

// Add a collaborator to a project
app.post('/project/:id/collaborator', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    const projectId = req.params.id;
    const { email } = req.body;

    const project = await projectAddCollaborator(userId, projectId, email);

    res.status(200).json(project);
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || "An error occurred." });
  }
});


///////////////////////// Socket.io /////////////////////////


io.use(async (socket, next) => {
  const rawCookies = socket.request.headers.cookie;
  const parsedCookies = parse(rawCookies || '');

  const accessToken = parsedCookies['accessToken'];

  try {
    // Verifying the token
    const decoded = jwt.verify(accessToken, process.env.ACCESS_JWT_SECRET as string) as JwtPayload;
    socket.data.userId = decoded.userId;

    const user = await getUserById(decoded.userId);
    if (!user) throw next(new Error('User not found'));
    
    socket.data.user = user;

    next();
  } catch (err) {
    next(new Error('Authentication error'));
  }
});

io.on('connection', (socket) => {
  console.log(`User ${socket.data.userId} (${socket.data.user.name}) connected`);

  // Join a project room
  socket.on('join', (projectId) => {
    socket.join(projectId);
    socket.to(projectId).emit('userJoined', {
      userId: socket.data.userId,
      name: socket.data.user.name
    });
    console.log(`User joined project: ${projectId}`);
  });

  // Leave a project room
  socket.on('leave', (projectId) => {
    socket.leave(projectId);
    socket.to(projectId).emit('userLeft', {
      userId: socket.data.userId,
      name: socket.data.user.name
    });
    console.log(`User left project: ${projectId}`);
  });

  // Upload a data source
  socket.on('upload', (projectId, data) => {
    console.log(`User uploaded data to project: ${projectId}`);
    io.to(projectId).emit('upload', data);
  });

  // Delete a data source
  socket.on('delete', (projectId, dataId) => {
    console.log(`User deleted data from project: ${projectId}`);
    io.to(projectId).emit('delete', dataId);
  });

  // Send a message/prompt
  socket.on('message', async (projectId, content) => {
    console.log(`User sent message to project: ${projectId}`);
    const message = await projectSendMessage(socket.data.userId, projectId, content);
    io.to(projectId).emit('message', message); // TODO: Add the response from Langflow API
  });

  socket.on('disconnect', () => {
    console.log(`user ${socket.data.user.name} disconnected`);
  });
});


///////////////////////// SERVER /////////////////////////


// Logging errors
app.use(morgan('dev'));

app.use(errorHandler());

// Start server
const server = httpServer.listen(PORT, () => {
  console.log(`⚡️ Server listening on port ${PORT}`);
});

// For coverage, handle Ctrl+C
process.on('SIGINT', () => {
  server.close(() => console.log('Shutting down server.'));
});

/* ------------------- HELPER FUNCTIONS ------------------- */
async function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken && !refreshToken) { res.status(401).json({ error: "No token provided." }); return; }

  try {
    const atDecoded = jwt.verify(accessToken, process.env.ACCESS_JWT_SECRET as string) as JwtPayload;

    if (atDecoded && atDecoded.userId) {
      const user = await prisma.user.findUnique({ where: { id: atDecoded.userId } });

      if (!user) { res.status(403).json({ error: "User not found." }); return; }

      if (user && user.remainingLoginAttempts <= 0) { res.status(403).json({ error: "User is blocked." }); return; }

      res.locals.userId = atDecoded.userId;
      return next();
    } else {
      // Access token not valid
      res.status(403).json({ error: "Invalid access token." });
      return;
    }
  } catch (err) {
    // If access token is expired or invalid, attempt to use refresh token
    if (!refreshToken) { res.status(401).json({ error: "No refresh token provided." }); return; }

    try {
      const rtDecoded = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET as string) as JwtPayload;

      if (rtDecoded && rtDecoded.userId) {
        // Generate new token pair
        const newTokens = await generateToken(rtDecoded.userId);

        // Delete the previous refresh token as they are single use only
        await deleteToken(refreshToken);

        // Set new cookies
        res.cookie('accessToken', newTokens.accessToken, { httpOnly: isProduction, path: "/", secure: isProduction, sameSite: isProduction ? "none" : "lax", domain: isProduction ? "collabai.denzeliskandar.com" : ".localhost", maxAge: 1800000 });
        res.cookie('refreshToken', newTokens.refreshToken, { httpOnly: isProduction, path: "/", secure: isProduction, sameSite: isProduction ? "none" : "lax", domain: isProduction ? "collabai.denzeliskandar.com" : ".localhost", maxAge: 7776000000 });

        res.locals.userId = rtDecoded.userId;
        return next();
      }
    } catch (refreshErr) {
      // Refresh token is invalid or expired
      res.status(403).json({ error: "Invalid refresh token. Please log in again." });
      return;
    }

    // For any other errors
    res.status(500).json({ error: "An unexpected error occurred when authenticating token." });
    return;
  }
}
