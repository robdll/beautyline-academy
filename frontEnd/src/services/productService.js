import apiClient from "../utils/api.client";

export const getProducts = async () => {
    return await apiClient("/product");
};
