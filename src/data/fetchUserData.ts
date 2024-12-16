/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const fetchPostUserData = async (data: any) => {
  try {
    const response = await axios.post(
      `https://level-2-24-assignment-9-server.vercel.app/api/users/create-user`,
      data
    );
    const result = response?.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const fetchPostLoginData = async (data: any) => {
  try {
    const response = await axios.post(
      `https://level-2-24-assignment-9-server.vercel.app/api/users/create-user-login`,
      data
    );
    const result = response?.data;
    console.log(response?.data);
    return result;
  } catch (error: any) {
    console.log(error?.response?.data?.message);
    return error?.response?.data?.message;
  }
};
