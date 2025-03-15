"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Sidebar } from "./Sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Loader, TrendingUp } from "lucide-react";
import { getFileViewerLink } from "@/lib/utils";
import IFrame from "./Iframe";
import { useAuth } from "@/contexts/AuthContext";

export default function Page() {
  const { user } = useAuth()!;
  const router = useRouter();
  const url =
    "https://unempluzz-bucket.s3.ap-southeast-2.amazonaws.com/input/Adrian_Resume_2025.pdf?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLXNvdXRoZWFzdC0yIkcwRQIgf%2BUUV96bOq2aBUmKWg4AD1PERmskAPAJIYZ8mullWB8CIQDGCzB99NbZxrtIT5MOqPHgMHcoIXcsJ57emyjrLhz%2FqirQAwj8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDg5NzcyMjY2MzYzMyIMMeAC0xjQEcCr8a0CKqQD69iQSj8ZgNcpuV1obsPwaYq%2F8CSMWRFmM9FWQ5upxonBUYmf6b8XtevWepGmYqsmpPeClibaUCOJP3gJKsdWu%2BcVzKtonRepEhZQpvoCKGB1vhnRGWRwPTOkpGvCDNBeBIo0IcJuvTpS3g4fbvniPtULtH87k1DqE3o3s6PtNLiGPO8dAeqQk0inCpT5A4MOFxP3%2BoeXMWbqO2fA9lYSWd2jxW3Zfyl8atMmhlU4OTO42fNQg0tEs4lzusYxF05C63GxoqRX4KkSJW05OQ1%2F00RmGTU9WOlHn69HaPRuaJkxEhc9ZeLaAInp8WjlkuA79ebNjqUxTE6VbKMwYneOoRnZ7KxFzz1LGztvP%2FTBLcMlSkiJQlqpFvG1SmWCQ171%2BhbjMrItegskzbePZVZF%2B7qFrKWs5LJP5VuaCRcvV5LrW2Yz1Q3rHxVMBgDH5BwxYo6IEyTD0FvATfjrZqWa7E%2BRk6Io1xP7B0bEjAC4kKQ2nLFeumo3wcPc22epCYyaADrnTUsxijycxKIwhMBO9yx8ACyfOrs7z4POjsXJaEevrh0ZMO3e074GOuQCKoX2asbhBGTz0g5%2Bv%2F3r6rjo9ic%2F9CZTrDbdZjAaGxyQ6eGGJo2%2FsqU8cxbiA2V8R9U%2BxdzD%2BbHiqnDaCJiM0lGd%2BCqcz4RTeowcThTRlx66eAub%2Bi2MCwwntAQnl71W6BuTyJ9d4mxV%2FVO4ZpLdBmVx7ijZYg%2B6YkLVqC78lwdshLeyb%2Bfv5fM%2FISqZIcVlZ7b%2FZGlyjjKBI2PrsBJAFCM1XXO21Yu0y74D5QmIPqGmiBO750DclJ6cL5PCdI%2FohemPesZjrsPA7Enj3uIhHhjHzFtTXfWGb%2FRgDTZp8IhiTOZ5ckkTjy55uUGUyXhFfT%2F0ldv8LKkEQWLqyHIKXvNgCNnBsPEnEzK%2Bd8aPcn4%2FJV2aDQ0yODbL%2BMk8Zq7htNeYCeEhKZpXqh7ea8mQrvEyL7IGJ75LIwaZeTIhMvM0%2FoZfEuhKWxjzDAW5pbjP%2FR996A2uW3Sp1c2aHJtS3R7dBXM%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA5CBDQYLI37XGAA2R%2F20250315%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20250315T031016Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=a487928e19d16f32e96d8d7cfb4041d75d46fef4c4c37260b31290c4c040b08a";
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 justify-between items-center gap-2 pr-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 size-8" />
            <Separator orientation="vertical" />
            <h1>Yippee</h1>
          </div>
          <Button variant="outline">
            <TrendingUp />
            Graph View
          </Button>
        </header>
        {/* Main content/chatbot */}
        <IFrame
          className="h-full"
          fallback={
            <div className="flex justify-center items-center w-full h-full">
              <Loader className="animate-spin w-6 h-6" />
            </div>
          }
          src={getFileViewerLink(url)}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
