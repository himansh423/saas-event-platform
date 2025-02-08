"use client"

import { useState } from "react"
import { Rowdies } from "next/font/google"

const rowdies = Rowdies({
  weight: "700",
  display: "swap",
  subsets: ["latin"],
})

export default function BioInputPage() {
  const [bio, setBio] = useState("")

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value
    if (input.length <= 100) {
      setBio(input)
    }
  }

  return (
    <div className="w-screen min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-gradient-to-br from-[#0c1feb]/20 to-blue-500/10 border border-[#0c1feb]/20 rounded-lg p-8">
        <h1
          className={`${rowdies.className} text-4xl text-center mb-6 bg-gradient-to-r from-blue-400 to-[#0c1feb] bg-clip-text text-transparent`}
        >
          Write about yourself - Bio
        </h1>
        <textarea
          value={bio}
          onChange={handleBioChange}
          placeholder="Enter your bio here (max 100 characters)"
          className="w-full h-40 bg-gray-950 border border-zinc-400 rounded-lg p-4 text-white text-xl resize-none focus:outline-none focus:border-blue-500"
          maxLength={100}
        />
        <p className="text-zinc-400 text-right mt-2">{bio.length}/100 characters</p>
      </div>
    </div>
  )
}

