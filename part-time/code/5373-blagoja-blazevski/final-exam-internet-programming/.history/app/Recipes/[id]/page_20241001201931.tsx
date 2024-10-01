"use client";

import Footer from "@/components/Footer";
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
        setData(res.data as IRecipe);
      } else {
        console.error(res);
      }
    }
  }, [res.isLoading]);

  const renderIngredients = () => {
    return data?.ingredients.map((ingredient, index) => (
      <li key={data.title + "_ingredient_" + index}>
        {ingredient.name} - {ingredient.quantity} {ingredient.unit}
      </li>
    ));
  };

  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            {data?.title}
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            {data?.description}
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-8">
          <div>
            <h2 className="text-2xl font-bold">Ingredients</h2>
            <ul className="mt-4 list-inside list-disc space-y-2">
              {data && renderIngredients()}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Instructions</h2>
            <ol className="mt-4 list-inside list-decimal space-y-2">
              <li>
                Preheat your oven to 450°F (230°C) with a pizza stone or baking
                sheet inside.
              </li>
              <li>
                Roll out the pizza dough on a floured surface to your desired
                thickness.
              </li>
              <li>
                Spread the tomato sauce evenly over the dough, leaving a small
                border around the edges.
              </li>
              <li>Arrange the mozzarella slices over the sauce.</li>
              <li>
                Carefully transfer the pizza to the preheated stone or baking
                sheet.
              </li>
              <li>
                Bake for 8-10 minutes, or until the crust is golden and the
                cheese is bubbly.
              </li>
              <li>
                Remove from the oven and immediately top with fresh basil
                leaves.
              </li>
              <li>
                Drizzle with olive oil, and season with salt and pepper to
                taste.
              </li>
              <li>Slice and serve hot.</li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RecipeDetails;
