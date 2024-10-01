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

  const renderData = () => {
    return (
      Object.keys(data).length > 0 &&
      Object.keys(data).map((key) => (
        <div key={key}>
          <p>{key}</p>
          <p>{data[key]}</p>
        </div>
      ))
    );
  };

  return (
    <div>
      RecipeDetails {params.id}
      <div>
        <h1>{data?.name}</h1>
        <p>{data?.description}</p>
        <h2>Ingredients</h2>
        <ul>{renderData()}</ul>
      </div>
    </div>
  );
};

export default RecipeDetails;
