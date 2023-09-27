export function isSavedSessionData() {
  const sessionData = sessionStorage.getItem("pageInfo")?.split("-");
  let perPageCount = 0;
  let pageCount = 0;
  if (sessionData) {
    perPageCount = parseInt(sessionData[0]);
    pageCount = parseInt(sessionData[1]);
  }
  return { perPageCount, pageCount };
}
