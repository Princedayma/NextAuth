"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import zxcvbn from "zxcvbn";
import PasswordStrengthBar from "react-password-strength-bar";

export default function SignUpPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const checkPasswordStrength = (password:any) => {
    const result = zxcvbn(password);
    return result.score >= 2;
  };

  const validateForm = () => {
    const { email, password, confirmPassword, username } = user;
    const isStrongPassword = checkPasswordStrength(password);
    const isConfirmPasswordMatch = password === confirmPassword;
    const isAllFieldsFilled = email && password && confirmPassword && username;
    return isStrongPassword && isConfirmPasswordMatch && isAllFieldsFilled;
  };

  const onChange = (e:any) => {
    const { id, value } = e.target;
    setUser((prev) => ({ ...prev, [id]: value }));
  };

  const onSignup = async () => {
    try {
      setLoading(true);
      setSignUpError("");
      const response = await axios.post("/api/user/signUp", user);
      console.log("User signed up successfully:", response.data);
      setSignUpSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error:any) {
      console.error(
        "Error signing up:",
        error.response?.data?.error || error.message
      );
      setSignUpError(error.response?.data?.error || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!validateForm());
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-cyan-500">
      <div className="w-full max-w-md p-8 bg-yellow-200 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-zinc-900">
          {loading ? "Processing..." : "Sign Up"}
        </h1>
        {signUpError && (
          <div
            className="bg-amber-100 border border-amber-400 text-amber-700 px-4 py-3 rounded-2xl relative animate-bounce"
            role="alert"
          >
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {signUpError}</span>
          </div>
        )}
        {signUpSuccess && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-2xl relative my-1 animate-bounce"
            role="alert"
          >
            <strong className="font-bold">Success:</strong>
            <span className="block sm:inline"> Signup successful! Redirecting...</span>
          </div>
        )}
        <hr className="mb-6" />

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={user.username}
            onChange={onChange}
            placeholder="Username"
            className="w-full px-3 py-2 border border-pink-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 text-black"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={user.email}
            onChange={onChange}
            placeholder="Email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 text-black"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={user.password}
            onChange={onChange}
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 text-black"
            required
          />
          <PasswordStrengthBar password={user.password} />
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={user.confirmPassword}
            onChange={onChange}
            placeholder="Confirm Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 text-black"
            required
          />
        </div>

        <button
          onClick={onSignup}
          disabled={buttonDisabled || loading}
          className={`w-full bg-cyan-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-cyan-700 transition duration-200 ${
            buttonDisabled || loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {buttonDisabled ? "Cannot Sign Up" : "Sign Up"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-600 hover:text-indigo-800">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
