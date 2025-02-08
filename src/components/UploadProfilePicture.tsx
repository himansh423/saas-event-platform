"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Rowdies } from "next/font/google"
import { Camera } from "lucide-react"
import type React from "react" // Added import for React

const rowdies = Rowdies({
  weight: "700",
  subsets: ["latin"],
})

export default function ProfileUpload() {
  const [image, setImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    // Implement save functionality here
    console.log("Saving profile picture:", image)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1
          className={`${rowdies.className} text-3xl mb-8 text-center bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent`}
        >
          Upload Profile Picture
        </h1>

        <div className="relative w-64 h-64 mx-auto mb-8">
          <div className="w-full h-full rounded-full border-4 border-blue-500 overflow-hidden relative">
            {image ? (
              <div className="w-full h-full rounded-full overflow-hidden">
                <Image
                  src={image || "/placeholder.svg"}
                  alt="Profile"
                  fill
                  className="rounded-full object-cover"
                  sizes="256px"
                />
              </div>
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center rounded-full">
                <Camera size={64} className="text-gray-400" />
              </div>
            )}
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition-colors duration-200"
          >
            <Camera size={24} />
          </button>
        </div>

        <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full bg-gradient-to-r from-blue-400 to-[#0c1feb] text-white rounded-md py-2 px-4 mb-4 hover:from-blue-500 hover:to-[#0d20ff] transition-all duration-200"
        >
          <span className={rowdies.className}>Choose Image</span>
        </button>

        <button
          onClick={handleSave}
          disabled={!image}
          className={`w-full bg-gradient-to-r from-blue-400 to-[#0c1feb] text-white rounded-md py-2 px-4 ${
            image ? "hover:from-blue-500 hover:to-[#0d20ff]" : "opacity-50 cursor-not-allowed"
          } transition-all duration-200`}
        >
          <span className={rowdies.className}>Set Profile Picture</span>
        </button>
      </div>
    </div>
  )
}

