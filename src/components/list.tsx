import React from "react";
import { ResponseData } from "../..";

interface Prop {
  itemList: ResponseData[];
}
function List({ itemList }: Prop) {
  return (
    <div>
      <ul className="listContainer" data-testid="item-list">
        {itemList?.map((item, idx) => {
          return (
            <li className="itemContainer" key={item.id}>
              <div className="imgBox">
                <img src={item.main_image} alt={`${item.product_name}이미지`} />
              </div>
              <h2>{item.product_name}</h2>
              <p>{item.price}원</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default List;
