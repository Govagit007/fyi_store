"use client";
import React, { useContext, useEffect } from "react";
import MyContext from "../context/MyContext";
import Loader from "./Loader";
import Image from "next/image";
import axios from "axios";
import { BACKEND_SERVER } from "../constants/Constant";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const FeaturedProducts = () => {
  const {
    products,
    setProducts,
    user,
    authenticated,
    setAuthenticated,
    setUser,
    cartItems,
    setCartItems,
  } = useContext(MyContext);

  const router = useRouter();

  const handleProductClick = async (id) => {
    if (!authenticated) {
      router.push("/login");
    } else {
      router.push(`/product/${id}`);
    }
  };

  const existsInCart = (id) => {
    let exist = false;
    cartItems?.forEach((c, i) => {
      if (c.productId === id) {
        exist = true;
        return;
      }
    });
    return exist;
  };

  const handleAddtoCart = async (e, p) => {
    e.stopPropagation();

    const exists = [...cartItems];
    exists.push({
      ...p,
      quantity: 1,
    });

    try {
      const payload = {
        cart: exists,
      };
      const res = await axios.post(
        `${BACKEND_SERVER}users/cart/${user._id}`,
        payload
      );
      console.log("GG", res.data);
      setCartItems(exists);
      localStorage.setItem("items", JSON.stringify(exists));
      toast.success(`Product successfully added to cart`);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${BACKEND_SERVER}products/all`);
        setProducts(res.data.products);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const localData = localStorage.getItem("authenticated");

    if (localData == "true") {
      setAuthenticated(true);
    } else {
      localStorage.setItem("authenticated", "false");
      router.push("/");
    }
    let items = JSON.parse(localStorage.getItem("items"));
    items = items ? items : [];
    setCartItems(items);

    const userId = JSON.parse(localStorage.getItem("userId"));
    setUser({
      _id: userId,
    });
  }, []);

  return (
    <div className="w-full flex flex-col justify-start items-center">
      <h2 className=" text-3xl font-semibold text-orange-400  border-b border-orange-300 pb-2">
        Try New{" "}
      </h2>
      <div className="w-full justify-center flex py-8 px-6 text-sm md:text-base md:px-12">
        {products.length > 0 ? (
          <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 px-0 md:px-6  ">
            {products?.map((p, i) => {
              return (
                <div
                  onClick={() => handleProductClick(p.productId)}
                  className="bg-orange-100 hover:bg-orange-200 border aspect-[7/8] rounded-xl overflow-hidden p-6 hover:scale-110 transition-all duration-300  flex flex-col justify-start items-start group gap-2"
                  key={i}
                >
                  <img
                    src={p.image}
                    className="w-full aspect-[5/4] object-contain bg-white rounded-xl p-10   transition-all duration-300 "
                  />
                  <div className="w-full flex flex-col justify-between  flex-1 items-start gap-2">
                    <h2 className=" break-words text-xs md:text-sm  font-extralight ">
                      {p.title.length > 50
                        ? `${p.title.slice(0, 50)}...`
                        : p.title}
                    </h2>
                    <div className="w-full flex justify-between items-center">
                      <p>₹{p.price}</p>
                      {!existsInCart(p.productId) ? (
                        <button
                          onClick={(e) => handleAddtoCart(e, p)}
                          className="border-2 border-orange-400 bg-orange-600 px-4 py-2 rounded-3xl text-orange-50"
                        >
                          Add to cart{" "}
                        </button>
                      ) : (
                        <button className="border-2 border-orange-400 bg-orange-200 px-4 py-2 rounded-3xl text-orange-500  ">
                          Added{" "}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6 px-6">
            <div className="bg-orange-200 border aspect-[5/4] rounded-xl animate-pulse"></div>
            <div className="bg-orange-200 border aspect-[5/4] rounded-xl animate-pulse"></div>
            <div className="bg-orange-200 border aspect-[5/4] rounded-xl animate-pulse"></div>
            <div className="bg-orange-200 border aspect-[5/4] rounded-xl animate-pulse"></div>
            <div className="bg-orange-200 border aspect-[5/4] rounded-xl animate-pulse"></div>
            <div className="bg-orange-200 border aspect-[5/4] rounded-xl animate-pulse"></div>
            <div className="bg-orange-200 border aspect-[5/4] rounded-xl animate-pulse"></div>
            <div className="bg-orange-200 border aspect-[5/4] rounded-xl animate-pulse"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
