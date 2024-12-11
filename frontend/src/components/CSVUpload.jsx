import React, { useState } from "react";
import axios from "axios";

export default function CSVUpload({ onClose }) {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploadStatus("Uploading...");
      await axios.post("http://localhost:8000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadStatus("File uploaded successfully!");
    } catch (error) {
      setUploadStatus("Failed to upload file. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="relative bg-gradient-to-b from-[#3d0000] to-[#870000] text-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-500"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4">Upload CSV File</h2>
        <div className="space-y-4">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="bg-[#1a0000] text-white rounded-lg p-2 w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-500 file:text-white hover:file:bg-red-400"
          />
          <button
            onClick={handleUpload}
            className="bg-red-500 px-6 py-2 rounded-full text-white hover:bg-red-400"
          >
            Upload
          </button>
        </div>
        {uploadStatus && (
          <p
            className={`mt-4 ${
              uploadStatus.includes("successfully")
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {uploadStatus}
          </p>
        )}
      </div>
    </div>
  );
}



