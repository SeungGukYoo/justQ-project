import React, { useEffect, useState } from "react";

interface ResponseData {
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

function App() {
  const [itemList, setItemList] = useState<[] | ResponseData[]>([]);
  useEffect(() => {
    const callData = async () => {
      try {
        const data = await fetch("https://just-q-json-server-vercel.vercel.app/posts");
        const json = await data.json();
        setItemList(json);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    };

    callData();
  }, []);
  console.log(itemList);
  return (
    <div className="home">
      <h1>Just Q Shopping List</h1>
      <details>
        <summary>페이지 별 상품 수</summary>
        <ul data-testid="per-page">
          <li>5</li>
          <li>10</li>
          <li>30</li>
          <li>50</li>
          <li>100</li>
        </ul>
      </details>
      <div>
        <ul data-testid="item-list">
          {itemList?.map((item, idx) => {
            if (idx < 3) {
              return <li key={item.id}>{item.product_name}</li>;
            }
          })}
        </ul>
      </div>
      <div>
        <button>첫 페이지</button>
        <button>이전 페이지</button>
        <ul data-testid="page-count">
          <li>
            <button>1</button>
          </li>
          <li>
            <button>2</button>
          </li>
          <li>
            <button>3</button>
          </li>
          <li>
            <button>4</button>
          </li>
          <li>
            <button>5</button>
          </li>
        </ul>
        <button>다음 페이지</button>
        <button>마지막 페이지</button>
      </div>
    </div>
  );
}

export default App;
