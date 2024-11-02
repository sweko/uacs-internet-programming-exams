"use client";

import useFetchData from "@/utils/CallAxiosMethod";
import { IData, IStringList } from "@/utils/CommonInterfaces";
import React, { useEffect, useState } from "react";
import { renderCards, renderPagination } from "@/utils/GeneralMethods";

const Ingredients = () => {
  const res = useFetchData({ objectName: "ingredients", method: "GET" });

  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<IStringList[]>();
  const pageSize = 20;

  useEffect(() => {
    if (!res.isLoading) {
      if (res.status === 200) {
        console.log(res.data);
        setData(res.data as IData[]);
      }
    }
  }, [res.isLoading]);

  const handlePageClick = (value: number) => {
    setCurrentPage(value);
  };

  return (
    <main className="flex-1">
      <section className="w-full py-16 lg:py-14">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            All Ingredients
          </h1>
        </div>
        <hr className="h-px my-8 bg-gray-200 border-0" />
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="inline space-x-2">
            {data &&
              renderPagination(data, pageSize, currentPage, handlePageClick)}
          </div>
          <hr className="h-px my-8 bg-gray-200 border-0" />
          <div className="d-flex grid md:grid-cols-5 grid-cols-2 w-full px-5 gap-2">
            {/* {data && renderIngredientsPage()} */}
            {data &&
              renderCards(
                data.slice(
                  (currentPage - 1) * pageSize,
                  currentPage * pageSize
                ),
                "Ingredients",
                {
                  view: true,
                  edit: false,
                  delete: false,
                }
              )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Ingredients;
