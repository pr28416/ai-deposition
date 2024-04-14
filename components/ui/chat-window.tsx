import { useFiles } from "@/lib/utils";
import Message from "../message";
import { Input } from "./input";
import { Button } from "./button";
import { Send } from "lucide-react";
import { useState } from "react";

export default function ChatWindow() {
  const { messages, addMessage } = useFiles();
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addMessage({ sender: "user", message: input });
  };

  return (
    <div className="flex flex-col h-full w-full overflow-none">
      {/* Chat window */}
      <div className="h-full overflow-x-scroll p-8 flex flex-col gap-4">
        {messages.map((message, index) => (
          <Message
            key={index}
            message={message.message}
            sender={message.sender}
          />
        ))}
      </div>
      {/* Chat box */}
      <form
        className="bg-background p-4 flex flex-row border-t flex-1"
        onSubmit={handleSubmit}
      >
        <Input
          placeholder="Ask DeposeAI"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" variant="default" size="icon" className="ml-2">
          <Send size={20} />
        </Button>
      </form>
    </div>
  );
}
