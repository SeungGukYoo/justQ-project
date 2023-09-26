import { ResponseData } from "../..";

interface IHttpClient {
  get(): Promise<Array<ResponseData>>;
}

export class HttpClient implements IHttpClient {
  #baseUrl: string;

  constructor() {
    this.#baseUrl = "https://just-q-json-server-vercel.vercel.app/posts";
  }

  async get(): Promise<Array<ResponseData>> {
    const data = await fetch(this.#baseUrl);
    return data.json();
  }
}
