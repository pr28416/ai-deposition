import { Button } from "./button";
import FileTable from "./file-table";
import { UploadButton } from "./upload-button";

export default function Sidebar() {
  return (
    <div className="border-r w-full max-w-sm">
      <div className="p-4 flex flex-row items-center justify-between border-b">
        <div className="font-bold tracking-tight text-2xl">Depose AI</div>
        {/* <Button variant="outline">Upload</Button> */}
        <UploadButton />
      </div>

      {/* File table */}

      <div className=" p-4 flex flex-col">
        <FileTable />
      </div>
    </div>
  );
}
