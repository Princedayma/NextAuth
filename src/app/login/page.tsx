"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false); // State for signup success

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/user/login", user);
      console.log("User logged in successfully:", response.data);
      setLoginSuccess(true); // Set signup success state
      // Optionally redirect after showing success message
      setTimeout(() => {
        router.push("/profile");
      }, 3000);
    } catch (error: any) {
      console.log("Error logging in:", error.message);
      setError("Incorrect email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-cyan-500">
      <div className="w-full max-w-md p-8 bg-yellow-200 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-800 mb-4 text-center">{loading ? "Processing" : "LogIn"}</h1>
        <div className="h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-2xl relative mb-4 animate-pulse	" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {loginSuccess && (
  <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-2xl relative my-1 animate-bounce" role="alert">
    <strong className="font-bold">Success:</strong>
    <span className="block sm:inline"> Signup successful!</span>
  </div>
)}

        <div className="mb-4 text-black">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 my-1">Email</label>
          <input
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="mb-6 text-black">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 my-1">Password</label>
          <input
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <button
          onClick={onLogin}
          className="w-full bg-cyan-400 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-cyan-500/100 transition duration-200"
          disabled={buttonDisabled}
        >
          {buttonDisabled ? "Fill in all fields" : "Log In"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          {/* Don't have an account ?{" "} */}
          <Link href="/SignUp" className="text-indigo-600 hover:text-indigo-800">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
