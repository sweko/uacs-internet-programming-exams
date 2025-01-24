"use client";

import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center shadow-sm text-white sticky top-0 bg-gradient-to-b bg-[#ff5353]">
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/Recipes"
        >
          Recipes
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/Ingredients"
        >
          Ingredients
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/Cuisines"
        >
          Cuisines
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/About"
        >
          About
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/Statistics"
        >
          Statistics
        </Link>
      </nav>
    </header>
  );
};

export default Header;
