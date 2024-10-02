import { IData } from "./CommonInterfaces";

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const renderPagination = (
  data: IData,
  recordsPerPage: number,
  currentPage: number,
  onClick?: (value: number) => void
) => {
  const pages = Math.ceil(data.length / recordsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return pageNumbers.map((number) => (
    <button
      key={number}
      onClick={() => {
        if (onClick) onClick(number);
        currentPage = number;
      }}
      className={`${
        number === currentPage
          ? "bg-[#ff5353] text-white"
          : "bg-white text-[#ff5353]"
      } px-3 py-1 rounded-lg hover:outline`}
    >
      {number}
    </button>
  ));
};
