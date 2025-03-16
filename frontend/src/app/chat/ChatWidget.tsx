"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Loader, Send } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { User } from "./ProfileDropdown";
import { request } from "@/hooks/useRequest";
import { toast } from "sonner";
import { Project } from "./SidebarContent";

const SenderChatBubble = ({ message }: { message: Message }) => (
  <div className="p-3 rounded-lg ml-auto w-fit max-w-[calc(100%_-_24px)] bg-purple-gradient-bottom text-foreground">
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

export type Message = {
  content: string;
  sender: User;
};

export default function ChatWidget({ project }: { project: Project }) {
  const { user } = useAuth();

  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages(project ? project.messages : []);
  }, [project]);

  if (!project || !user) {
    return (
      <div className="h-full w-full flex gap-2 justify-center items-center opacity-50">
        <Loader className="animate-spin" />
        Loading chat...
      </div>
    );
  }

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setContent("");

    // Add user messages
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        content,
        sender: user,
      },
    ]);

    try {
      const { data: aiMessage, error } = await request(
        "POST",
        `/project/${project.projectId}/send`,
        { content }
      );

      if (error) {
        return toast(error);
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          content: aiMessage.content,
          sender: aiMessage.sender,
        },
      ]);
    } catch {
      toast("There's something wrong. Please try again.");
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="p-3">
      {/* Chat messages */}
      <div className="h-[calc(100vh_-_200px)] space-y-2 justify-end p-3 overflow-y-auto">
        {messages.map(({ content, sender }, index) =>
          sender.userId === user?.userId ? (
            <SenderChatBubble key={index} message={{ content, sender }} />
          ) : (
            <ReceiverChatBubble key={index} message={{ content, sender }} />
          )
        )}
        {/* Loading response */}
        {isLoading && (
          <div className="p-3 rounded-lg mr-auto w-fit max-w-[calc(100%_-_32px)] bg-secondary text-foreground">
            {/* Chat Messages */}
            <p className="flex-1 opacity-50">CollabAI is thinking...</p>
          </div>
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
          placeholder={isLoading ? "Sending..." : "Send a .."}
          rows={3}
        />
        <Button
          type="submit"
          variant="default"
          className="rounded-full bg-purple-gradient-bottom"
          disabled={!content.length || isLoading}
        >
          {isLoading ? <Loader className="animate-spin" /> : <Send />}
        </Button>
      </form>
    </main>
  );
}
