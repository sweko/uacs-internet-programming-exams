"use client";

import Button from "@/components/Button";
import useFetchData from "@/utils/CallAxiosMethod";
import { IData, IRecipe } from "@/utils/CommonInterfaces";
import { renderCards, renderPagination } from "@/utils/GeneralMethods";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Recipes() {
  const objectName = usePathname().substring(1);
  console.log(objectName);

  const [data, setData] = useState<IRecipe[]>();

  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 15;

  const handlePageClick = (value: number) => {
    setCurrentPage(value);
  };

  const res = useFetchData({ objectName, method: "GET" });

  useEffect(() => {
    if (!res.isLoading) {
      if (res.status === 200) {
        console.log(res.data);
        setData(res.data as IRecipe[]);
      } else {
        console.log(res.status);
      }
    }
  }, [res.isLoading]);

  return (
    <main className="flex-1">
      <section className="w-full py-16 lg:py-14">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            All Recipes
          </h1>
        </div>
        <hr className="h-px my-8 bg-gray-200 border-0" />
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="inline space-x-2">
            {data &&
              renderPagination(
                data as IData[],
                pageSize,
                currentPage,
                handlePageClick
              )}
          </div>
          {res.isLoading && <p>Loading...</p>}
          <div className="grid gap-4 md:grid-cols-5 text-center px-5">
            {data &&
              renderCards(
                data.slice(
                  (currentPage - 1) * pageSize,
                  currentPage * pageSize
                ) as IData[],
                "Recipes",
                { view: true, edit: true, delete: false },
                "id",
                {
                  description: "description",
                  title: "title",
                  titleOver: "cuisine",
                }
              )}
          </div>
        </div>
      </section>
    </main>
  );
}
