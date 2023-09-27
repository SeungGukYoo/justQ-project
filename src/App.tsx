import React, { useEffect, useRef } from "react";
import "./App.css";
import ItemPerPage from "./components/itemPerPage";
import List from "./components/list";
import PageNavigation from "./components/pageNavigation";
import usePage from "./hooks/usePage";

function App() {
  const { perPageCount, currentPage, updatePage, updatePerPage, itemList, updateList, totalPageCount } = usePage();
  const detailsRef = useRef<null | HTMLDetailsElement>(null);
  const titleRef = useRef<null | HTMLHeadingElement>(null);
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
      <h1 className="title" ref={titleRef}>
        Just Q Shopping List
      </h1>
      {itemList.length ? (
        <>
          <details className="perPage" ref={detailsRef}>
            <summary>페이지 별 상품 수</summary>
            <ItemPerPage perPageCount={perPageCount} changePerPageCount={changePerPageCount} />
          </details>
          <div className="itemList">
            <List itemList={itemList} />
          </div>

          <PageNavigation
            totalPageCount={totalPageCount}
            updatePage={updatePage}
            currentPage={currentPage}
            titleRef={titleRef}
          />
        </>
      ) : (
        <p className="loadingText">Loading...</p>
      )}
    </div>
  );
}

export default App;
