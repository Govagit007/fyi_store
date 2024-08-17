"use client";

import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";

import { GoHome } from "react-icons/go";
import { FaStoreAlt } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { SlBasket } from "react-icons/sl";

import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import MyContext from "../context/MyContext";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Nav = () => {
  const navbuttons = [
    {
      name: "Home",
      to: "/",
      icon: <GoHome />,
    },
    {
      name: "Products",
      to: "/products",
      icon: <FaStoreAlt />,
    },

    // {
    //   name: "Wishlist",
    //   to: "/wishlist",
    //   icon: <IoMdHeart />,
    // },
    {
      name: "Cart",
      to: "/cart",
      icon: <SlBasket />,
    },
  ];

  const router = useRouter();
  const { authenticated, setAuthenticated, user, cartItems, setCartItems } =
    useContext(MyContext);

  const [openMen, setOpenMenu] = useState(false);

  const handleLogout = () => {
    Cookies.set("token", "");
    setAuthenticated(false);
    router.push("/");
    localStorage.clear();
  };

  if (authenticated) {
    return (
      <>
        <nav className=" hidden md:flex gap-8 px-12 text-orange-500 justify-center items-center ">
          {navbuttons.map((n, i) => {
            return (
              <Link
                href={n.to}
                key={i}
                className={`flex justify-center items-center gap-1 relative ${
                  n.name === "Cart" && "animate-bounce"
                }`}
              >
                {n.name === "Cart" && cartItems.length > 0 && (
                  <div className="absolute -right-4 -top-4  ">
                    <div className="relative w-6 h-6  font-semibold flex justify-center items-center text-sm aspect-square  rounded-full  bg-white border-2 border-orange-600 text-orange-700">
                      {cartItems.length}
                      {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  animate-ping  border-2 border-orange-500 w-2 h-2 bg-orange-500 rounded-full"></div> */}
                    </div>
                  </div>
                )}
                <div className="text-xl">{n.icon}</div>
                <p className="text-sm">{n.name}</p>
              </Link>
            );
          })}
          <button onClick={handleLogout}>Logout</button>
        </nav>
        <nav className="sm:block md:hidden px-4">
          <RxHamburgerMenu
            className=" fixed text-orange-400 text-2xl  top-4 left-4"
            onClick={() => setOpenMenu(true)}
          />{" "}
          <div
            className="flex h-screen fixed left-0 top-0 -translate-x-full transition-all duration-200 bg-[#f7e4be]  "
            style={{
              transform: openMen && "translateX(0)",
            }}
          >
            <div className="flex flex-col relative font-medium  py-12 w-[200px] text-[#82601c]">
              {navbuttons.map((n, i) => {
                return (
                  <Link
                    href={n.to}
                    key={i}
                    className="flex justify-start items-center gap-1  w-full px-6 py-4 hover:bg-[#ffc34a]"
                  >
                    <div className="text-lg">{n.icon}</div>
                    <p className="text-xs">{n.name}</p>
                  </Link>
                );
              })}
              <RxCross2
                className="absolute right-2 top-2"
                onClick={() => setOpenMenu(false)}
              />
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
          <SlBasket className="text-2xl text-neutral-50" />
        </nav>
      </>
    );
  }
  return (
    <nav className="  flex gap-2 md:gap-8 sm:px-4 md:px-16 text-orange-500 justify-center items-center ">
      <Link
        href={"/signup"}
        className=" sm:text-sm md:text-lg font-bold bg-slate-50 rounded-3xl border border-orange-700 px-4 py-2 hover:text-neutral-50 transition-all duration-200 hover:bg-orange-700 "
      >
        Signup
      </Link>
      <Link
        href={"/login"}
        className=" sm:text-lg md:text-xl   rounded-3xl  px-4 py-2  transition-all duration-200 "
      >
        Login
      </Link>
    </nav>
  );
};

export default Nav;
