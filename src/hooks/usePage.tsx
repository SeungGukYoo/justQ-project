import { useCallback, useEffect, useState } from "react";

import { ResponseData } from "../..";
import { HttpClient } from "../util/httpClient";
import { isSavedSessionData } from "../util/sessionClient";

const httpClient = new HttpClient();

export default function usePage() {
  const [itemList, setItemList] = useState<[] | ResponseData[]>([]);
  const [perPageCount, setPerPageCount] = useState(isSavedSessionData().perPageCount || 30);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [currentPage, setCurrentPageCount] = useState(isSavedSessionData().pageCount || 0);

  const updatePage = (pageNumber: number) => {
    setCurrentPageCount(pageNumber);
  };

  const updatePerPage = (pageCount: number) => {
    setPerPageCount(pageCount);
    setCurrentPageCount(0);
  };

  const updateList = useCallback(async () => {
    try {
      const data = await httpClient.get();
      const convertDataToArray: Array<ResponseData[]> = [];
      for (let i = 0; i < Math.ceil(data.length / perPageCount); i++) {
        convertDataToArray.push(data.slice(i * perPageCount, (i + 1) * perPageCount));
      }
      setTotalPageCount(Math.ceil(data.length / perPageCount));
      setItemList(convertDataToArray[currentPage]);
      setPerPageCount(perPageCount);
      setCurrentPageCount(currentPage);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }, [currentPage, perPageCount]);

  useEffect(() => {
    const beforeUnloadSavedPage = (e: BeforeUnloadEvent) => {
      sessionStorage.setItem("pageInfo", perPageCount.toString() + "-" + currentPage.toString());
    };
    window.addEventListener("beforeunload", beforeUnloadSavedPage);
    return () => window.removeEventListener("beforeunload", beforeUnloadSavedPage);
  }, [perPageCount, currentPage]);

  return { perPageCount, currentPage, updatePage, updatePerPage, itemList, updateList, totalPageCount };
}
