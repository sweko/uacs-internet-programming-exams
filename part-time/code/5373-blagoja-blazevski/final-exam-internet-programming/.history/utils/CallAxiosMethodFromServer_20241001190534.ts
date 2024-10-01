"use server";

import axios from "axios";

const getAllData = async () => {
  const [isLoading, setIsLoading] = useState(true);
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
};
