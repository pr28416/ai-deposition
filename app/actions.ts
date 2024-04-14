"use server";

export async function uploadFile(form: FormData) {
  try {
    const response = await fetch("http://localhost:80/upload", {
      method: "POST",
      body: form,
    });
    return response.json();
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}

export async function deleteFile(file: string) {
  try {
    await fetch(`http://localhost:80/delete?file=${encodeURIComponent(file)}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error deleting file:", error);
  }
}

export async function getFiles() {
  try {
    const response = await fetch("http://localhost:80/files");
    return response.json();
  } catch (error) {
    console.error("Error getting files:", error);
  }
}

export async function getFile(fileName: string) {
  try {
    const response = await fetch(`http://localhost:80/files/${fileName}`, {
      headers: {
        "Content-Disposition": "inline",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const byteArray = new Uint8Array(arrayBuffer);
    const array = Array.from(byteArray);
    return array;
  } catch (error) {
    console.error("Error getting file:", error);
  }
}
