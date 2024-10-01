"use client";

import useFetchData from "@/utils/CallAxiosMethod";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const RecipeDetails = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  // const id = useSearchParams().get("id");
  const id = useSearchParams().get("id") || params.id;

  const res = useFetchData({ objectName: `recipes/${id}`, method: "GET" });

  useEffect(() => {
    if (!res.isLoading) {
      if (res.status === 200) {
        console.log(res.data);
      } else {
        console.error(res);
      }
    }
  }, [res.isLoading]);

  const renderIngredients = () => {};

  return <div>RecipeDetails {params.id}</div>;
};

export default RecipeDetails;
