"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import useFetchData from "@/utils/CallAxiosMethod";
import { IRecipe } from "@/utils/CommonInterfaces";
import { capitalizeFirstLetter } from "@/utils/GeneralMethods";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Statistics = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [cuisines, setCuisines] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [totalRecipesPerCuisine, setTotalRecipesPerCuisine] = useState<
    Record<string, number>
  >({});
  const [totalRecipesPerIngredient, setTotalRecipesPerIngredient] = useState<
    Record<string, number>
  >({});
  const [totalRecipesPerServings, setTotalRecipesPerServings] = useState<
    Record<string, number>
  >({});
  const [totalRecipesPerTime, setTotalRecipesPerTime] = useState<
    Record<string, number>
  >({});

  const totalRecipes = recipes.length;
  const totalCuisines = cuisines.length;
  const totalIngredients = ingredients.length;

  const recipesRes = useFetchData({ objectName: "recipes", method: "GET" });
  const cuisinesRes = useFetchData({ objectName: "cuisines", method: "GET" });
  const ingredientsRes = useFetchData({
    objectName: "ingredients",
    method: "GET",
  });

  const calculateTotalRecipesPerCuisine = () => {
    const totalRecipesPerCuisine: Record<string, number> = {};
    recipes.forEach((recipe) => {
      if (totalRecipesPerCuisine[recipe.cuisine]) {
        totalRecipesPerCuisine[recipe.cuisine] += 1;
      } else {
        totalRecipesPerCuisine[recipe.cuisine] = 1;
      }
    });
    return totalRecipesPerCuisine;
  };
  const calculateTotalRecipesPerServingsRange = () => {
    const totalRecipesPerServingsRange: Record<string, number> = {};
    recipes.forEach((recipe) => {
      if (recipe.servings <= 2) {
        if (totalRecipesPerServingsRange["0-2"]) {
          totalRecipesPerServingsRange["0-2"] += 1;
        } else {
          totalRecipesPerServingsRange["0-2"] = 1;
        }
      } else if (recipe.servings <= 4) {
        if (totalRecipesPerServingsRange["2-4"]) {
          totalRecipesPerServingsRange["2-4"] += 1;
        } else {
          totalRecipesPerServingsRange["2-4"] = 1;
        }
      } else if (recipe.servings <= 6) {
        if (totalRecipesPerServingsRange["4-6"]) {
          totalRecipesPerServingsRange["4-6"] += 1;
        } else {
          totalRecipesPerServingsRange["4-6"] = 1;
        }
      } else if (recipe.servings <= 8) {
        if (totalRecipesPerServingsRange["6-8"]) {
          totalRecipesPerServingsRange["6-8"] += 1;
        } else {
          totalRecipesPerServingsRange["6-8"] = 1;
        }
      } else {
        if (totalRecipesPerServingsRange["8+"]) {
          totalRecipesPerServingsRange["8+"] += 1;
        } else {
          totalRecipesPerServingsRange["8+"] = 1;
        }
      }
    });
    return totalRecipesPerServingsRange;
  };

  const calculateTotalRecipesPerTimeRange = () => {
    const totalRecipesPerTimeRange: Record<string, number> = {};
    recipes.forEach((recipe) => {
      if (recipe.time <= 30) {
        if (totalRecipesPerTimeRange["0-30"]) {
          totalRecipesPerTimeRange["0-30"] += 1;
        } else {
          totalRecipesPerTimeRange["0-30"] = 1;
        }
      } else if (recipe.time <= 60) {
        if (totalRecipesPerTimeRange["30-60"]) {
          totalRecipesPerTimeRange["30-60"] += 1;
        } else {
          totalRecipesPerTimeRange["30-60"] = 1;
        }
      } else if (recipe.time <= 90) {
        if (totalRecipesPerTimeRange["60-90"]) {
          totalRecipesPerTimeRange["60-90"] += 1;
        } else {
          totalRecipesPerTimeRange["60-90"] = 1;
        }
      } else {
        if (totalRecipesPerTimeRange["90+"]) {
          totalRecipesPerTimeRange["90+"] += 1;
        } else {
          totalRecipesPerTimeRange["90+"] = 1;
        }
      }
    });
    return totalRecipesPerTimeRange;
  };

  const calculateTotalRecipesPerIngredient = () => {
    const totalRecipesPerIngredient: Record<string, number> = {};
    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        if (totalRecipesPerIngredient[ingredient.name]) {
          totalRecipesPerIngredient[ingredient.name] += 1;
        } else {
          totalRecipesPerIngredient[ingredient.name] = 1;
        }
      });
    });
    return totalRecipesPerIngredient;
  };

  const renderTotalRecipesList = () => {
    return Object.keys(totalRecipesPerCuisine).map((cuisine) => (
      <div className="text-sm" key={cuisine}>
        <p>
          {cuisine}: {totalRecipesPerCuisine[cuisine]} recipes
        </p>
      </div>
    ));
  };

  const renderTotalIngredientsList = () => {
    return Object.keys(totalRecipesPerIngredient).map((ingredient) => (
      <div className="text-sm" key={ingredient}>
        <p>
          <Link
            className="hover:underline underline-offset-2 hover:text-[#ff5353] transition-all duration-200"
            href={`/Ingredients/${ingredient}`}
          >
            {capitalizeFirstLetter(ingredient)}
          </Link>
          : {totalRecipesPerIngredient[ingredient]} recipes
        </p>
      </div>
    ));
  };

  const renderTotalReciepsPerServingsList = () => {
    return Object.keys(totalRecipesPerServings).map((servings) => (
      <div className="text-sm" key={servings}>
        <p>
          {servings} servings: {totalRecipesPerServings[servings]} recipes
        </p>
      </div>
    ));
  };

  const renderTotalReciepsPerTimeList = () => {
    return Object.keys(totalRecipesPerTime).map((time) => (
      <div className="text-sm" key={time}>
        <p>
          {time} minutes: {totalRecipesPerTime[time]} recipes
        </p>
      </div>
    ));
  };

  useEffect(() => {
    if (recipes.length > 0) {
      setTotalRecipesPerCuisine(calculateTotalRecipesPerCuisine());
      setTotalRecipesPerIngredient(calculateTotalRecipesPerIngredient());
      setTotalRecipesPerServings(calculateTotalRecipesPerServingsRange());
      setTotalRecipesPerTime(calculateTotalRecipesPerTimeRange());
    }
  }, [recipes]);

  useEffect(() => {
    if (!recipesRes.isLoading) {
      if (recipesRes.status === 200) {
        setRecipes(recipesRes.data as IRecipe[]);
        const cuisines = new Set<string>();
        const ingredients = new Set<string>();
        recipesRes.data.forEach((recipe: IRecipe) => {
          cuisines.add(recipe.cuisine);
          recipe.ingredients.forEach((ingredient) => {
            ingredients.add(ingredient.name);
          });
        });
        setCuisines(Array.from(cuisines));
        setIngredients(Array.from(ingredients));
      } else {
        console.log(recipesRes);
      }
    }
  }, [recipesRes.isLoading]);

  useEffect(() => {
    if (!cuisinesRes.isLoading) {
      if (cuisinesRes.status !== 200) {
        console.log(cuisinesRes);
      }
    }
  }, [cuisinesRes.isLoading]);

  useEffect(() => {
    if (!ingredientsRes.isLoading) {
      if (ingredientsRes.status !== 200) {
        console.log(ingredientsRes);
      }
    }
  }, [ingredientsRes.isLoading]);

  return (
    <main className="flex-1">
      <section className="w-full py-16 lg:py-14">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Statistics
          </h1>
        </div>
        <hr className="h-px my-8 bg-gray-200 border-0" />
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="sm:w-[70%] w-full grid sm:grid-cols-3 gap-x-10 text-xl sm:px-4 px-2">
            <Card>
              <CardHeader>
                <p className="p-0 m-0 text-gray-600 text-sm">Total Recipes</p>
                <CardTitle>
                  <p>{totalRecipes}</p>
                </CardTitle>
                <hr className="h-px my-2 bg-gray-200 border-0" />
              </CardHeader>
              <CardContent>
                <p className="mb-2 text-base text-gray-600">
                  Total recipes per servings:
                </p>
                <div className="overflow-y-auto h-22 border border-gray-200">
                  {totalRecipesPerServings &&
                    renderTotalReciepsPerServingsList()}
                </div>
                <p className="mb-2 text-base text-gray-600 mt-2">
                  Total recipes per time range:
                </p>
                <div className="overflow-y-auto h-22 border border-gray-200">
                  {totalRecipesPerTime && renderTotalReciepsPerTimeList()}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <p className="p-0 m-0 text-gray-600 text-sm">Total Cuisines</p>
                <CardTitle>
                  <p>{totalCuisines}</p>
                </CardTitle>
                <hr className="h-px my-2 bg-gray-200 border-0" />
              </CardHeader>
              <CardContent>
                <p className="mb-2 text-base text-gray-600">
                  Total recipes per cuisine:{" "}
                </p>
                <div className="overflow-y-auto h-52 border border-gray-200">
                  {totalRecipesPerCuisine && renderTotalRecipesList()}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <p className="p-0 m-0 text-gray-600 text-sm">
                  Total Ingredients
                </p>
                <CardTitle>
                  <p>{totalIngredients}</p>
                </CardTitle>
                <hr className="h-px my-2 bg-gray-200 border-0" />
                <CardContent>
                  <p className="mb-2 text-base text-gray-600">
                    Total recipes per ingredient:
                  </p>
                  <div className="overflow-y-auto h-52 border border-gray-200">
                    {totalRecipesPerIngredient && renderTotalIngredientsList()}
                  </div>
                </CardContent>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Statistics;
