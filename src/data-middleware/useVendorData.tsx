/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchGetVendorDataWithId, fetchPostVendorData } from "../data/fetchVendorData";
import { toast } from "react-toastify";


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


  export const usePostVendorData = ()  => {

    const {mutate: postVendorData, isPending, isError, isSuccess, error} = useMutation({
        mutationKey: ['fetchPostVendorData'],
        mutationFn: (data: FormData) => fetchPostVendorData(data),
        onSuccess: (data) => {
           
           if(data?.success){
            console.log(data);
            toast.success("Vendor Created Successfully")
           }
           if(!data?.success){
            toast.error(data)
        }
        },
        onError: (error:any) => {
            console.log(error)
            toast.error(error.message)
        }
    })


    return {postVendorData, isPending, isError, isSuccess, error}
    
};

