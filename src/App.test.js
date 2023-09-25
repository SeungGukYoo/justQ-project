import "@testing-library/jest-dom";
import { findByTestId, render, screen, within } from "@testing-library/react";
import App from "./App";

test("only renders a UI", async () => {
  render(<App />);

  const header = screen.getByText("Just Q Shopping List");
  const details = screen.getByText("페이지 별 상품 수");
  const perPage = screen.getByTestId("per-page");
  const pageCount = screen.getByTestId("page-count");
  const perPageList = within(perPage).getAllByRole("listitem");

  const itemList = await screen.findByTestId("item-list");
  const itemCount = await within(itemList).findAllByRole("listitem");

  const pageCountList = within(pageCount).getAllByRole("listitem");
  const nextPage = screen.getByRole("button", {
    name: /다음 페이지/,
  });
  const prePage = screen.getByRole("button", {
    name: /이전 페이지/,
  });

  const firstPage = screen.getByRole("button", {
    name: /첫 페이지/,
  });
  const lastPage = screen.getByRole("button", {
    name: /마지막 페이지/,
  });

  expect(perPageList).toHaveLength(5);
  expect(pageCountList).toHaveLength(5);
  expect(itemCount.length).toBeGreaterThan(1);
  expect(prePage).toBeInTheDocument();
  expect(nextPage).toBeInTheDocument();
  expect(firstPage).toBeInTheDocument();
  expect(lastPage).toBeInTheDocument();
  expect(header).toBeInTheDocument();
  expect(details).toBeInTheDocument();
});
