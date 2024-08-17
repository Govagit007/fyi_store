"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

const Carousel = () => {
  const images = [
    "/men-dress.jpeg",
    "/women-dress.jpg",
    "/jewellery.jpg",
    "/electronic.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-[400px] hidden md:block mx-auto  rounded-2xl overflow-hidden ">
      <div
        className="flex w-full transition-transform duration-1000 ease-in-out "
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="min-w-full ">
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              width={200}
              height={350}
              className=" h-56 md:h-80 object-cover  w-full"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-between px-4">
        <button
          onClick={() =>
            setCurrentIndex(
              currentIndex === 0 ? images.length - 1 : currentIndex - 1
            )
          }
          className="bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700 transition"
        >
          &#10094;
        </button>
        <button
          onClick={() =>
            setCurrentIndex(
              currentIndex === images.length - 1 ? 0 : currentIndex + 1
            )
          }
          className="bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700 transition"
        >
          &#10095;
        </button>
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 mx-1 rounded-full ${
              currentIndex === index ? "bg-orange-600" : "bg-orange-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
