"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { FaUserFriends } from "react-icons/fa";
import { useState, useEffect } from "react";
import { set } from "mongoose";


interface Params {
  id: string;
}

export default function UserProfile({ params }: { params: Params }) {
  const { id } = params;
  const router = useRouter();

  const [data, setData] = useState("nothing");
  


 
  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      // Simulating an API call
      const response = await fetch(`/api/user/myself`);
      const userData = await response.json();
      setData(JSON.stringify(userData)); // Using setData here
    } catch (error) {
      console.error("Error fetching user details:", error);
      setData("Error fetching user data"); // Using setData in error case
    }
  };


  const logout = async () => {
    try {
      await axios.get('/api/user/logout');
      toast.success('Logout succeeded successfully');
      router.push('/login');
    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  // Simulated user data
  const user = {
    id: "668914398e18b82ca2b0844a" ,
    name: "Prince",
    email: "prince.ex@gmail.com",
    bio: "A passionate developer who loves coding and exploring new technologies.",
  };


 

  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-cyan-500">
      <div className="w-full max-w-md p-8 bg-yellow-200 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-purple-700	"><FaUserFriends />User Profile</h1>
        <hr className="mb-6" />

        <div className="mb-4">
          <h1></h1>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{user.name}</h2>
          <p className="text-sm text-gray-600 mb-1"><strong>Email:</strong> {user.email}</p>
          <p className="text-sm text-gray-600"><strong>Bio:</strong> {user.bio}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700">User ID</h3>
          <p className="text-gray-500">{user.id}</p>
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
