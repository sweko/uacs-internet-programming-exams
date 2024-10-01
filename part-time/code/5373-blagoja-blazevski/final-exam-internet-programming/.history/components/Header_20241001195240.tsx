import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-[#90e174]">
      <nav className="ml-auto flex gap-4 sm:gap-6 breeze-underline">
        <Link href={"/"}></Link>
      </nav>
    </header>
  );
};

export default Header;
