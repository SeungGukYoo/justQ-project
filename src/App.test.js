import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import App from "./App";
import List from "./components/list";
import { HttpClient } from "./util/httpClient";

test("only renders a UI", async () => {
  const httpClient = new HttpClient();
  // const data = await httpClient.get();
  render(<App httpClient={httpClient} />);

  // render(<List itemList={data} />);

  const header = screen.getByText("Just Q Shopping List");
  const details = screen.getByText("페이지 별 상품 수");
  const perPage = screen.getByTestId("per-page");
  const pageCount = screen.getByTestId("page-count");
  const perPageList = within(perPage).getAllByRole("listitem");

  const itemList = await screen.findByTestId("item-list");

  const itemCount = await within(itemList).findAllByRole("listitem");

  const pageCountList = await within(pageCount).findAllByRole("listitem");
  const nextPage = screen.getByText(">");
  const prePage = screen.getByText("<");

  const firstPage = screen.getByText("<<");
  const lastPage = screen.getByText(">>");

  expect(perPageList).toHaveLength(5);
  expect(pageCountList.length).toBeGreaterThan(1);
  expect(itemCount.length).toBeGreaterThan(1);
  expect(prePage).toBeInTheDocument();
  expect(nextPage).toBeInTheDocument();
  expect(firstPage).toBeInTheDocument();
  expect(lastPage).toBeInTheDocument();
  expect(header).toBeInTheDocument();
  expect(details).toBeInTheDocument();
});
