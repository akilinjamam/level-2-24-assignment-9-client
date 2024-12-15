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
