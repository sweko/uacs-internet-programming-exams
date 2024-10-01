"use client";

import useFetchData from "@/utils/CallAxiosMethod";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Ingredients = () => {
  const res = useFetchData({ objectName: "ingredients", method: "GET" });

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!res.isLoading) {
      if (res.status === 200) {
        console.log(Math.ceil(res.data.length / 25));
      }
    }
  }, [res.isLoading]);
  return (
    <main className="flex-1">
      <section className="w-full py-16 lg:py-14"></section>
    </main>
  );
};

export default Ingredients;
