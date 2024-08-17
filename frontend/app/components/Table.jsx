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
    return res;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === "10PERDISC") {
      toast.success("10% discount applied");
      setDiscount(true);
    } else if (input === "10OFFDISC") {
      toast.success("₹10 discount applied");
      setDiscount(true);
    } else {
      toast.error("Invalid discount coupon");
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
      <div className="overflow-x-auto">
        {showPopup && (
          <SuccessPopup
            message="Checkout successfully completed"
            setShowPopup={setShowPopup}
          />
        )}
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="text-start px-4 py-2">S.No</th>
              <th className="text-start px-4 py-2">Product Name</th>
              <th className="text-start px-4 py-2">Image</th>
              <th className="text-start px-4 py-2">Price</th>
              <th className="text-start px-4 py-2">Quantity</th>
              <th className="text-start px-4 py-2">Total Price</th>
              <th className="text-start px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems?.map((c, i) => {
              return (
                <tr key={i} className="border-t h-[100px] border-orange-900">
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2">
                    {c.title?.length > 25
                      ? `${c.title.slice(0, 25)}...`
                      : c.title}
                  </td>
                  <td className="px-4 py-2">
                    <img
                      src={c.image}
                      alt="product"
                      className="w-[100px] h-[80px] bg-white rounded-md object-contain"
                    />
                  </td>
                  <td className="px-4 py-2">₹{c.price}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuntity(c, c.quantity - 1)}
                        disabled={c.quantity <= 1}
                        className={`px-3 border border-orange-400 rounded-lg font-extrabold py-2 ${
                          c.quantity <= 1 && "opacity-50"
                        }`}
                      >
                        <BiMinus />
                      </button>
                      <p className="font-bold">{c.quantity}</p>
                      <button
                        onClick={() => handleQuntity(c, c.quantity + 1)}
                        className="px-3 py-2 border border-orange-400 rounded-lg font-extrabold text-center"
                      >
                        <IoMdAdd />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-2">₹{c.quantity * c.price}</td>
                  <td className="px-4 py-2">
                    <MdDeleteOutline
                      onClick={() => handleDelete(c)}
                      className="text-red-500 text-2xl cursor-pointer"
                    />
                  </td>
                </tr>
              );
            })}
            <tr className="mt-2">
              <td colSpan="6" className="border-t border-black px-4 py-2">
                <div className="flex flex-col items-start gap-4">
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
                  <div className="text-xs">
                    <p>* use "10PERDISC" for 10% off</p>
                    <p>* use "10OFFDISC" for ₹10 off</p>
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
                          toast.success("Discount removed");
                        }}
                        className="px-4 py-1 border border-red-800 rounded-2xl bg-red-700 text-white text-xs"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        className="px-4 py-2 border border-orange-800 rounded-xl bg-orange-200"
                      >
                        Apply
                      </button>
                    )}
                  </form>
                  <button className="px-6 border-2 border-orange-600 bg-orange-400 text-white rounded-3xl py-2">
                    Check out{" "}
                    <span className="mx-4" onClick={() => setShowPopup(true)}>
                      ₹{sum().discountSum}
                    </span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  return null;
};

export default Table;
