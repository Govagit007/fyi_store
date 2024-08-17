import React from "react";
import Header from "../components/Header";
import Table from "../components/Table";

const page = () => {
  return (
    <div className="pt-20 bg-[#fff8eb] w-screen h-screen overflow-y-scroll">
      <Header />
      <div className="w-full p-4 md:p-16 pb-[250px] md:pb-0">
        <Table />
      </div>
    </div>
  );
};

export default page;
