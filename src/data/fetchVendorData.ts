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
