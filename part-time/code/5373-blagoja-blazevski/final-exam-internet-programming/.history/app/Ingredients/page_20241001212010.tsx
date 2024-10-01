"use client";

import useFetchData from "@/utils/CallAxiosMethod";
import axios from "axios";
import React, { useEffect } from "react";

const Ingredients = () => {
  const res = useFetchData({ objectName: "ingredients", method: "GET" });

  useEffect(() => {
    if (!res.isLoading) {
      if (res.status === 200) {
        console.log(Math.ceil(res.data.length / 20));
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
