/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const fetchPostReviewData = async (data: any) => {
  try {
    const response = await axios.post(
      `https://level-2-24-assignment-9-server.vercel.app/api/reviews/create-review`,
      data
    );
    const result = response?.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};
