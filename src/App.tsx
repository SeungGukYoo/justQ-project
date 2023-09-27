import React, { useEffect, useRef } from "react";
import "./App.css";
import List from "./components/list";
import usePage from "./hooks/usePage";

const itemPerCount = [5, 10, 30, 50, 100];
function App() {
  const { perPageCount, currentPage, updatePage, updatePerPage, itemList, updateList, totalPageCount } = usePage();
  const detailsRef = useRef<null | HTMLDetailsElement>(null);

  useEffect(() => {
    const beforeUnloadSavedPage = (e: BeforeUnloadEvent) => {
      console.log("running saved");
      sessionStorage.setItem("pageInfo", perPageCount.toString() + "-" + currentPage.toString());
    };
    window.addEventListener("beforeunload", beforeUnloadSavedPage);
    return () => window.removeEventListener("beforeunload", beforeUnloadSavedPage);
  }, [perPageCount, currentPage]);

  useEffect(() => {
    updateList();
  }, [updateList]);

  const changePerPageCount = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    const choicedPerPageValue = parseInt(e.currentTarget.innerText);
    if (choicedPerPageValue === perPageCount) return;
    updatePerPage(choicedPerPageValue);

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
            <button onClick={() => updatePage(0)}>&lt;&lt;</button>
            <button onClick={() => updatePage(currentPage - 1)}>&lt;</button>
            <ul data-testid="page-count">
              {Array.from({ length: totalPageCount }, (_, idx) => {
                return (
                  <li
                    onClick={() => updatePage(idx)}
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
            <button onClick={() => updatePage(currentPage + 1)}>&gt;</button>
            <button onClick={() => updatePage(totalPageCount - 1)}>&gt;&gt;</button>
          </div>
        </>
      ) : (
        <p className="loadingText">Loading...</p>
      )}
    </div>
  );
}

export default App;
