"use client";

import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import MyContext from "../context/MyContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { BACKEND_SERVER } from "../constants/Constant";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const Page = () => {
  const { authenticated, setAuthenticated, user, setUser } =
    useContext(MyContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Please fill all fields");
    }
    if (password.length < 3) {
      return toast.error("Password must be greater than 3 characters");
    }
    setError("");

    try {
      const payload = {
        email: email,
        password: password,
      };
      const res = await axios.post(`${BACKEND_SERVER}users/login`, payload);
      console.log(res.data);
      Cookies.set("token", res.data.token);
      toast.success("Login successful!");
      setAuthenticated(true);
      localStorage.setItem("authenticated", "true");
      setUser(res.data.user);
      localStorage.setItem("userId", JSON.stringify(res.data.user._id));
      const prevItems = res.data.user.cart ? res.data.user.cart : [];
      localStorage.setItem("items", JSON.stringify(prevItems));
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-100 p-4 sm:p-6 md:p-8">
      <Header />
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg max-w-xs sm:max-w-md w-full">
        <h2 className="text-xl sm:text-2xl font-bold text-orange-600 mb-4 sm:mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 sm:mb-4">
            <label
              htmlFor="email"
              className="block text-orange-700 font-medium mb-1 sm:mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 sm:px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4 sm:mb-6">
            <label
              htmlFor="password"
              className="block text-orange-700 font-medium mb-1 sm:mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 sm:px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-700 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-4 sm:mt-6 text-center text-orange-600">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-orange-700 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
