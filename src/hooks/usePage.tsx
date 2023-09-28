import { useCallback, useEffect, useState } from "react";
import type { ResponseData } from "../..";
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
    const data = await httpClient.get();
    const convertDataToArray: Array<ResponseData[]> = [];
    const calcTotalPage = Math.ceil(data.length / perPageCount);
    for (let i = 0; i < calcTotalPage; i++) {
      convertDataToArray.push(data.slice(i * perPageCount, (i + 1) * perPageCount));

      setTotalPageCount(calcTotalPage);
      setItemList(convertDataToArray[currentPage]);
      setPerPageCount(perPageCount);
      setCurrentPageCount(currentPage);
    }
  }, [currentPage, perPageCount]);

  useEffect(() => {
    const beforeUnloadSavedPage = () => {
      sessionStorage.setItem("pageInfo", perPageCount.toString() + "-" + currentPage.toString());
    };
    window.addEventListener("beforeunload", beforeUnloadSavedPage);
    return () => window.removeEventListener("beforeunload", beforeUnloadSavedPage);
  }, [perPageCount, currentPage]);

  return { perPageCount, currentPage, updatePage, updatePerPage, itemList, updateList, totalPageCount };
}
