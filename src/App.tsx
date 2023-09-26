import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import List from "./components/list";
import { HttpClient } from "./util/httpClient";
export interface ResponseData {
  brand: string;
  category_code: string;
  id: string;
  keywords: string[];
  main_image: string;
  model: string | null;
  origin: string;
  owner_product_code: string;
  price: string;
  product_name: string;
  status: string;
}

interface Prop {
  httpClient: HttpClient;
}

const itemPerCount = [5, 10, 30, 50, 100];
function App({ httpClient }: Prop) {
  const [itemList, setItemList] = useState<[] | ResponseData[]>([]);
  const [perPageCount, setPerPageCount] = useState(30);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [currentPage, setCurrentPageCount] = useState(0);
  const detailsRef = useRef<null | HTMLDetailsElement>(null);
  useEffect(() => {
    const callData = async () => {
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
    };
    callData();
  }, [httpClient, setItemList, perPageCount, currentPage]);

  const pageMove = (pageNumber: number) => {
    setCurrentPageCount(pageNumber);
  };

  const changePerPageCount = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    if (parseInt(e.currentTarget.innerText) === perPageCount) return;
    setPerPageCount(parseInt(e.currentTarget.innerText));
    setCurrentPageCount(0);
    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
  };
  return (
    <div className="home">
      <h1 className="title">Just Q Shopping List</h1>
      {itemList.length ? (
        <>
          <details className="perPage" ref={detailsRef}>
            <summary>페이지 별 상품 수</summary>
            <ul data-testid="per-page">
              {itemPerCount.map((itemCount, idx) => (
                <li
                  key={idx}
                  style={{
                    background: `${itemCount === perPageCount ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0.2)"}`,
                  }}
                  onClick={changePerPageCount}
                >
                  {itemCount}
                </li>
              ))}
            </ul>
          </details>
          <div className="itemList">
            <List itemList={itemList} />
          </div>
          <div className="navigationBar">
            <button onClick={() => pageMove(0)}>&lt;&lt;</button>
            <button onClick={() => pageMove(currentPage - 1)}>&lt;</button>
            <ul data-testid="page-count">
              {Array.from({ length: totalPageCount }, (_, idx) => {
                return (
                  <li
                    onClick={() => pageMove(idx)}
                    style={{
                      color: `${idx + 1 === currentPage + 1 ? "black" : "rgba(128, 128, 128, 0.7)"}`,
                    }}
                    key={idx}
                  >
                    {idx + 1}
                  </li>
                );
              })}
            </ul>
            <button onClick={() => pageMove(currentPage + 1)}>&gt;</button>
            <button onClick={() => pageMove(totalPageCount - 1)}>&gt;&gt;</button>
          </div>
        </>
      ) : (
        <p className="loadingText">Loading...</p>
      )}
    </div>
  );
}

export default App;
