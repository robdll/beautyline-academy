import apiClient from "../utils/api.client";

const PRODUCT_ENDPOINT = "/product";

export const getProducts = () => {
  return apiClient(PRODUCT_ENDPOINT);
};
