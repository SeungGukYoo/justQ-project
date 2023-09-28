import type { IHttpClient, ResponseData } from "../..";

export class HttpClient implements IHttpClient {
  #baseUrl: string;

  constructor() {
    this.#baseUrl = "https://just-q-json-server-vercel.vercel.app/posts";
  }

  async get(): Promise<Array<ResponseData>> {
    try {
      const response = await fetch(this.#baseUrl);
      if (!response.ok) {
        throw new Error("통신에 문제가 발생하였습니다.");
      }
      const result: Promise<Array<ResponseData>> = response.json();
      return result;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("예상치 못한 에러가 발생하였습니다.");
    }
  }
}
