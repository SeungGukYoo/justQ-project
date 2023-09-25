import React, { useEffect, useState } from "react";
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
  const [currentPage, setPageCount] = useState(1);

  useEffect(() => {
    const callData = async () => {
      try {
        const data = await httpClient.get();
        const filterData = await data.filter((itemData: ResponseData, idx: number) => idx < perPageCount);
        setTotalPageCount(Math.ceil(data.length / perPageCount));
        setItemList(filterData);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    };

    callData();
  }, [httpClient, setItemList, perPageCount]);
  
  
  return (
    <div className="home">
      <h1 className="title">Just Q Shopping List</h1>
      <details className="perPage">
        <summary>페이지 별 상품 수</summary>
        <ul data-testid="per-page">
          {itemPerCount.map((itemCount, idx) => (
            <li
              key={idx}
              style={{
                background: `${itemCount === perPageCount ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0.2)"}`,
              }}
            >
              {itemCount}
            </li>
          ))}
        </ul>
      </details>
      <div className="itemList">
        {itemList.length ? <List itemList={itemList} /> : <p className="loadingText">Loading...</p>}
      </div>
      <div className="navigationBar">
        <button>첫 페이지</button>
        <button>이전 페이지</button>
        <ul data-testid="page-count">
          {Array.from({ length: totalPageCount }, (_, idx) => {
            return (
              <li
                style={{
                  color: `${idx + 1 === currentPage && "black"}`,
                }}
                key={idx}
              >
                {idx + 1}
              </li>
            );
          })}
          {/* <li
            style={{
              color: `${true ? "black" : "#eee"}`,
              cursor: `${true ? "default" : "pointer"}`,
            }}
          >
            1
          </li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li> */}
        </ul>
        <button>다음 페이지</button>
        <button>마지막 페이지</button>
      </div>
    </div>
  );
}

export default App;
