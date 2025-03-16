"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddEmailsInput from "./AddEmailsInput";
import { useState } from "react";

export default function AddCollaboratorsDialog() {
  const [emails, setEmails] = useState<string[]>([]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button className="border border-foreground/5" variant="secondary">
          <UserPlus />
          Add Collaborators
        </Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[540px]">
        <DialogHeader>
          <DialogTitle>Yippee</DialogTitle>
          <DialogDescription>ts pmo icl</DialogDescription>
        </DialogHeader>
        <AddEmailsInput emails={emails} setEmails={setEmails} />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button variant="default">Add Collaborators</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
