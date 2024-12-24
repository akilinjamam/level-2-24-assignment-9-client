/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
export const fetchCreatePayment = async (data: any) => {
  try {
    const response = await axios.post(
      `https://level-2-24-assignment-9-server.vercel.app/api/purchaseProducts/create-payment`,
      data
    );
    const result = response?.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};
