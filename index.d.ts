import { HttpClient } from "./src/util/httpClient";

export interface ResponseData {
  brand: string;
  category_code: string;
  id: string;
  keywords: string[];
  main_image: string;
  model: string | null;
  origin: string;
  owner_product_code: string;
  price: string;
  product_name: string;
  status: string;
}

export interface Prop {
  httpClient: HttpClient;
}
