/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const fetchGetProductData = async (
  category: string,
  from: string,
  to: string
) => {
  try {
    const fromPrice = from ? from : "";
    const toPrice = to ? to : "";
    const givenCategory = category ? category : "";

    const response = await axios.get(
      `https://level-2-24-assignment-9-server.vercel.app/api/products?category=${givenCategory}&from=${fromPrice}&to=${toPrice}`
    );
    const result = response?.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const fetchGetProductDataWithCategory = async () => {
  try {
    const response = await axios.get(
      `https://level-2-24-assignment-9-server.vercel.app/api/products/get-with-category`
    );
    const result = response?.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const fetchGetProductDataWithFlashSale = async () => {
  try {
    const response = await axios.get(
      `https://level-2-24-assignment-9-server.vercel.app/api/products/get-with-flashSale`
    );
    const result = response?.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const fetchGetProductDataWithId = async (id: string) => {
  try {
    const response = await axios.get(
      `https://level-2-24-assignment-9-server.vercel.app/api/products/get-with-id/${id}`
    );
    const result = response?.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const fetchGetPurchasedHistoryUsingId = async () => {
  try {
    const token = localStorage.getItem("userToken");
    const response = await axios.get(
      `https://level-2-24-assignment-9-server.vercel.app/api/purchaseProducts/get-purchased-history`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const result = response?.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const fetchUpdateProductDataWithId = async (id: string, data: any) => {
  console.log(data);
  try {
    const response = await axios.patch(
      `https://level-2-24-assignment-9-server.vercel.app/api/products/update-with-id/${id}`,
      data
    );
    const result = response?.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUpdateProductImgWithId = async (id: string, data: any) => {
  console.log(data);
  try {
    const response = await axios.patch(
      `https://level-2-24-assignment-9-server.vercel.app/api/products/img-update/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const result = response?.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const fetchPostProductData = async (data: any) => {
  try {
    const token = localStorage.getItem("userToken");
    const response = await axios.post(
      `https://level-2-24-assignment-9-server.vercel.app/api/products/create-product`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
    const result = response?.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDeleteProductDataWithId = async (id: string) => {
  try {
    const response = await axios.delete(
      `https://level-2-24-assignment-9-server.vercel.app/api/products/delete-with-id/${id}`
    );
    const result = response?.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const fetchAddToCartProductData = async (data: any) => {
  try {
    const response = await axios.post(
      `https://level-2-24-assignment-9-server.vercel.app/api/purchaseProducts/add-to-cart`,
      data
    );
    const result = response?.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const fetchReplaceCartProductData = async (data: any) => {
  try {
    const response = await axios.post(
      `https://level-2-24-assignment-9-server.vercel.app/api/purchaseProducts/replace-cart`,
      data
    );
    const result = response?.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const fetchGetAddToCartProductData = async (id: any) => {
  try {
    const response = await axios.get(
      `https://level-2-24-assignment-9-server.vercel.app/api/purchaseProducts/get-cart-by-id/${id}`
    );
    const result = response?.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const fetchDeleteAddToCartProductData = async (id: any) => {
  try {
    const response = await axios.delete(
      `https://level-2-24-assignment-9-server.vercel.app/api/purchaseProducts/delete-cart-by-id/${id}`
    );
    const result = response?.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};
