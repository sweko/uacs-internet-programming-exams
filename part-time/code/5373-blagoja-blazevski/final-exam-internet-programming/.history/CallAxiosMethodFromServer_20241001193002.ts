"use server";

import axios from "axios";
import { IData } from "./utils/CommonInterfaces";
const getDataAll = async (objectName: string): Promise<IData[]> => {
  try {
    const res = await axios.get(`http://localhost:2999/${objectName}`);
    return res.data; // Ensure you return the data
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
};
