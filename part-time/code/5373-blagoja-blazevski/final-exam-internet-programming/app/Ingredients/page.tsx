"use client";

import useFetchData from "@/utils/CallAxiosMethod";
import { IData, IStringList } from "@/utils/CommonInterfaces";
import React, { useEffect, useState } from "react";
import {
  capitalizeFirstLetter,
  renderPagination,
} from "@/utils/GeneralMethods";

const Ingredients = () => {
  const res = useFetchData({ objectName: "ingredients", method: "GET" });

  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<IStringList[]>();
  const pageSize = 100;

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
      .slice((currentPage - 1) * pageSize, currentPage * pageSize)
      .map((ingredient: string, index: number) => (
        <h1 key={ingredient + "_" + index}>
          {capitalizeFirstLetter(ingredient)}
        </h1>
      ));
  };

  // const renderIngredientsPagination = () => {
  //   const pages = Math.ceil(res.data.length / 25);
  //   const pageNumbers = [];

  //   for (let i = 1; i <= pages; i++) {
  //     pageNumbers.push(i);
  //   }

  //   return pageNumbers.map((number) => (
  //     <button
  //       key={number}
  //       onClick={() => setCurrentPage(number)}
  //       className={`${
  //         number === currentPage
  //           ? "bg-[#ff5353] text-white"
  //           : "bg-white text-[#ff5353]"
  //       } px-3 py-1 rounded-lg hover:outline`}
  //     >
  //       {number}
  //     </button>
  //   ));
  // };

  const handlePageClick = (e: any) => {
    setCurrentPage(parseInt(e));
  };

  return (
    <main className="flex-1">
      <div className="w-full flex justify-center mt-3 gap-2">
        {/* {data && renderIngredientsPagination()} */}
        {data && renderPagination(data, pageSize, currentPage, handlePageClick)}
      </div>
      <hr className="h-px my-8 bg-gray-200 border-0" />
      <section className="w-full px-5 lg:py-14 flex grid grid-cols-5">
        {data && renderIngredientsPage()}
      </section>
    </main>
  );
};

export default Ingredients;
