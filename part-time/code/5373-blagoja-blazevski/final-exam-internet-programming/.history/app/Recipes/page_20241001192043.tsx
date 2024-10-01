import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Recipes() {
  const router = useRouter();

  const query = router.query;
  console.log(query);
  return (
    <div>
      <main>tEST</main>
    </div>
  );
}
