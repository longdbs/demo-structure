import { appConfig } from "../config/appConfig";

export const getProductList = () => {
  console.log(appConfig.apiUrl);
  return [{ id: "1", name: "Product 1", price: 1000 }];
};
