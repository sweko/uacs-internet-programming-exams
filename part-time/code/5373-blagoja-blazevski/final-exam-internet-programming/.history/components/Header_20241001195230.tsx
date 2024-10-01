import React from "react";

const Header = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-[#90e174]">
      <Sheet>
        <SheetTrigger>
          <MenuIcon className="h-6 w-6 dark:text-gray-900" />
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader className="">
            <SheetTitle>Breeze</SheetTitle>
            <SheetDescription className="my-0 breeze-gradient-text font-bold">
              AIR+
            </SheetDescription>
          </SheetHeader>
          <ul className="mt-2">
            <li>
              <a
                href="/app/dashboard"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                {" "}
                <LucideLayout />
                <span className="ms-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="/app/transactions"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                {" "}
                <ArrowLeftRight />
                <span className="ms-3">Transactions</span>
              </a>
            </li>
            <li>
              <a
                href=""
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                {" "}
                <Wallet />
                <span className="ms-3">Budgets</span>
              </a>
            </li>
            <li>
              <a
                href=""
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                {" "}
                <Sparkles />
                <span className="ms-3">Achievements</span>{" "}
              </a>
            </li>
            <li>
              <a
                href=""
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                {" "}
                <Settings />
                <span className="ms-3">Settings</span>{" "}
              </a>
            </li>
          </ul>
        </SheetContent>
      </Sheet>
      <nav className="ml-auto flex gap-4 sm:gap-6 breeze-underline">
        <Link href={"/"}>
          <HomeIcon />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
