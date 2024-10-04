"use client";

import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import useFetchData from "@/utils/CallAxiosMethod";
import { IData, IRecipe } from "@/utils/CommonInterfaces";
import { renderCards, renderPagination } from "@/utils/GeneralMethods";
import axios from "axios";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Recipes() {
  const objectName = usePathname().substring(1);

  const [data, setData] = useState<IRecipe[]>();
  const [cuisine, setCuisine] = useState<string[]>([]);
  const [ingredient, setIngredient] = useState<string[]>([]);
  const [filterValue, setFilterValue] = useState<{
    search_q: string;
    cuisine: string;
    ingredient: string;
  }>({
    search_q: "",
    cuisine: "",
    ingredient: "",
  });
  const [sortAsc, setSortAsc] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    resortData();
  }, [sortAsc]);

  const resortData = async () => {
    const query_url = getQueryUrl();

    try {
      const res = await axios.get(`http://localhost:2999/${query_url}`);

      if (res.status === 200) {
        // console.log("Resort data set");
        setData(res.data as IRecipe[]);
      } else {
        console.log(res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getQueryUrl = () => {
    const search_q =
      filterValue.search_q !== ""
        ? `title_like=${encodeURIComponent(
            filterValue.search_q
          )}&_sort=title&_order=${sortAsc ? "asc" : "desc"}`
        : `&_sort=title&_order=${sortAsc ? "asc" : "desc"}`;

    const ingredient_q = filterValue.ingredient
      ? `q=${encodeURIComponent(filterValue.ingredient)}`
      : "";

    const cuisine_q = filterValue.cuisine
      ? `cuisine=${filterValue.cuisine}`
      : "";

    const query_url = `recipes?${search_q}${
      ingredient_q !== "" ? `&${ingredient_q}` : ``
    }${cuisine_q !== "" ? `&${cuisine_q}` : ``}`;

    // console.log(query_url);
    return query_url;
  };

  const filterRecipes = async () => {
    const query_url = getQueryUrl();
    console.log(query_url);
    try {
      const res = await axios.get(`http://localhost:2999/${query_url}`);

      if (res.status === 200) {
        console.log("Filter data set");
        setData(res.data as IRecipe[]);
        setCurrentPage(1);
      } else {
        console.log(res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetFilter = async () => {
    const query_url = `recipes?_sort=title&_order=${sortAsc ? "asc" : "desc"}`;

    const res = await axios.get(`http://localhost:2999/${query_url}`);

    if (res.status === 200) {
      console.log("Reset filter data set");
      setData(res.data as IRecipe[]);
    } else {
      console.log(res.status);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 15;

  const handlePageClick = (value: number) => {
    setCurrentPage(value);
  };

  // const res = useFetchData({ objectName: getQueryUrl(), method: "GET" });
  const resCuisine = useFetchData({ objectName: "cuisines", method: "GET" });
  const resIngredient = useFetchData({
    objectName: "ingredients",
    method: "GET",
  });

  useEffect(() => {
    if (!resCuisine.isLoading) {
      if (resCuisine.status === 200) {
        // console.log(resCuisine.data);
        setCuisine(resCuisine.data as string[]);
      }
    }
  }, [resCuisine.isLoading]);

  useEffect(() => {
    if (!resIngredient.isLoading) {
      if (resIngredient.status === 200) {
        // console.log(resIngredient.data);
        setIngredient(resIngredient.data as string[]);
      }
    }
  }, [resIngredient.isLoading]);

  // useEffect(() => {
  //   if (!res.isLoading) {
  //     if (res.status === 200) {
  //       // console.log(res.data);
  //       setData(res.data as IRecipe[]);
  //     } else {
  //       console.log(res.status);
  //     }
  //   }
  // }, [res.isLoading]);

  return (
    <main className="flex-1">
      <section className="w-full py-16 lg:py-14">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            All Recipes
          </h1>
        </div>
        <hr className="h-px my-8 bg-gray-200 border-0" />
        <div className="grid md:grid-cols-3 grid-cols-1 justify-center w-full">
          <Input
            name="search_q"
            className="w-full"
            caption="Title"
            value={filterValue.search_q}
            onChange={(e) =>
              setFilterValue({ ...filterValue, search_q: e.target.value })
            }
          />

          <Dropdown
            name="cuisine"
            caption="Cuisine"
            className="w-full"
            options={cuisine}
            value={filterValue.cuisine}
            onChange={(e) =>
              setFilterValue({ ...filterValue, cuisine: e.target.value })
            }
          />
          <Dropdown
            name="ingredient"
            caption="Ingredient"
            options={ingredient}
            value={filterValue.ingredient}
            onChange={(e) =>
              setFilterValue({ ...filterValue, ingredient: e.target.value })
            }
          />
        </div>
        <div className="w-full flex justify-center mb-3 md:px-4 px-2 gap-2">
          <Button
            style="positive"
            className="sm:w-72 w-full"
            onClick={filterRecipes}
          >
            Filter
          </Button>
          <Button
            style="secondary"
            className="sm:w-24 w-full h-10 self-center"
            onClick={() => {
              setSortAsc((prev) => !prev);
            }}
          >
            {sortAsc ? "Asc ▲" : "Desc ▼"}
          </Button>
          <Button
            style="danger"
            className="sm:w-72 w-full"
            onClick={resetFilter}
          >
            Clear Filter
          </Button>
        </div>
        <hr className="h-px my-8 bg-gray-200 border-0" />
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="inline space-x-2">
            {data && data?.length > 0 ? (
              renderPagination(
                data as IData[],
                pageSize,
                currentPage,
                handlePageClick
              )
            ) : (
              <p>No recipes found</p>
            )}
          </div>
          {!data && <p>Loading...</p>}
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
          <Link href="/Recipes/Create" className="w-full">
            <Button style="positive" className="sm:w-72 w-full">
              Add Recipe
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
