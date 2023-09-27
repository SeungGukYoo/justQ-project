import React from "react";
import { IPageNavigation } from "../..";

function PageNavigation({ totalPageCount, updatePage, currentPage, titleRef }: IPageNavigation) {
  const movePage = (pageNumber: number) => {
    updatePage(pageNumber);
    if (titleRef) titleRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="navigationBar">
      <button onClick={() => movePage(0)}>&lt;&lt;</button>
      <button onClick={() => movePage(currentPage - 1)}>&lt;</button>
      <ul>
        {Array.from({ length: totalPageCount }, (_, idx) => {
          return (
            <li
              onClick={() => movePage(idx)}
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
      <button onClick={() => movePage(currentPage + 1)}>&gt;</button>
      <button onClick={() => movePage(totalPageCount - 1)}>&gt;&gt;</button>
    </div>
  );
}

export default PageNavigation;
