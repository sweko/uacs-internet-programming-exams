"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const RecipeDetails = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const id = useSearchParams().get("id");

  return <div>RecipeDetails {id}</div>;
};

export default RecipeDetails;
