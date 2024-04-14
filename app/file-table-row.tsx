import { Button } from "@/components/ui/button";
import { FilePreview } from "@/components/ui/file-preview";
import { useFiles } from "@/lib/utils";
import { Trash } from "lucide-react";

export default function FileTableRow({ title: fileName }: { title: string }) {
  const { handleDeleteFile } = useFiles();

  const deleteFileClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleDeleteFile(fileName);
  };

  return (
    <div className="flex flex-row items-center justify-between w-full rounded-none">
      {/* <Button className="text-sm p-2 w-full justify-start" variant={"link"}>
        {fileName}
      </Button> */}
      <FilePreview fileName={fileName} />
      <Button size="icon" variant="ghost" onClick={deleteFileClicked}>
        <Trash size={20} />
      </Button>
    </div>
  );
}
