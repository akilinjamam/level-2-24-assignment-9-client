/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const fetchGetVendorDataWithId = async (id: string) => {
  try {
    const response = await axios.get(
      `https://level-2-24-assignment-9-server.vercel.app/api/vendors/get-with-id/${id}`
    );
    const result = response?.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const fetchGetVendorDataWithUserId = async (id: string) => {
  try {
    const response = await axios.get(
      `https://level-2-24-assignment-9-server.vercel.app/api/vendors/get-with-user-id/${id}`
    );
    const result = response?.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const fetchUpdateVendorDat = async (id: string, data: any) => {
  try {
    const response = await axios.patch(
      `https://level-2-24-assignment-9-server.vercel.app/api/vendors/update-vendor/${id}`,
      data
    );
    const result = response?.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const fetchUpdateVendorImgData = async (id: string, data: any) => {
  try {
    const token = localStorage.getItem("userToken");
    const response = await axios.patch(
      `https://level-2-24-assignment-9-server.vercel.app/api/vendors/update-vendor-img/${id}`,
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

export const fetchPostVendorData = async (data: FormData) => {
  try {
    console.log(data);
    const token = localStorage.getItem("userToken");
    console.log(token);
    const response = await axios.post(
      `https://level-2-24-assignment-9-server.vercel.app/api/vendors/create-vendor`,
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
  } catch (error: any) {
    console.log(error);
    return error?.response?.data?.message;
  }
};
