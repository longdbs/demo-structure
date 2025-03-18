import { getProductList } from "../api/getProductList";

export const useProductList = () => {
  const productList = getProductList();
  return {
    isLoading: false,
    productList,
    error: null,
  };
};
