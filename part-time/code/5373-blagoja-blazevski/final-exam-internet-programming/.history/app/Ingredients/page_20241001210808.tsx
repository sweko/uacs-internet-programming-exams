import useFetchData from "@/utils/CallAxiosMethod";
import React from "react";

const Ingredients = () => {
  const res = useFetchData({ objectName: "ingredients", method: "GET" });
  return (
    <main className="flex-1">
      <section className="w-full py-16 lg:py-14"></section>
    </main>
  );
};

export default Ingredients;
