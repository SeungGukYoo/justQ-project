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
function App({ httpClient }: Prop) {
  const [itemList, setItemList] = useState<[] | ResponseData[]>([]);

  useEffect(() => {
    const callData = async () => {
      try {
        const data = await httpClient.get();
        setItemList(data);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    };

    callData();
  }, [setItemList, httpClient]);

  return (
    <div className="home">
      <h1 className="title">Just Q Shopping List</h1>
      <details className="perPage">
        <summary>페이지 별 상품 수</summary>
        <ul data-testid="per-page">
          <li>5</li>
          <li>10</li>
          <li>30</li>
          <li>50</li>
          <li>100</li>
        </ul>
      </details>
      <div className="itemList">
        {itemList.length ? <List itemList={itemList} /> : <p className="loadingText">Loading...</p>}
      </div>
      <div className="navigationBar">
        <button>첫 페이지</button>
        <button>이전 페이지</button>
        <ul data-testid="page-count">
          <li
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
          <li>5</li>
        </ul>
        <button>다음 페이지</button>
        <button>마지막 페이지</button>
      </div>
    </div>
  );
}

export default App;
