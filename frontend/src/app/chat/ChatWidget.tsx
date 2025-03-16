"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Loader, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { User } from "./ProfileDropdown";
import { request } from "@/hooks/useRequest";
import { toast } from "sonner";

const SenderChatBubble = ({ message }: { message: Message }) => (
  <div className="p-3 rounded-lg ml-auto w-fit max-w-[calc(100%_-_24px)] bg-primary text-foreground">
    {/* Chat Messages */}
    <p className="flex-1 text-right">{message.content}</p>
  </div>
);

const ReceiverChatBubble = ({ message }: { message: Message }) => (
  <div className="p-3 rounded-lg mr-auto w-fit max-w-[calc(100%_-_32px)] bg-secondary text-foreground">
    <span className="text-xs block text-muted-foreground">
      {message.sender.name}
    </span>
    {/* Chat Messages */}
    <p className="flex-1">{message.content}</p>
  </div>
);

// const SampleResponse = {
//   session_id: "56330982-1512-400c-983a-1c9ab2c0a849",
//   outputs: [
//     {
//       inputs: {
//         input_value:
//           "Can you tell me about what act utilitarianism is about and give me more references to look from",
//       },
//       outputs: [
//         {
//           results: {
//             message: {
//               text_key: "text",
//               data: {
//                 timestamp: "2025-03-15T08:36:37+00:00",
//                 sender: "Machine",
//                 sender_name: "AI",
//                 session_id: "56330982-1512-400c-983a-1c9ab2c0a849",
//                 text: 'Act utilitarianism is a moral theory that evaluates the rightness or wrongness of an action based on the consequences it produces. Specifically, an action is considered right if it results in greater overall utility (happiness or well-being) than any alternative action available in a given situation. This approach emphasizes the importance of assessing each individual action on its own merits, rather than adhering to general rules or guidelines.\n\nIn act utilitarianism, the focus is on the specific circumstances and outcomes of each action, which means that the same action may be deemed right in one context but wrong in another, depending on the consequences it produces. This flexibility allows for a nuanced approach to moral decision-making, but it also raises concerns about the potential for justifying actions that might be considered immoral if they lead to a greater overall good.\n\nFor further reading on act utilitarianism and its principles, you may consider the following references:\n\n1. **J. Bentham, "Introduction to the Principles of Morals and Legislation"** - This foundational text outlines the basic tenets of utilitarianism and addresses some of its challenges.\n   \n2. **J. S. Mill, "Utilitarianism"** - Mill expands on utilitarian principles and discusses the qualitative aspects of happiness, providing a more sophisticated view of the theory.\n\n3. **J. J. C. Smart, "Extreme and Restricted Utilitarianism"** - This work discusses act utilitarianism and its implications, as well as criticisms it faces from within the utilitarian framework.\n\n4. **R. M. Hare, "What is Wrong with Slavery"** - Hare\'s essay provides a critical examination of utilitarianism and its potential to justify morally questionable actions based on overall consequences.\n\n5. **W. Shaw, "Contemporary Ethics: Taking Account of Utilitarianism"** - This book offers an accessible introduction to utilitarianism, including act utilitarianism, and discusses its applications in contemporary ethical debates.\n\nThese texts will provide you with a deeper understanding of act utilitarianism, its principles, and the discussions surrounding its application in moral philosophy.',
//                 files: [],
//                 error: false,
//                 edit: false,
//                 properties: {
//                   text_color: "",
//                   background_color: "",
//                   edited: false,
//                   source: {
//                     id: "OpenAIModel-TTn3d",
//                     display_name: "OpenAI",
//                     source: "gpt-4o-mini",
//                   },
//                   icon: "OpenAI",
//                   allow_markdown: false,
//                   positive_feedback: null,
//                   state: "complete",
//                   targets: [],
//                 },
//                 category: "message",
//                 content_blocks: [],
//                 id: "8c7b8141-9db5-45a4-aced-ba6ce6f10870",
//                 flow_id: "56330982-1512-400c-983a-1c9ab2c0a849",
//               },
//               default_value: "",
//               text: 'Act utilitarianism is a moral theory that evaluates the rightness or wrongness of an action based on the consequences it produces. Specifically, an action is considered right if it results in greater overall utility (happiness or well-being) than any alternative action available in a given situation. This approach emphasizes the importance of assessing each individual action on its own merits, rather than adhering to general rules or guidelines.\n\nIn act utilitarianism, the focus is on the specific circumstances and outcomes of each action, which means that the same action may be deemed right in one context but wrong in another, depending on the consequences it produces. This flexibility allows for a nuanced approach to moral decision-making, but it also raises concerns about the potential for justifying actions that might be considered immoral if they lead to a greater overall good.\n\nFor further reading on act utilitarianism and its principles, you may consider the following references:\n\n1. **J. Bentham, "Introduction to the Principles of Morals and Legislation"** - This foundational text outlines the basic tenets of utilitarianism and addresses some of its challenges.\n   \n2. **J. S. Mill, "Utilitarianism"** - Mill expands on utilitarian principles and discusses the qualitative aspects of happiness, providing a more sophisticated view of the theory.\n\n3. **J. J. C. Smart, "Extreme and Restricted Utilitarianism"** - This work discusses act utilitarianism and its implications, as well as criticisms it faces from within the utilitarian framework.\n\n4. **R. M. Hare, "What is Wrong with Slavery"** - Hare\'s essay provides a critical examination of utilitarianism and its potential to justify morally questionable actions based on overall consequences.\n\n5. **W. Shaw, "Contemporary Ethics: Taking Account of Utilitarianism"** - This book offers an accessible introduction to utilitarianism, including act utilitarianism, and discusses its applications in contemporary ethical debates.\n\nThese texts will provide you with a deeper understanding of act utilitarianism, its principles, and the discussions surrounding its application in moral philosophy.',
//               sender: "Machine",
//               sender_name: "AI",
//               files: [],
//               session_id: "56330982-1512-400c-983a-1c9ab2c0a849",
//               timestamp: "2025-03-15T08:36:37+00:00",
//               flow_id: "56330982-1512-400c-983a-1c9ab2c0a849",
//               error: false,
//               edit: false,
//               properties: {
//                 text_color: "",
//                 background_color: "",
//                 edited: false,
//                 source: {
//                   id: "OpenAIModel-TTn3d",
//                   display_name: "OpenAI",
//                   source: "gpt-4o-mini",
//                 },
//                 icon: "OpenAI",
//                 allow_markdown: false,
//                 positive_feedback: null,
//                 state: "complete",
//                 targets: [],
//               },
//               category: "message",
//               content_blocks: [],
//             },
//           },
//           artifacts: {
//             message:
//               'Act utilitarianism is a moral theory that evaluates the rightness or wrongness of an action based on the consequences it produces. Specifically, an action is considered right if it results in greater overall utility (happiness or well-being) than any alternative action available in a given situation. This approach emphasizes the importance of assessing each individual action on its own merits, rather than adhering to general rules or guidelines.\n\nIn act utilitarianism, the focus is on the specific circumstances and outcomes of each action, which means that the same action may be deemed right in one context but wrong in another, depending on the consequences it produces. This flexibility allows for a nuanced approach to moral decision-making, but it also raises concerns about the potential for justifying actions that might be considered immoral if they lead to a greater overall good.\n\nFor further reading on act utilitarianism and its principles, you may consider the following references:\n\n1. **J. Bentham, "Introduction to the Principles of Morals and Legislation"** - This foundational text outlines the basic tenets of utilitarianism and addresses some of its challenges.\n\n   \n\n2. **J. S. Mill, "Utilitarianism"** - Mill expands on utilitarian principles and discusses the qualitative aspects of happiness, providing a more sophisticated view of the theory.\n\n3. **J. J. C. Smart, "Extreme and Restricted Utilitarianism"** - This work discusses act utilitarianism and its implications, as well as criticisms it faces from within the utilitarian framework.\n\n4. **R. M. Hare, "What is Wrong with Slavery"** - Hare\'s essay provides a critical examination of utilitarianism and its potential to justify morally questionable actions based on overall consequences.\n\n5. **W. Shaw, "Contemporary Ethics: Taking Account of Utilitarianism"** - This book offers an accessible introduction to utilitarianism, including act utilitarianism, and discusses its applications in contemporary ethical debates.\n\nThese texts will provide you with a deeper understanding of act utilitarianism, its principles, and the discussions surrounding its application in moral philosophy.',
//             sender: "Machine",
//             sender_name: "AI",
//             files: [],
//             type: "object",
//           },
//           outputs: {
//             message: {
//               message:
//                 'Act utilitarianism is a moral theory that evaluates the rightness or wrongness of an action based on the consequences it produces. Specifically, an action is considered right if it results in greater overall utility (happiness or well-being) than any alternative action available in a given situation. This approach emphasizes the importance of assessing each individual action on its own merits, rather than adhering to general rules or guidelines.\n\nIn act utilitarianism, the focus is on the specific circumstances and outcomes of each action, which means that the same action may be deemed right in one context but wrong in another, depending on the consequences it produces. This flexibility allows for a nuanced approach to moral decision-making, but it also raises concerns about the potential for justifying actions that might be considered immoral if they lead to a greater overall good.\n\nFor further reading on act utilitarianism and its principles, you may consider the following references:\n\n1. **J. Bentham, "Introduction to the Principles of Morals and Legislation"** - This foundational text outlines the basic tenets of utilitarianism and addresses some of its challenges.\n   \n2. **J. S. Mill, "Utilitarianism"** - Mill expands on utilitarian principles and discusses the qualitative aspects of happiness, providing a more sophisticated view of the theory.\n\n3. **J. J. C. Smart, "Extreme and Restricted Utilitarianism"** - This work discusses act utilitarianism and its implications, as well as criticisms it faces from within the utilitarian framework.\n\n4. **R. M. Hare, "What is Wrong with Slavery"** - Hare\'s essay provides a critical examination of utilitarianism and its potential to justify morally questionable actions based on overall consequences.\n\n5. **W. Shaw, "Contemporary Ethics: Taking Account of Utilitarianism"** - This book offers an accessible introduction to utilitarianism, including act utilitarianism, and discusses its applications in contemporary ethical debates.\n\nThese texts will provide you with a deeper understanding of act utilitarianism, its principles, and the discussions surrounding its application in moral philosophy.',
//               type: "text",
//             },
//           },
//           logs: {
//             message: [],
//           },
//           messages: [
//             {
//               message:
//                 'Act utilitarianism is a moral theory that evaluates the rightness or wrongness of an action based on the consequences it produces. Specifically, an action is considered right if it results in greater overall utility (happiness or well-being) than any alternative action available in a given situation. This approach emphasizes the importance of assessing each individual action on its own merits, rather than adhering to general rules or guidelines.\n\nIn act utilitarianism, the focus is on the specific circumstances and outcomes of each action, which means that the same action may be deemed right in one context but wrong in another, depending on the consequences it produces. This flexibility allows for a nuanced approach to moral decision-making, but it also raises concerns about the potential for justifying actions that might be considered immoral if they lead to a greater overall good.\n\nFor further reading on act utilitarianism and its principles, you may consider the following references:\n\n1. **J. Bentham, "Introduction to the Principles of Morals and Legislation"** - This foundational text outlines the basic tenets of utilitarianism and addresses some of its challenges.\n\n   \n\n2. **J. S. Mill, "Utilitarianism"** - Mill expands on utilitarian principles and discusses the qualitative aspects of happiness, providing a more sophisticated view of the theory.\n\n3. **J. J. C. Smart, "Extreme and Restricted Utilitarianism"** - This work discusses act utilitarianism and its implications, as well as criticisms it faces from within the utilitarian framework.\n\n4. **R. M. Hare, "What is Wrong with Slavery"** - Hare\'s essay provides a critical examination of utilitarianism and its potential to justify morally questionable actions based on overall consequences.\n\n5. **W. Shaw, "Contemporary Ethics: Taking Account of Utilitarianism"** - This book offers an accessible introduction to utilitarianism, including act utilitarianism, and discusses its applications in contemporary ethical debates.\n\nThese texts will provide you with a deeper understanding of act utilitarianism, its principles, and the discussions surrounding its application in moral philosophy.',
//               sender: "Machine",
//               sender_name: "AI",
//               session_id: "56330982-1512-400c-983a-1c9ab2c0a849",
//               stream_url: null,
//               component_id: "ChatOutput-KYRZx",
//               files: [],
//               type: "text",
//             },
//           ],
//           timedelta: null,
//           duration: null,
//           component_display_name: "Chat Output",
//           component_id: "ChatOutput-KYRZx",
//           used_frozen_result: false,
//         },
//       ],
//     },
//   ],
// };

export type Message = {
  messageId: string;
  content: string;
  sender: User;
  createdAt: string;
};

export default function ChatWidget({ projectId }: { projectId: string }) {
  const { user } = useAuth();

  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setContent("");

    try {
      const { data: newMessage, error } = await request(
        "POST",
        `/project/${projectId}/send`,
        { content }
      );

      if (error) {
        return toast(error);
      }
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } catch {
      toast("There's something wrong. Please try again.");
      return;
    } finally {
      setIsLoading(false);
    }

    setMessages((prevMessages) => [...prevMessages]);
  };

  return (
    <main className="p-3">
      {/* Chat messages */}
      <div className="h-[calc(100vh_-_200px)] space-y-2 justify-end p-3 overflow-y-auto">
        {messages.map((message, index) =>
          message.sender.userId === user?.userId ? (
            <ReceiverChatBubble key={index} message={message} />
          ) : (
            <SenderChatBubble key={index} message={message} />
          )
        )}
      </div>
      {/* Input */}
      <form
        name="chat-form"
        className="h-28 rounded-lg flex items-start gap-4 p-4 px-5 bg-foreground/5 border border-foreground/15"
        onSubmit={handleOnSubmit}
      >
        <textarea
          name="chat-input"
          className="flex-1 outline-none resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={isLoading ? "Sending..." : "Send a message..."}
          rows={3}
        />
        <Button
          type="submit"
          variant="default"
          className="rounded-full"
          disabled={!content.length || isLoading}
        >
          {isLoading ? <Loader className="animate-spin" /> : <Send />}
        </Button>
      </form>
    </main>
  );
}
