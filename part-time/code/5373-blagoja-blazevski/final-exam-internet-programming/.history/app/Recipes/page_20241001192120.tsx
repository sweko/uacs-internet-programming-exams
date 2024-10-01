import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export default function Recipes() {
  const router = useRouter();

  const query = useSearchParams().get("query");
  console.log(query);
  return (
    <div>
      <main>tEST</main>
    </div>
  );
}
