"use client";

import { deleteFile, getFiles, uploadFile } from "@/app/actions";
import { type ClassValue, clsx } from "clsx";
import { Dispatch } from "react";
import { SetStateAction } from "react";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";

export type MessageProps = {
  sender: string;
  message: string;
  children_props?: ReactNode[];
};

export type SegmentProps = {
  start: number;
  end: number;
  video_path: string;
  text: string;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FilesContextProps {
  files: string[];
  messages: MessageProps[];
  addMessage: (message: MessageProps) => void;
  handleDeleteFile: (file: string) => void;
  handleUploadFile: (form: FormData) => void;
}

const FilesContext = createContext<FilesContextProps>({
  files: [],
  messages: [],
  addMessage: () => {},
  handleDeleteFile: () => {},
  handleUploadFile: () => {},
});

export const useFiles = () => useContext(FilesContext);

export default function FilesProvider({ children }: { children: ReactNode }) {
  const [files, setFiles] = useState<string[]>([]);
  const [messages, setMessages] = useState<MessageProps[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      await getFiles().then((res) => {
        setFiles(res.files);
      });
    };

    fetchFiles();
  }, []);

  const addMessage = (message: MessageProps) => {
    console.log("no");
    setMessages((prev) => [...prev, message]);
  };

  const handleDeleteFile = async (file: string) => {
    await deleteFile(file).then((_) => {
      setFiles(files.filter((f) => f !== file));
    });
  };
  const handleUploadFile = async (form: FormData) => {
    await uploadFile(form).then((res) => {
      setFiles([...files, (form.get("file") as File).name]);

      const testMessage = res.segments
        .map(
          (s: SegmentProps) =>
            `[start: ${s.start}, end: ${s.end}, video_path: ${s.video_path}, text: ${s.text}`
        )
        .join("\n");

      setMessages((prev) => [
        ...prev,
        {
          sender: "Depose AI",
          message: `Successfully uploaded:\n\n${testMessage}`,
        },
      ]);
    });
  };
  return (
    <FilesContext.Provider
      value={{
        files,
        handleDeleteFile,
        handleUploadFile,
        messages,
        addMessage,
      }}
    >
      {children}
    </FilesContext.Provider>
  );
}
