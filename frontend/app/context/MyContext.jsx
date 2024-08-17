"use client";

import { createContext, useState } from "react";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const [products, setProducts] = useState([]);

  const [user, setUser] = useState(null);

  const [cartItems, setCartItems] = useState([]);

  return (
    <MyContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        products,
        setProducts,
        cartItems,
        setCartItems,
        user,
        setUser,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
