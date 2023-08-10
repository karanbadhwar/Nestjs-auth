"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast, Toaster } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = React.useState("Nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successful");
      router.push("/login");
    } catch (error: any) {
      console.log("error", error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {

    const res = await axios.get("/api/users/personal");
    console.log(res);
    setData(res.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2 className="p-3 rounded bg-orange-500">
        {data === "Nothing" ? "None" : <Link href={`/profile/${data}`}>{data}</Link>}
      </h2>
      <button
        type="button"
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        logout
      </button>
      <button
        type="button"
        onClick={getUserDetails}
        className="bg-purple-500 mt-4 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
      >
        Details
      </button>

      <Toaster />
    </div>
  );
}
