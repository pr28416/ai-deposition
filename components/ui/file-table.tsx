import FileTableRow from "@/app/file-table-row";
import { useFiles } from "@/lib/utils";

export default function FileTable() {
  const { files, handleDeleteFile: deleteFile } = useFiles();
  return files.length ? (
    <div className="border rounded divide-y">
      {files.map((file, idx) => (
        <FileTableRow key={idx} title={file}></FileTableRow>
      ))}
    </div>
  ) : (
    <div className="text-center text-sm text-muted-foreground rounded border p-2 italic">
      No files found
    </div>
  );
}
