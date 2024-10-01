import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const RecipeDetails = () => {
  const id = useSearchParams().get("id");
  return <div>RecipeDetails</div>;
};

export default RecipeDetails;
