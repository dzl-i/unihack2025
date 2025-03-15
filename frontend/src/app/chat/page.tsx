"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { request } from "@/hooks/useRequest";
import { Loader } from "lucide-react";

export default function ChatRedirect() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFirstProject = async () => {
      try {
        const { data, error } = await request("GET", "/project/list");

        if (error || !data || data.length === 0) {
          // TODO: If no projects or error, redirect to project creation page WHICH IS NOT CURRENTLY IMPLEMENTED
          router.push("/");
        } else {
          // Redirect to the first project's chat
          const firstProjectId = data[0].projectId;
          router.push(`/chat/${firstProjectId}`);
        }
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        // TODO: Fallback to project creation on error WHICH IS NOT CURRENTLY IMPLEMENTED
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFirstProject();
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      {isLoading ? (
        <div className="flex flex-col items-center gap-4">
          <Loader className="h-8 w-8 animate-spin" />
          <p className="text-muted-foreground">Loading your projects...</p>
        </div>
      ) : (
        <p className="text-muted-foreground">Redirecting...</p>
      )}
    </div>
  );
}
