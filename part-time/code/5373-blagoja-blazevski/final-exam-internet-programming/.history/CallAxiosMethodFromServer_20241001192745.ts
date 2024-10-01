"use server";

import axios from "axios";

const getDataAll = async (objectName: string) => {
  const res = await axios.get(`http://localhost:2999/${objectName}`);
};
