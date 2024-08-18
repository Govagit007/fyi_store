import React from "react";
import Header from "../components/Header";
import Table from "../components/Table";
import Footer from "../components/Footer";

const page = () => {
  return (
    <div className="pt-20 bg-[#fff8eb] w-screen h-screen overflow-y-scroll flex flex-col justify-between">
      <Header />
      <div className="w-full p-4 md:p-16 pb-[250px] ">
        <Table />
      </div>
      <Footer />
    </div>
  );
};

export default page;
