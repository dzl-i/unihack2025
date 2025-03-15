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
import { toast } from "sonner";

export type Data = {
  name: string;
  description: string;
  fileType: string;
  url?: string;
};

const mapFileTypeToIcon = (fileType: string): { icon: React.ElementType } => {
  switch (fileType) {
    default:
      return { icon: File };
  }
};

export default function DataSourcesList({ onFileSelect }: { onFileSelect: (url: string) => void }) {
  const [datas, setDatas] = useState<Data[]>([]);
  const [input, setInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', files[0]);
      
      const response = await fetch('http://localhost:3000/project/1/upload', {
        method: 'POST',
        credentials: 'include',
        headers: {
          // Don't set Content-Type when sending FormData
          // Let the browser set it with the correct boundary
        },
        body: formData
      });

      const responseText = await response.text();
      console.log("Response:", responseText);
      
      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status} - ${responseText}`);
      }

      const data = JSON.parse(responseText);
      setDatas(prev => [...prev, data]);
      toast.success('File uploaded successfully');
      
    } catch (error: unknown) {
      console.error('Upload error:', error);
      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      toast.error('Failed to upload file: ' + message);
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
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept=".pdf,.png,.jpg,.jpeg,.txt"
          onChange={handleFileUpload}
        />
        <label htmlFor="file-upload">
          <Button 
            className="w-full" 
            variant="secondary"
            disabled={isUploading}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <Upload className={isUploading ? 'animate-spin' : ''} />
            {isUploading ? 'Uploading...' : 'Add Data Source'}
          </Button>
        </label>
      </div>
      {/* Data source list */}
      <div className="overflow-y-auto">
        {datas.map((data, index) => {
          const dataIcon = mapFileTypeToIcon(data.fileType);
          return (
            <Button 
              key={index} 
              variant="ghost" 
              className="w-full h-auto"
              onClick={() => data.url && onFileSelect(data.url)}
            >
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
