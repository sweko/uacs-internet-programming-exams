"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import useFetchData from "@/utils/CallAxiosMethod";
import { IRecipe } from "@/utils/CommonInterfaces";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Recipes() {
  const router = useRouter();

  const objectName = usePathname().substring(1);
  console.log(objectName);

  const res = useFetchData({ objectName, method: "GET" });

  useEffect(() => {
    if (!res.isLoading) {
      if (res.status === 200) {
        console.log(res.data);
      }
    }
  }, [res.isLoading]);

  const renderRecipes = () => {
    return res.data.map((recipe: IRecipe) => (
      <Link href={`Recipes/${recipe.id}`} key={recipe.id}>
        <Card>
          <CardHeader>
            <CardTitle>{recipe.title}</CardTitle>
            <CardDescription>{recipe.description}</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </Link>
    ));
  };

  return (
    <main className="flex-1">
      <section className="w-full py-16 lg:py-14">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="grid gap-4 md:grid-cols-5">
            <Link href="Recipes/1">
              <Card>
                <CardHeader>
                  <CardTitle>Recipe Title</CardTitle>
                  <CardDescription>Recipe Description</CardDescription>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
