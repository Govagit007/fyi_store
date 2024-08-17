import Image from "next/image";
import Header from "./components/Header";
import ImageUploader from "./components/Image";
import Carousel from "./components/Carousel";
import FeaturedProducts from "./components/FeaturedProducts";
import { MyProvider } from "./context/MyContext";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="pt-20 bg-[#fff8eb] w-screen h-screen overflow-y-scroll">
      <Header />
      <div className="w-full flex justify-between items-start px-6 py-8 md:py-12 md:px-16 gap-12">
        <div className="flex flex-col justify-start items-start gap-4 w-full md:w-3/5 overflow-hidden">
          <h1 className=" text-2xl md:text-7xl font-bold text-[#f8d2b2] whitespace-normal  ">
            Welcome to FYI STORE
          </h1>
          <h2 className="text-xl md:text-4xl text-[#ae6d34] whitespace-normal">
            Discover the Best Deals on Fashion, Electronics, and More....
          </h2>
          <p className="text-sm md:text-xl opacity-50 text-orange-900 whitespace-normal">
            We bring you a curated selection of high-quality products at
            unbeatable prices. Whether you're looking for the latest trends in
            fashion, top-notch electronics, or everyday essentials, we've got
            you covered.
          </p>
        </div>
        <Carousel />
      </div>
      <FeaturedProducts />
      <Footer />
    </main>
  );
}
