import React from "react";
import { IItemPerPage } from "../..";

const itemPerCount = [5, 10, 30, 50, 100];
function ItemPerPage({ perPageCount, changePerPageCount }: IItemPerPage) {
  return (
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
  );
}

export default ItemPerPage;
