"use client";

import useFetchData from "@/utils/CallAxiosMethod";
import { IData, IRecipe } from "@/utils/CommonInterfaces";
import {
  capitalizeFirstLetter,
  renderCards,
  renderPagination,
} from "@/utils/GeneralMethods";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ViewIngredient = ({
  params,
}: {
  params: {
    name: string;
  };
}) => {
  const name = useSearchParams().get("name") || params.name;

  const [data, setData] = useState<IRecipe[]>();

  const res = useFetchData({
    objectName: `recipes?q=${name}&_sort=title`,
    method: "GET",
  });

  useEffect(() => {
    if (!res.isLoading) {
      if (res.status === 200) {
        console.log(res.data);
        setData(res.data as IRecipe[]);
      } else {
        console.log(res);
      }
    }
  }, [res.isLoading]);

  const pageSize = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageClick = (value: number) => {
    setCurrentPage(value);
  };

  return (
    <main className="flex-1">
      <section className="w-full py-16 lg:py-14">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            View Ingredient: {capitalizeFirstLetter(decodeURIComponent(name))}
            <p className="m-0 p-0 text-base tracking-normal">
              Total recipes: {data?.length}
            </p>
          </div>
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
                { view: true, edit: true, delete: true },
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
};

export default ViewIngredient;
