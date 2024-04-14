"use client";

import { useMemo, useState, useEffect } from "react";
import { getFile } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function FilePreview({ fileName }: { fileName: string }) {
  const isVideo = fileName.endsWith(".mp4");
  const [fileData, setFileData] = useState<string | undefined>();

  useEffect(() => {
    const fetchFile = async () => {
      const fetchedFile = await getFile(fileName);
      if (fetchedFile) {
        if (fileName.endsWith(".mp4")) {
          setFileData(
            `data:video/mp4;base64,${Buffer.from(fetchedFile).toString(
              "base64"
            )}`
          );
        } else {
          setFileData(
            `data:application/pdf;base64,${Buffer.from(fetchedFile).toString(
              "base64"
            )}`
          );
        }
      }
    };
    fetchFile();
  }, [fileName]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="text-sm p-2 justify-start text-foreground truncate flex-1"
          variant="link"
        >
          {fileName}
        </Button>
      </DialogTrigger>
      <DialogContent
        className={cn(
          "max-w-2xl text-foreground max-h-[50rem] flex flex-col",
          isVideo ? "" : "h-full"
        )}
      >
        <DialogHeader className="flex-1">
          <DialogTitle>{fileName}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center h-full">
          {isVideo ? (
            <video
              className="w-full rounded-lg border"
              controls
              src={fileData}
              // src={`http://localhost:80/files/${fileName}`}
            />
          ) : (
            <object
              className="w-full h-full rounded-lg border"
              data={fileData}
              rel="noopener noreferrer"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
