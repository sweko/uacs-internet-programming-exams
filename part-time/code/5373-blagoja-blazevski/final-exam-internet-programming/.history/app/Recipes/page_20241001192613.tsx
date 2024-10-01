"use client";

import useFetchData from "@/utils/CallAxiosMethod";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Recipes() {
  const router = useRouter();

  // const query = useSearchParams().get("");
  const objectName = usePathname().substring(1);
  console.log(objectName);

  const res = useFetchData({ objectName, method: "GET" });

  useEffect(() => {
    console.log(res.isLoading);
  }, [res.isLoading]);
  return (
    <div>
      <main>tEST</main>
    </div>
  );
}
