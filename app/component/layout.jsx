// components/Layout.js
import React from "react";
import Link from "next/link";
import NavBar from "./navBar";

const Layout = ({ children }) => {
  return (
    <main className="relative min-h-screen bg-ground w-100 text-light font-poppins">
      <div className="fixed w-full z-10">
        <NavBar/>
      </div>
      <div className="py-[4%]">
        {children}
      </div>
    </main>
  );
};

export default Layout;
