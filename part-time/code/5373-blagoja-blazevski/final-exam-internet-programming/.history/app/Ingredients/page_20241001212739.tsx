"use client";

import useFetchData from "@/utils/CallAxiosMethod";
import { IData, IStringList } from "@/utils/CommonInterfaces";
import React, { useEffect, useState } from "react";

const Ingredients = () => {
  const res = useFetchData({ objectName: "ingredients", method: "GET" });

  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<IStringList[]>();

  useEffect(() => {
    if (!res.isLoading) {
      if (res.status === 200) {
        // console.log(Math.ceil(res.data.length / 25));
        console.log(res.data);
        setData(res.data as IData[]);
      }
    }
  }, [res.isLoading]);

  const renderIngredientsPage = () => {
    return res.data
      .slice((currentPage - 1) * 25, currentPage * 25)
      .map((ingredient: string) => <h1 key={ingredient}>{ingredient}</h1>);
  };
  return (
    <main className="flex-1">
      <section className="w-full py-16 lg:py-14">
        {data && renderIngredientsPage()}
      </section>
    </main>
  );
};

export default Ingredients;
