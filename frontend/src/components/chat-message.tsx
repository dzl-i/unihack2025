import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "bot";
  content: string;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  return (
    <div
      className={cn("flex", role === "user" ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-lg p-3",
          role === "user" ? "bg-primary text-white" : "bg-muted text-white"
        )}
      >
        {role === "bot" && (
          <div className="flex items-center gap-2 mb-1">
            <div className="bg-primary rounded-md p-0.5">
              <div className="h-3 w-3 text-white flex items-center justify-center text-[8px] font-bold">
                AI
              </div>
            </div>
            <span className="text-xs font-medium">Hello Ici Pino Ta</span>
          </div>
        )}
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );
}
