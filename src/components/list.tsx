import type { ListProp, ResponseData } from "../..";

function List({ itemList }: ListProp) {
  return (
    <div>
      <ul className="listContainer">
        {itemList?.map((item: ResponseData) => {
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
