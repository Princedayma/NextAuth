"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { FaUserFriends } from "react-icons/fa";
import Link from "next/link";

interface Params {
  id: string;
}

export default function UserProfile({ params }: { params: Params }) {
  const { id } = params;
  const router = useRouter();

  const [data, setData] = useState("nothing");
  const [userInfo, setUserInfo] = useState({
    username: "DefaultUsername", // Default username placeholder
    email: "defaultemail@example.com", // Default email placeholder
  });

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const res = await axios.get(`/api/user/myself`);
      console.log(res.data);
      setData(res.data.data._id);
      setUserInfo({
        username: res.data.data.username, // Update with actual username
        email: res.data.data.email,       // Update with actual email
      });
    } catch (error) {
      console.error("Error fetching user details:", error);
      setData("Error fetching user data");
    }
  };

  const logout = async () => {
    try {
      await axios.get('/api/user/logout');
      toast.success('Logout succeeded successfully');
      router.push('/login');
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-cyan-500">
      <div className="w-full max-w-md p-8 bg-yellow-200 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-purple-700"><FaUserFriends />User Profile</h1>
        <hr className="mb-6" />

        <div className="mb-4">
          <h1>{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h1>
          <h2 className="text-xl font-semibold mb-2">{userInfo.username}</h2> {/* Display actual username */}
          <p className="text-sm text-gray-600 mb-1"><strong>Email:</strong> {userInfo.email}</p> {/* Display actual email */}
          <p className="text-sm text-gray-600"><strong>Bio:</strong> A passionate developer who loves coding and exploring new technologies.</p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700">User ID</h3>
          <p className="text-gray-500">{id}</p>
        </div>

        <button
          className="w-full my-4 bg-cyan-400 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-cyan-500/100 transition duration-200"
          onClick={getUserDetails}
        >
          UserDetails
        </button>
        <button
          className="w-full bg-cyan-400 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-cyan-500/100 transition duration-200"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
