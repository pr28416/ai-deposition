"use client";

import Message from "@/components/message";
import { Button } from "@/components/ui/button";
import ChatWindow from "@/components/ui/chat-window";
import { Input } from "@/components/ui/input";
import Sidebar from "@/components/ui/sidebar";
import FilesProvider, { MessageProps, useFiles } from "@/lib/utils";
import {
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  Send,
} from "lucide-react";
import { useState } from "react";

export default function Home() {
  // const [messages, setMessages] = useState<MessageProps[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  return (
    <FilesProvider>
      <main className="h-screen flex flex-row text-foreground bg-background dark overflow-none">
        {/* Sidebar */}
        {sidebarOpen && <Sidebar />}
        {/* Main */}
        <div className="flex flex-col w-full">
          {/* Nav bar */}
          <div className="flex flex-row p-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSidebarOpen((s) => !s)}
            >
              {sidebarOpen ? (
                <PanelLeftClose size={20} />
              ) : (
                <PanelLeftOpen size={20} />
              )}
            </Button>
          </div>
          <ChatWindow />
        </div>
      </main>
    </FilesProvider>
  );
}
