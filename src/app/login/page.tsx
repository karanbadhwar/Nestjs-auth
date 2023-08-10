"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Success", response.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login Failed", error.message);
      toast.error("Login Failed");
    } finally {
      setIsLoading(false);
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
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-1">
      <h1 className="text-center">{isLoading ? "Processing" : "Login"}</h1>
      <hr />
      {/* <form className="flex flex-col text-center"> */}
      {/* Email */}
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
        className="p-2 ml-1 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      />
      {/* Password */}
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
        className="p-2 ml-1 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      />
      <button
        onClick={onLogin}
        className="p-2 border mb-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 hover:bg-neutral-800"
      >
        Login Here
      </button>
      <Link
        href="/signup"
        className="p-1 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 hover:bg-neutral-800"
      >
        Visit Signup Here
      </Link>
      {/* </form> */}
      <Toaster />
    </div>
  );
}
