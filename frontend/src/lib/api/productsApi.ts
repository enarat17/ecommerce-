import axios from "axios";
import { Product } from "@/components/types/ProductTableColumns";
import { headers } from "next/headers";

const siteName = process.env.NEXT_PUBLIC_DEVELOPMENT_SITE
// product requests

const productUrl = `${siteName}/api/v1/products`;

// product fetching
export const getProducts = async () => {
  try {
    const response = await axios.get(productUrl);
    return response.data.data.data;
  } catch (error) {
    throw error;
  }
};

export const getFilteredProducts = async (query: string) => {
  try {
    const response = await axios.get(`${productUrl}?${query}`);
    return response.data.data.data;
  } catch (error) {
    throw error;
  }
};

export const getOneProduct = async (id: string) => {
  try {
    const response = await axios.get(`${productUrl}/${id}`);
    return response.data.data.data;
  } catch (error) {
    throw error;
  }
};

//product actions

export const deleteProduct = async (id: string) => {
  try {
    const response = await axios.delete(`${productUrl}/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addProduct = async (data:FormData) => {
  try {
    const response = await axios.post(productUrl, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async ({id,formData}:{id:string,formData:FormData}) => {
  try {
    const response = await axios.patch(
      `${productUrl}/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//product reviews 

export const getProductReviews = async (id:string) => {
  try {
    const response = await axios.get(`${productUrl}/${id}/reviews`);
    return response.data.data.data;
  } catch (error) {
    throw error
}
}
