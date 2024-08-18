import React from "react";
import Nav from "./Nav";
import Link from "next/link";

const Header = () => {
  return (
    <div className="w-full flex  fixed top-0 justify-between items-center  z-10 backdrop-blur-md bg-transparent ">
      <Link
        href={"/"}
        className="flex px-8 py-5 text-orange-700 justify-center md:justify-start w-full"
      >
        <h2 className="text-base whitespace-nowrap md:text-2xl font-bold ">
          FYI STORE
        </h2>
      </Link>
      <Nav />
    </div>
  );
};

export default Header;
