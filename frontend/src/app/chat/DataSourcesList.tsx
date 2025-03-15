"use client";

import { File, Loader, Search, Trash2, Upload } from "lucide-react";
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
import { toast } from "sonner";
import { DocumentFile } from "./DocumentViewerSidebar";
import { useParams } from "next/navigation";
import { request } from "@/hooks/useRequest";

export type Data = {
  name: string;
  description: string;
  fileType: string;
  url: string;
};

const mapFileTypeToIcon = (fileType: string): { icon: React.ElementType } => {
  switch (fileType) {
    default:
      return { icon: File };
  }
};

export default function DataSourcesList({
  onFileSelected,
}: {
  onFileSelected: (file: DocumentFile) => void;
}) {
  const { project_id } = useParams();
  const [datas, setDatas] = useState<Data[]>([]);
  const [input, setInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", files[0]);
      
      const { data, error } = await request("POST", `/project/${project_id}/upload`, formData);

      if (error) {
        toast.error("Failed to upload files");
      } else {
        setDatas((prev) => [...prev, data]);
        toast.success("File uploaded successfully");
      }
    } catch (err) {
      toast.error("Something is wrong. Try again");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="flex items-center rounded-md border border-foreground/15 py-1 px-2">
        <Search className="w-5 h-5 mx-2" />
        <Input
          id="search-data-sources"
          name="search-data-sources"
          className="ring-0 focus-visible:ring-0 border-none bg-transparent dark:bg-transparent"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search..."
        />
      </div>
      {/* Simplified upload button */}
      <div className="w-full">
        <Button
          className="w-full p-0"
          variant="secondary"
          disabled={isUploading}
        >
          <label
            className="flex gap-2 items-center justify-center p-2 w-full cursor-pointer"
            htmlFor="file-upload"
          >
            {isUploading ? <Loader className="animate-spin" /> : <Upload />}
            {isUploading ? "Uploading..." : "Add Data Source"}
          </label>
        </Button>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept=".pdf,.png,.jpg,.jpeg,.txt,.md,.docx"
          onChange={handleFileUpload}
        />
      </div>
      {/* Data source list */}
      <div className="overflow-y-auto flex flex-col gap-2">
        {datas.map((data, index) => {
          const dataIcon = mapFileTypeToIcon(data.fileType);
          return (
            <div
              key={index}
              className="w-full h-auto flex items-center gap-3 p-4 rounded-lg cursor-pointer hover:bg-secondary"
              onClick={() => onFileSelected({ name: data.name, url: data.url })}
            >
              <dataIcon.icon className="min-w-6 min-h-6" />
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate text-sm">{data.name}</p>
                <p className="truncate text-xs opacity-50">
                  {data.description}
                </p>
              </div>
              <Dialog>
                <DialogTrigger>
                  <Trash2 className="min-w-6 min-h-6 text-destructive cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                  <DialogTitle>Delete Confirmation</DialogTitle>
                  <DialogDescription>Are you sure you want to delete this file?</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="ghost">Cancel</Button>
                    </DialogClose>
                    <Button variant="destructive">Remove</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          );
        })}
      </div>
    </div>
  );
}
