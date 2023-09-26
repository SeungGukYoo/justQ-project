interface IHttpClient {
  baseUrl: string;
  get(): Promise<Response>;
}

export class HttpClient implements IHttpClient {
  baseUrl = "https://just-q-json-server-vercel.vercel.app/posts";
  async get() {
    const data = await fetch(this.baseUrl);
    return data.json();
  }
}
