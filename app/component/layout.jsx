// components/Layout.js
import React from "react";
import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <main className="relative min-h-screen bg-ground w-100 p-5 text-light font-poppins">
      {children}
    </main>
  );
};

export default Layout;
