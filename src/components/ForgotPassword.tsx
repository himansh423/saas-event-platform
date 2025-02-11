"use client";
import axios from "axios";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/auth/forgot-password", { email });
      setMessage(data.message);
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="text-white">
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="text-black"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
