"use client";
import { useState, useEffect } from "react";

const SuccessPopup = ({ message, setShowPopup }) => {
  useEffect(() => {
    if (1) {
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    }
  }, []);

  return (
    <div className="fixed w-screen h-screen top-0 left-0 backdrop-blur-xl flex justify-center items-center z-50">
      <div
        className="  flex  z-50 w-[300px] h-[350px] bg-white rounded-2xl border shadow "
        style={{ animation: "fadeInUp 0.3s forwards" }}
      >
        <div
          className=" text-white px-4 py-3 rounded-lg shadow-lg transform transition-all duration-300 ease-out opacity-0 translate-y-4 flex flex-col justify-center items-center"
          style={{ animation: "fadeInUp 0.5s forwards" }}
        >
          <p className="font-bold text-xl text-green-400">{message}</p>
          <img src="success.gif" alt="" />
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;
