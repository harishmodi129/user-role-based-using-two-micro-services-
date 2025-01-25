import React, { useState } from "react";
import axios from "axios";

const UploadView = () => {
  const [file, setFile] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) return alert("Please select a file first");
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Correct the API endpoint to point to document-service
      await axios.post(
        `${process.env.REACT_APP_DOCUMENT_SERVICE_URL}/documents/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Token from localStorage
          },
        }
      );
      alert("Document uploaded successfully!");
    } catch (err) {
      console.error(
        "Error uploading document:",
        err.response?.data || err.message
      );
      alert("Error uploading document. Please try again.");
    }
  };

  return (
    <div>
      <h2>Upload Document</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadView;
