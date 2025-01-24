"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import useFetchData from "@/utils/CallAxiosMethod";
import { capitalizeFirstLetter } from "@/utils/GeneralMethods";
import { IRecipe } from "@/utils/CommonInterfaces";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";

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
        console.log(res);
      }
    }
  }, [res.isLoading]);

  const renderIngredients = () => {
    return data?.ingredients.map((ingredient, index) => (
      <li key={data.title + "_ingredient_" + index}>
        <Link
          className="hover:underline underline-offset-2 hover:text-[#ff5353] transition-all duration-200"
          href={`/Ingredients/${ingredient.name}`}
        >
          {capitalizeFirstLetter(ingredient.name)}
        </Link>{" "}
        {ingredient.quantity ? "-" : ""} {ingredient.quantity} {ingredient.unit}
      </li>
    ));
  };

  const renderInstructions = () => {
    return data?.instructions
      .split("\n")
      .map((instruction, index) => (
        <li key={data.title + "_instruction_" + index}>{instruction}</li>
      ));
  };

  const formatTime = (time?: number) => {
    if (!time) return "N/A";
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours > 0 ? hours + "h " : ""}${
      minutes > 0 ? `${minutes}m` : ""
    }`;
  };

  if (res.isLoading) {
    return (
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Loading...
            </h1>
          </div>
        </section>
      </main>
    );
  } else if (res.status !== 200) {
    return (
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Error
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              {res.status}: {res.error}
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <section className="w-full py-16 lg:py-14">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            {data?.title}
            <p className="m-0 p-0 text-xs tracking-normal">Recipe Id: {id}</p>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <ul className="grid gap-4 md:grid-cols-3 grid-cols-2">
              <li>
                <Card>
                  <CardHeader>
                    <CardTitle>Servings 🍽️</CardTitle>
                    <hr />
                  </CardHeader>
                  <CardContent className="flex items-center">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm text-muted-foreground">
                        {data?.servings} servings
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </li>
              <li>
                <Card>
                  <CardHeader>
                    <CardTitle>Time 🕛</CardTitle>
                    <hr />
                  </CardHeader>
                  <CardContent className="flex items-center">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm text-muted-foreground">
                        {formatTime(data?.time)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </li>
              <li>
                <Card>
                  <CardHeader>
                    <CardTitle>Cuisine 🌍</CardTitle>
                    <hr />
                  </CardHeader>
                  <CardContent className="flex items-center">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm text-muted-foreground">
                        <Link
                          className="hover:underline underline-offset-2 hover:text-[#ff5353] transition-all duration-200"
                          href={`/Cuisines/${data?.cuisine}`}
                        >
                          {data?.cuisine}
                        </Link>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </li>
            </ul>
            <div className="flex justify-center space-x-4"></div>
          </div>
        </div>
        <div className="text-center">
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg font-extralight">
            &quot;{data?.description}&quot;
          </p>
        </div>
        <hr className="h-px my-8 bg-gray-200 border-0" />
        <div className="mx-auto max-w-3xl space-y-8 px-5">
          <div>
            <h2 className="text-2xl font-bold">Ingredients</h2>
            <ul className="mt-4 list-inside list-disc space-y-2">
              {data && renderIngredients()}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Instructions</h2>
            <ul className="mt-4 list-inside space-y-2">
              {data && renderInstructions()}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RecipeDetails;
