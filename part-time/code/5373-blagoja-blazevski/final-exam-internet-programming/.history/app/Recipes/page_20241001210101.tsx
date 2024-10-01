"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import useFetchData from "@/utils/CallAxiosMethod";
import Image from "next/image";
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

  return (
    <main className="flex-1">
      <section className="w-full py-16 lg:py-14">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="grid gap-4 md:grid-cols-5">
            <Card>
              <CardHeader>
                <CardTitle>Recipe Title</CardTitle>
                <CardDescription>Recipe Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p
                  style={{
                    width: "300px",
                    height: "200px",
                  }}
                >
                  Image for food here. 🍽️
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
