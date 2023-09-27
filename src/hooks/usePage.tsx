import { useCallback, useState } from "react";

import { ResponseData } from "../..";
import { HttpClient } from "../util/httpClient";

const httpClient = new HttpClient();

export default function usePage() {
  const [itemList, setItemList] = useState<[] | ResponseData[]>([]);
  const [perPageCount, setPerPageCount] = useState(30);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [currentPage, setCurrentPageCount] = useState(0);

  const updatePage = (pageNumber: number) => {
    setCurrentPageCount(pageNumber);
  };

  const updatePerPage = (pageCount: number) => {
    setPerPageCount(pageCount);
    setCurrentPageCount(0);
  };

  const updateList = useCallback(
    async (perPage: number = perPageCount, page: number = currentPage) => {
      try {
        const data = await httpClient.get();
        const convertDataToArray: Array<ResponseData[]> = [];
        for (let i = 0; i < Math.ceil(data.length / perPage); i++) {
          convertDataToArray.push(data.slice(i * perPage, (i + 1) * perPage));
        }
        setTotalPageCount(Math.ceil(data.length / perPage));
        setItemList(convertDataToArray[page]);
        setPerPageCount(perPage);
        setCurrentPageCount(page);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    },
    [currentPage, perPageCount]
  );

  return { perPageCount, currentPage, updatePage, updatePerPage, itemList, updateList, totalPageCount };
}
