import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./input";
import { Label } from "./label";
import { useRef, useTransition } from "react";
import { uploadFile } from "@/app/actions";
import { DialogClose } from "@radix-ui/react-dialog";
import { useFiles } from "@/lib/utils";

export function UploadButton() {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [pending, startTransition] = useTransition();
  const { handleUploadFile: addFile } = useFiles();

  const handleFileUpload = () => {
    if (hiddenFileInput.current === null) return;
    const file = hiddenFileInput.current.files?.[0];
    if (!file) return;
    const form = new FormData();
    form.append("file", file);
    // uploadFile(file);

    startTransition(() => addFile(form));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Upload</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark bg-background text-foreground">
        <DialogHeader>
          <DialogTitle>Upload media</DialogTitle>
          <DialogDescription>
            Upload your case document or deposition video.
          </DialogDescription>
        </DialogHeader>
        <Input
          type="file"
          accept=".mp4,.pdf"
          className="dark:file:text-muted-foreground"
          ref={hiddenFileInput}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleFileUpload}>Upload</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
