"use client";

import { getFileViewerLink } from "@/lib/utils";
import { ChevronsRight, Loader } from "lucide-react";
import IFrame from "./Iframe";
import { Button } from "@/components/ui/button";
import { DataSource } from "./DataSourcesList";
import useQuery from "@/hooks/useRequest";
import { toast } from "sonner";

export default function DocumentViewerSidebar({
  file,
  setSelectedFile,
}: {
  file: DataSource;
  setSelectedFile: (file?: DataSource) => void;
}) {
  const { data: url, error } = useQuery(`/project/data/${file.dataSourceId}`);

  if (error) {
    toast.error("Cannot retrieve data for now. Try again later");
    return null;
  }

  return (
    <div className="min-w-[320px] border-l border-foreground/15 flex flex-col h-screen transition-transform duration-300 ease-in-out">
      <div className="p-3">
        <Button variant="ghost" onClick={() => setSelectedFile(undefined)}>
          <ChevronsRight />
        </Button>
      </div>
      {url ? (
        <IFrame
          className="h-full w-full"
          fallback={
            <div className="flex justify-center items-center ">
              <Loader className="animate-spin w-6 h-6" />
            </div>
          }
          src={getFileViewerLink(url)}
        />
      ) : (
        <div className="flex h-full w-full justify-center items-center ">
          <Loader className="animate-spin w-6 h-6" />
        </div>
      )}
    </div>
  );
}
