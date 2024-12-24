import axios from "axios";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const fetchPostFollowData = async (data: FormData) => {
  try {
    const response = await axios.post(
      `https://level-2-24-assignment-9-server.vercel.app/api/follows/create-follow`,
      data
    );
    const result = response?.data;
    return result;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data?.message;
  }
};

export const fetchGetFollowData = async () => {
  try {
    const response = await axios.get(
      `https://level-2-24-assignment-9-server.vercel.app/api/follows`
    );
    const result = response?.data;
    return result;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data?.message;
  }
};
