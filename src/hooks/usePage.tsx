import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ResponseData } from "../App";
import { HttpClient } from "../util/httpClient";

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
    async (httpClient: HttpClient) => {
      try {
        const data = await httpClient.get();
        const convertDataToArray: Array<ResponseData[]> = [];
        for (let i = 0; i < Math.ceil(data.length / perPageCount); i++) {
          convertDataToArray.push(await data.slice(i * perPageCount, (i + 1) * perPageCount));
        }
        setTotalPageCount(Math.ceil(data.length / perPageCount));
        setItemList(convertDataToArray[currentPage]);
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
