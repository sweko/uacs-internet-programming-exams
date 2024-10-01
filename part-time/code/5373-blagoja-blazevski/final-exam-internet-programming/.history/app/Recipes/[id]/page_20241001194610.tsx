"use client";

import useFetchData from "@/utils/CallAxiosMethod";
import { IRecipe } from "@/utils/CommonInterfaces";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const RecipeDetails = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const [data, setData] = useState<IRecipe>();
  const id = useSearchParams().get("id") || params.id;

  const res = useFetchData({ objectName: `recipes/${id}`, method: "GET" });

  useState(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (!res.isLoading) {
      if (res.status === 200) {
        console.log(res.data);
        setData(res.data[0] as IRecipe);
      } else {
        console.error(res);
      }
    }
  }, [res.isLoading]);

  return (
    <div>
      RecipeDetails {params.id}
      <div>
        <h1>{data?.title} YO</h1>
        <p>{data?.description}</p>
        <h2>Ingredients</h2>
        {data !== undefined && JSON.stringify(data.ingredients)}
      </div>
    </div>
  );
};

export default RecipeDetails;
