"use client";

import { getFileViewerLink } from "@/lib/utils";
import { ChevronsRight, Loader } from "lucide-react";
import IFrame from "./Iframe";
import { Button } from "@/components/ui/button";

export type DocumentFile = {
  name: string;
  url: string;
};

export default function DocumentViewerSidebar({
  file,
  showDetails,
  setShowDetails,
}: {
  file: DocumentFile;
  showDetails: boolean;
  setShowDetails: (show: boolean) => void;
}) {
  const checkFileIsImage = (file: DocumentFile) => {
    if (file == null) {
      return false;
    }

    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const imageExtensions = ["jpg", "jpeg", "png"];

    return imageExtensions.includes(fileExtension || "");
  };

  return (
    <div className="min-w-[320px] border-l border-foreground/15 flex flex-col h-screen transition-transform duration-300 ease-in-out">
      <div className="p-3">
        <Button variant="ghost" onClick={() => setShowDetails(false)}>
          <ChevronsRight />
        </Button>
      </div>
      <IFrame
        className="h-full w-full"
        fallback={
          <div className="flex justify-center items-center ">
            <Loader className="animate-spin w-6 h-6" />
          </div>
        }
        src={getFileViewerLink(file.url)}
      />
    </div>
  );
}
