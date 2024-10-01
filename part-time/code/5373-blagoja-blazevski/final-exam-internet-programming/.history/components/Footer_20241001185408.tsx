import React from "react";

const Footer = () => {
  const student = {
    id: 5373,
    name: "Blagoja Blazhevski",
  };
  return (
    <footer className="gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {`© ${new Date().getFullYear()} ${student.name} - ${student.id}`}
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6 breeze-underline"></nav>
    </footer>
  );
};

export default Footer;
