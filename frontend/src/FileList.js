import React, { useEffect, useState } from "react";

function FileList() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/files")
      .then((res) => res.json())
      .then((data) => setFiles(data))
      .catch((err) => console.error("Error fetching files:", err));
  }, []);

  return (
    <div className="mt-8 text-center">
      <h2 className="text-2xl font-bold mb-4">📂 Uploaded Files</h2>
      <ul className="space-y-2">
        {files.map((file) => (
          <li key={file._id} className="p-2 border rounded bg-gray-100">
            <a
              href={`http://localhost:5000/${file.path}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {file.filename}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileList;
