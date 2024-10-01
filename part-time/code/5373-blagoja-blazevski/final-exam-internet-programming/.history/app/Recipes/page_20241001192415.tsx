"use client";

import useFetchData from "@/utils/CallAxiosMethodFromServer";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Recipes() {
  const router = useRouter();

  // const query = useSearchParams().get("");
  const objectName = usePathname().substring(1);
  console.log(objectName);

  const res = useFetchData({ objectName, method: "GET" });
  return (
    <div>
      <main>tEST</main>
    </div>
  );
}
