"use client";

import { authenticate } from "@/app/common/commonFun";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { BACKEND_SERVER } from "@/app/constants/Constant";
import MyContext from "@/app/context/MyContext";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { SlBasket } from "react-icons/sl";

const page = () => {
  const {
    authenticated,
    setAuthenticated,
    user,
    setUser,
    cartItems,
    setCartItems,
  } = useContext(MyContext);
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  const handleAddtoCart = async (p) => {
    // e.stopPropagation();
    console.log("a");
    const exists = [...cartItems];
    exists.push({
      ...p,
      quantity: 1,
    });

    try {
      const payload = {
        cart: exists,
      };
      console.log(user);
      const res = await axios.post(
        `${BACKEND_SERVER}users/cart/${user._id}`,
        payload
      );
      console.log(res.data);
      setCartItems(exists);
      localStorage.setItem("items", JSON.stringify(exists));
      toast.success(`Product successfully added to cart`);
    } catch (error) {}
  };

  const existsInCart = (id) => {
    let exist = false;
    cartItems.forEach((c, i) => {
      if (c.productId === id) {
        exist = true;
        return;
      }
    });
    return exist;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${BACKEND_SERVER}products/single/${id}`);
        setProduct(res.data.product[0]);
        console.log(res.data.product[0]);
      } catch (error) {
        console.log(error);
        router.push("/");
      }
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    const localData = localStorage.getItem("authenticated");
    if (localData) {
      setAuthenticated(true);
    } else {
      router.push("/login");
    }
    const items = JSON.parse(localStorage.getItem("items"));
    setCartItems(items);

    const userId = JSON.parse(localStorage.getItem("userId"));

    setUser({
      _id: userId,
    });
  }, []);

  if (product && authenticated) {
    return (
      <div className="pt-28 bg-[#fff8eb] w-screen h-screen overflow-y-scroll  flex flex-col justify-center gap-10 items-center">
        <Header />
        <div className="w-4/5  bg-orange-600 rounded-2xl  flex flex-col md:flex-row justify-start items-start p-8 gap-8">
          <div className="w-full md:w-1/2 aspect-[5/4]">
            <img
              src={product.image}
              alt="image"
              className="w-full h-full object-contain p-6 bg-white rounded-2xl  transition-all duration-200"
            />
          </div>
          <div className="w-full flex-1  md:w-1/2 aspect-[5/4] flex flex-col justify-between items-start gap-4 sm:p-2 md:p-6">
            <div className="w-full flex flex-col justify-start items-start gap-2">
              <h2 className="text-3xl font-bold text-white">{product.title}</h2>
              <p className="text-lg text-orange-100 font-light">
                {product.description}
              </p>
              <p className=" text-white text-2xl px-4 m-4">₹{product.price}</p>
            </div>

            <div className="w-full flex flex-col flex-1  justify-end pt-8">
              {" "}
              {!existsInCart(product.productId) ? (
                <button
                  onClick={() => handleAddtoCart(product)}
                  className="w-full rounded-2xl px-6 py-3 hover:scale-y-110 transition-all duration-200 border border-orange-200 font-bold text-2xl text-orange-500 bg-orange-100 flex gap-1 justify-center items-center"
                >
                  Add to cart{" "}
                </button>
              ) : (
                <button
                  onClick={() => router.push("/cart")}
                  className="border-2 border-orange-400 bg-orange-200 px-4 py-2 rounded-3xl text-orange-500  "
                >
                  Go to cart{" "}
                </button>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  return <></>;
};

export default page;
