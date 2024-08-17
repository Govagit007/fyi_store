import React from "react";

import { BiLoaderAlt } from "react-icons/bi";

const Loader = () => {
  return (
    <div>
      <BiLoaderAlt className=" animate-spin text-3xl text-orange-300 " />
    </div>
  );
};

export default Loader;
