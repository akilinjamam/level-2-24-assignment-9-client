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
    console.log(error);
    return error?.response?.data?.message;
  }
};

export const fetchChangePasswordData = async (data: any) => {
  try {
    const token = localStorage.getItem("userToken");
    const response = await axios.post(
      `https://level-2-24-assignment-9-server.vercel.app/api/users/change-password`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const result = response?.data;
    console.log(response?.data);
    return result;
  } catch (error: any) {
    console.log(error?.response?.data?.message);
    return error?.response?.data?.message;
  }
};

export const fetchResetPasswordData = async (data: any) => {
  try {
    const token = localStorage.getItem("userToken");
    const response = await axios.post(
      `https://level-2-24-assignment-9-server.vercel.app/api/users/sent-email`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const result = response?.data;
    console.log(response?.data);
    return result;
  } catch (error: any) {
    console.log(error?.response?.data?.message);
    return error?.response?.data?.message;
  }
};
export const fetchRecoveryPasswordData = async (data: any, token: any) => {
  try {
    const response = await axios.post(
      `https://level-2-24-assignment-9-server.vercel.app/api/users/reset-password`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const result = response?.data;
    console.log(response?.data);
    return result;
  } catch (error: any) {
    console.log(error?.response?.data?.message);
    return error?.response?.data?.message;
  }
};

export const fetchGetUserData = async () => {
  try {
    const response = await axios.get(
      `https://level-2-24-assignment-9-server.vercel.app/api/users`
    );
    const result = response?.data;
    console.log(response?.data);
    return result;
  } catch (error: any) {
    console.log(error?.response?.data?.message);
    return error?.response?.data?.message;
  }
};

export const fetchUpdateUserData = async (id: string) => {
  try {
    const response = await axios.patch(
      `https://level-2-24-assignment-9-server.vercel.app/api/users/update-user/${id}`
    );
    const result = response?.data;
    console.log(response?.data);
    return result;
  } catch (error: any) {
    console.log(error?.response?.data?.message);
    return error?.response?.data?.message;
  }
};
export const fetchDeleteUserData = async (id: string) => {
  try {
    const response = await axios.delete(
      `https://level-2-24-assignment-9-server.vercel.app/api/users/delete-user/${id}`
    );
    const result = response?.data;
    console.log(response?.data);
    return result;
  } catch (error: any) {
    console.log(error?.response?.data?.message);
    return error?.response?.data?.message;
  }
};
