"use client";

import { File, Loader, Search, Trash2, Upload } from "lucide-react";
import React, { useEffect, useState } from "react";
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
import { request } from "@/hooks/useRequest";
import { Project } from "./SidebarContent";
import { Skeleton } from "@/components/ui/skeleton";

export type DataSource = {
  dataSourceId: string;
  name: string;
};

export default function DataSourcesList({
  project,
  onFileSelected,
}: {
  project: Project;
  onFileSelected: (file: DataSource) => void;
}) {
  const [datas, setDatas] = useState<DataSource[]>(
    project ? project.dataSources : []
  );
  const [input, setInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", files[0]);

      const { data, error } = await request(
        "POST",
        `/project/${project.projectId}/upload`,
        formData
      );

      if (error) {
        toast.error("Failed to upload files");
      } else {
        // Make sure data has the correct structure
        const newDataSource: DataSource = {
          dataSourceId: data.dataSourceId || data.id || data._id,
          name: data.name || files[0].name,
        };

        setDatas((prev) => [...prev, newDataSource]);
        toast.success("File uploaded successfully");
      }
    } catch (err) {
      toast.error("Something is wrong. Try again");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (dataSourceId: string) => {
    setDeletingId(dataSourceId);
    try {
      const { error } = await request(
        "DELETE",
        `/project/data/${dataSourceId}`
      );

      if (error) {
        toast.error(
          `${error}\nProjectId: ${project.projectId}\ndataSourceId: ${dataSourceId}`
        );
      } else {
        setDatas((prev) =>
          prev.filter((ds) => ds.dataSourceId !== dataSourceId)
        );
        toast.success("Data source deleted successfully");
      }
    } catch (err) {
      toast.error("Something went wrong. Try again");
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    setDatas(project ? project.dataSources : []);
  }, [project]);

  // Add this filtered data sources logic before the return statement
  const filteredDataSources = datas.filter((data) =>
    data.name.toLowerCase().includes(input.toLowerCase())
  );

  if (!project) {
    return <Skeleton className="bg-purple-500" />;
  }

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
      <div className="overflow-y-auto">
        {filteredDataSources.map((data, index) => (
          <div
            key={index}
            className="w-full h-auto flex gap-2 duration-100 cursor-pointer hover:bg-foreground/15 p-3 rounded-lg"
            onClick={() => onFileSelected(data)}
          >
            <File className="w-4 h-4" />
            <div className="min-w-0 flex-1 text-left">
              <p className="truncate font-light text-sm">{data.name}</p>
            </div>
            <Dialog>
              <DialogTrigger>
                <Trash2 className="w-4 h-4 text-destructive cursor-pointer" />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Delete Data Source</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete &quot;{data.name}&quot;?
                    This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="ghost">Cancel</Button>
                  </DialogClose>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(data.dataSourceId)}
                    disabled={deletingId === data.dataSourceId}
                  >
                    {deletingId === data.dataSourceId
                      ? "Deleting..."
                      : "Delete"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ))}
        {filteredDataSources.length === 0 && input && (
          <div className="text-center py-4 text-sm text-muted-foreground">
            No data sources found matching: {input}
          </div>
        )}
      </div>
    </div>
  );
}
