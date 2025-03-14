"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function AddEmailsInput({
  emails,
  setEmails,
}: {
  emails: string[];
  setEmails: (emails: string[]) => void;
}) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const isValidEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);

  const addEmail = (email: string) => {
    setEmails([...emails, email]);
    setInput("");
    requestAnimationFrame(() => {
      inputRef.current?.focus(); // Return focus to input
    });
  };

  const removeEmail = (index: number) => {
    const newEmails = [...emails];
    newEmails.splice(index, 1);
    setEmails(newEmails);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const normalizedInput = input.toLowerCase();
    if (
      e.key === "Enter" &&
      normalizedInput != null &&
      isValidEmail(normalizedInput) &&
      !emails.includes(normalizedInput)
    ) {
      e.preventDefault();
      addEmail(normalizedInput);
    } else if (e.key === "Backspace" && !normalizedInput && emails.length > 0) {
      removeEmail(emails.length - 1);
    }
  };

  return (
    <div className="min-h-16 p-4 rounded-md flex flex-wrap gap-2 items-center border border-foreground/15">
      {emails.map((email, index) => (
        <div
          key={index}
          className="bg-foreground/5 rounded-md pl-2 border border-accent max-w-full flex items-center"
        >
          <span className="text-sm truncate max-w-32">{email}</span>
          <Button variant="ghost" onClick={() => removeEmail(index)}>
            <X className="h-3 w-3" />
          </Button>
        </div>
      ))}

      <input
        ref={inputRef}
        type="text"
        className="flex-1 min-w-32 bg-transparent text-sm border-none outline-none"
        placeholder={emails.length ? "" : "Add people by email..."}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleOnKeyDown}
      />
    </div>
  );
}
