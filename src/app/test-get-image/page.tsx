"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";

type ImageData = {
  bannerUrl: string;
  logoUrl: string;
};

export default function ImageGallery() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("/api/get-presigned-url-to-get-images-from-s3");
        setImages(response.data);
      } catch (err) {
        console.error("Error fetching images:", err);
        setError("Failed to load images. Please try again later.");
      }
    };

    fetchImages();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Image Gallery</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
        {images.map((image, index) => (
          <div key={index}>
            <div>
              <h3>Banner</h3>
              <img
                src={image.bannerUrl}
                alt="Banner"
                style={{ width: "100%", height: "auto", borderRadius: "10px" }}
              />
            </div>
            <div>
              <h3>Logo</h3>
              <img
                src={image.logoUrl}
                alt="Logo"
                style={{ width: "100%", height: "auto", borderRadius: "10px" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
