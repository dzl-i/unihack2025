"use client";

import { File, Search, Trash2, Upload } from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
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

export type Data = {
  name: string;
  description: string;
  fileType: string;
};

const mapFileTypeToIcon = (fileType: string): { icon: React.ElementType } => {
  switch (fileType) {
    default:
      return { icon: File };
  }
};

export default function DataSourcesList() {
  const datas: Data[] = [];
  const [input, setInput] = useState("");

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="flex items-center rounded-md border border-foreground/15 py-1 px-2">
        <Search className="w-5 h-5 mx-2" />
        <Input
          id="search-data-sources"
          name="search-data-sources"
          className="ring-0 focus-visible:ring-0 border-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search..."
        />
      </div>
      {/* Add data source */}
      <Button className="border border-foreground/5 w-full" variant="secondary">
        <Upload />
        Add Data Source
      </Button>
      {/* Data source list */}
      <div className="overflow-y-auto">
        {datas.map((data, index) => {
          const dataIcon = mapFileTypeToIcon(data.fileType);
          return (
            <Button key={index} variant="ghost" className="w-full h-auto">
              <dataIcon.icon className="min-w-6 min-h-6" />
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate font-medium">{data.name}</p>
                <p className="truncate text-sm opacity-50">
                  {data.description}
                </p>
              </div>
              <Dialog>
                <DialogTrigger>
                  <Trash2 className="min-w-6 min-h-6 text-destructive" />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Yippee</DialogTitle>
                    <DialogDescription>ts pmo icl</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="ghost">Cancel</Button>
                    </DialogClose>
                    <Button variant="destructive">Remove</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
