"use client";

import React, { useContext, useEffect, useState } from "react";
import MyContext from "../context/MyContext";
import { useRouter } from "next/navigation";
import { IoMdAdd } from "react-icons/io";
import { BiMinus } from "react-icons/bi";
import { BACKEND_SERVER } from "../constants/Constant";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";
import SuccessPopup from "./Success";
import Link from "next/link";

const Table = () => {
  const {
    cartItems,
    setCartItems,
    user,
    setUser,
    authenticated,
    setAuthenticated,
  } = useContext(MyContext);

  const router = useRouter();

  const [discount, setDiscount] = useState(false);

  const [input, setInput] = useState("");

  const [showPopup, setShowPopup] = useState(false);

  const handleQuntity = async (cart, val) => {
    if (val <= 0) return;
    console.log(cart, val);
    const newArr = cartItems.map((c, i) =>
      c.productId == cart.productId ? { ...c, quantity: val } : c
    );

    try {
      const res = await axios.post(`${BACKEND_SERVER}users/cart/${user._id}`, {
        cart: newArr,
      });

      setCartItems(newArr);
      localStorage.setItem("items", JSON.stringify(newArr));
    } catch (error) {}
  };

  const handleDelete = async (c) => {
    const newArr = cartItems.filter((cart) => cart.productId != c.productId);

    try {
      const res = await axios.post(`${BACKEND_SERVER}users/cart/${user._id}`, {
        cart: newArr,
      });

      setCartItems(newArr);
      localStorage.setItem("items", JSON.stringify(newArr));
    } catch (error) {}
  };

  const sum = () => {
    const res = {};
    const totalSum = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    if (discount) {
      if (input === "10PERDISC") {
        const sum = totalSum * 0.9;
        res.discountSum = sum.toFixed(2);
      } else if (input === "10OFFDISC") {
        const sum = totalSum - 10;
        res.discountSum = sum.toFixed(2);
      }
    } else {
      res.discountSum = totalSum.toFixed(2);
    }
    res.actualSum = totalSum.toFixed(2);
    console.log("RES", res);
    return res;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === "10PERDISC") {
      toast.success("10% discountapplied");
      setDiscount(true);
    } else if (input === "10OFFDISC") {
      toast.success("10₹ discountapplied");
      setDiscount(true);
    } else {
      toast.error("Invalied discount coupon");
    }
  };

  useEffect(() => {
    const localData = localStorage.getItem("authenticated");
    if (localData) {
      setAuthenticated(true);
    } else {
      router.push("/");
    }
    const items = JSON.parse(localStorage.getItem("items"));
    setCartItems(items);

    const userId = JSON.parse(localStorage.getItem("userId"));

    setUser({
      _id: userId,
    });
  }, []);

  if (authenticated) {
    return (
      <div>
        {showPopup && (
          <SuccessPopup
            message="checkout successful"
            setShowPopup={setShowPopup}
          />
        )}
        <table
          border="1"
          cellpadding="10"
          cellspacing="0"
          className="w-full   "
        >
          <thead>
            <tr>
              <th className="text-start">S.No</th>
              <th className="text-start">Product name</th>
              <th className="text-start">Image</th>
              <th className="text-start">Price</th>
              <th className="text-start">Quantity</th>
              <th className="text-start">Total Price</th>
            </tr>
          </thead>
          <tbody className="pb-[200px] md:pb-0">
            {cartItems?.map((c, i) => {
              return (
                <tr key={i} className="border-t h-[100px] border-orange-900">
                  <td>{i + 1}</td>
                  <td>
                    <Link href={`/product/${c.productId}`}>
                      {c.title?.length > 25
                        ? `${c.title.slice(0, 25)}...`
                        : c.title}
                    </Link>
                  </td>
                  <td>
                    <img
                      src={c.image}
                      alt="image"
                      className=" p-2 md:p-6 w-[100px] h-[80px] bg-white rounded-md object-contain"
                    />
                  </td>
                  <td>₹{c.price}</td>
                  <td className=" h-full  gap-2  justify-start my-auto  items-center text-sm">
                    <div className="flex justify-start items-center gap-2">
                      <button
                        onClick={() => handleQuntity(c, c.quantity - 1)}
                        disabled={c.quantity <= 1 ? true : false}
                        className={`px-3  border border-orange-400 rounded-lg font-extrabold py-2 ${
                          c.quantity <= 1 && "opacity-50"
                        }`}
                      >
                        <BiMinus />
                      </button>
                      <p className="font-bold">{c.quantity}</p>
                      <button
                        onClick={() => handleQuntity(c, c.quantity + 1)}
                        className={`px-3 py-2  border border-orange-400 rounded-lg font-extrabold text-center`}
                      >
                        <IoMdAdd />
                      </button>
                    </div>
                  </td>
                  <td className="px-4">₹{(c.quantity * c.price).toFixed(2)}</td>
                  <td>
                    <MdDeleteOutline
                      onClick={() => handleDelete(c)}
                      className="text-red-500 text-2xl cursor-pointer"
                    />
                  </td>
                </tr>
              );
            })}

            {/* <tr className="mt-2  ">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className=" hidden md:block border-t border-black w-[120px]">
                <div className="flex flex-col justify-start items-start gap-4 ">
                  <p>
                    ₹
                    {discount ? (
                      <span className="gap-2">
                        <span className="line-through">{sum().actualSum}</span>{" "}
                        <span className="italic">₹{sum().discountSum}</span>{" "}
                      </span>
                    ) : (
                      sum().actualSum
                    )}
                  </p>
                  <div className="flex flex-col justify-start items-start gap-4">
                    <div className="text-xs">
                      <p>* use "10PERDISC" for 10% off</p>
                      <p>* use "10OFFDISC" for 10₹ off </p>
                    </div>
                    <form className="flex gap-4">
                      <input
                        type="text"
                        className="bg-transparent border-b-2 border-black focus:border-none p-2 w-[120px]"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                      />

                      {discount ? (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setDiscount(false);
                            toast.success("discount removed");
                          }}
                          className="px-4 py-1 border border-red-800 rounded-2xl bg-red-700 text-white text-xs"
                        >
                          remove
                        </button>
                      ) : (
                        <button
                          onClick={handleSubmit}
                          className="px-4 py-2 border border-orange-800 rounded-xl bg-orange-200"
                        >
                          {" "}
                          apply
                        </button>
                      )}
                    </form>
                    <p>{}</p>
                    <button
                      className="px-6 border-2 border-orange-600 bg-orange-400 text-white rounded-3xl py-4 flex gap-4"
                      onClick={() => setShowPopup(true)}
                    >
                      <p className="whitespace-nowrap">Check out</p>{" "}
                      <span className="mx-4">₹{sum().discountSum}</span>{" "}
                    </button>
                  </div>
                </div>
              </td>
            </tr> */}
          </tbody>
        </table>
        <div className=" fixed bottom-0 left-0 z-40 p-4 md:p-10 w-full border-t rounded-t-lg shadow flex flex-col md:flex-row justify-start md:justify-end items-start md:items-center gap-4 md:gap-10  bg-[#fff8eb]">
          <p className=" w-full md:w-auto  whitespace-nowrap text-center text-base md:text-xl font-bold">
            <span className="text-xs md:text-sm mx-4">Total amount</span> ₹
            {discount ? (
              <span className="gap-2">
                <span className="line-through">{sum().actualSum}</span>{" "}
                <span className="italic">₹{sum().discountSum}</span>{" "}
              </span>
            ) : (
              sum().actualSum
            )}
          </p>
          <div className="  w-full md:w-auto   flex   flex-col md:flex-row justify-center md:justify-end items-center gap-4 md:gap-10 ">
            <div className="text-xs">
              <p>* use "10PERDISC" for 10% off</p>
              <p>* use "10OFFDISC" for 10₹ off </p>
            </div>
            <form className="flex gap-4">
              <input
                type="text"
                className="bg-transparent border-b-2 border-black focus:border-none p-2 w-[120px]"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />

              {discount ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setDiscount(false);
                    toast.success("discount removed");
                  }}
                  className="px-4 py-1 border border-red-800 rounded-2xl bg-red-700 text-white text-xs"
                >
                  remove
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 border border-orange-800 rounded-xl bg-orange-200"
                >
                  {" "}
                  apply
                </button>
              )}
            </form>
            <p>{}</p>
            <button
              className="px-6 border-2 border-orange-600 bg-orange-400 text-white rounded-3xl py-2 md:py-4 flex "
              onClick={() => setShowPopup(true)}
            >
              Check out <span className="mx-4">₹{sum().discountSum}</span>{" "}
            </button>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
};

export default Table;
