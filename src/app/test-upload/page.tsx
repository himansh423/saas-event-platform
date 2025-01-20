"use client"
import React, { useState } from "react";
import axios from "axios";

const UploadComponent = () => {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const handleFileUpload = async () => {
    if (!logoFile || !bannerFile) {
      setUploadStatus("Please select both logo and banner files.");
      return;
    }

    try {
      // Step 1: Get pre-signed URLs
      const { data } = await axios.post("/api/get-presigned-url-to-upload-on-s3", {
        logoFileName: logoFile.name,
        logoFileType: logoFile.type,
        bannerFileName: bannerFile.name,
        bannerFileType: bannerFile.type,
      });

      const { logoUploadUrl, bannerUploadUrl, logoKey, bannerKey } = data;

      // Step 2: Upload files to S3
      await axios.put(logoUploadUrl, logoFile, {
        headers: { "Content-Type": logoFile.type },
      });

      await axios.put(bannerUploadUrl, bannerFile, {
        headers: { "Content-Type": bannerFile.type },
      });

      // Step 3: Save keys to database
      const saveResponse = await axios.post("/api/save-to-database", {
        logoKey,
        bannerKey,
      });

      if (saveResponse.data.message) {
        setUploadStatus("Files uploaded and keys saved to the database successfully!");
      }
    } catch (error) {
      console.error("Error uploading files or saving to database:", error);
      setUploadStatus("Failed to upload files or save keys to the database.");
    }
  };

  return (
    <div>
      <h1>Upload Logo and Banner</h1>
      <div>
        <label>Logo:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
        />
      </div>
      <div>
        <label>Banner:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setBannerFile(e.target.files?.[0] || null)}
        />
      </div>
      <button className="bg-white text-black" onClick={handleFileUpload}>Upload Files</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default UploadComponent;
