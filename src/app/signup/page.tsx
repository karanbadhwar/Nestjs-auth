"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onSignup = async () => {
    console.log(user);

    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      toast.success("User Created");
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-1">
      <h1 className="text-center">{isLoading ? "Processing" : "Signup"}</h1>
      <hr />
      {/* <form className="flex flex-col text-center" onSubmit={onSignup}> */}
      {/* Username */}
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
        className="p-2 ml-1 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      />
      {/* Email */}
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
        className="p-2 ml-1 text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
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
        onClick={onSignup}
        className="p-2 border mb-2  border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 hover:bg-neutral-800"
      >
        {buttonDisabled ? "No Singup" : "Signup Here"}
      </button>
      <Link
        href="/login"
        className="p-1 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 hover:bg-neutral-800"
      >
        Visit Login Page
      </Link>
      {/* </form> */}
      <Toaster />
    </div>
  );
}
