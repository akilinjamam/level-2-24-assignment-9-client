import { useQuery } from "@tanstack/react-query";
import { fetchGetVendorDataWithId } from "../data/fetchVendorData";


 export const useGetVendorDataWithId = (id:string) => {
    const {
      data: vendorData,
      isError,
      isLoading,
      error,
    } = useQuery({
      queryKey: ["fetchGetVendorDataWithId"],
      queryFn: () => fetchGetVendorDataWithId(id)
    });
  
    return { vendorData, isError, isLoading, error };
  };

