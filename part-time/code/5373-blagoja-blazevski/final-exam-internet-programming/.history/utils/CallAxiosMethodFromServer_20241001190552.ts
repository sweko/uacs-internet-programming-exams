"use server";

import axios from "axios";
import { useState } from "react";

const getAllData = async () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(0);
  const [error, setError] = useState(null);
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
};
