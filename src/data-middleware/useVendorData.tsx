/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchGetVendorDataWithId, fetchGetVendorDataWithUserId, fetchPostVendorData, fetchUpdateVendorDat, fetchUpdateVendorImgData } from "../data/fetchVendorData";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";


 export const useGetVendorDataWithId = (id:string) => {
    const {
      data: vendorData,
      isError,
      isLoading,
      error,
      refetch
    } = useQuery({
      queryKey: ["fetchGetVendorDataWithIds"],
      queryFn: async () => await fetchGetVendorDataWithId(id)
    });
  
    return { vendorData, isError, isLoading, error, refetch };
  };
 export const useGetVendorDataWithUserId = (id:string) => {
    const {
      data: vendorData,
      isError,
      isLoading,
      error,
      refetch
    } = useQuery({
      queryKey: ["fetchGetVendorDataWithUserId"],
      queryFn: () => fetchGetVendorDataWithUserId(id)
    });
  
    return { vendorData, isError, isLoading, error, refetch };
  };


  export const usePostVendorData = ()  => {

    const navigate = useNavigate();

    const {mutate: postVendorData, isPending, isError, isSuccess, error} = useMutation({
        mutationKey: ['fetchPostVendorData'],
        mutationFn: (data: FormData) => fetchPostVendorData(data),
        onSuccess: (data) => {
           
           if(data?.success){
            console.log(data);
            toast.success("Vendor Created Successfully")
            navigate('/vendorDashboard/vendorProfile')
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
  export const useUpdateVendorData = (refetch:any)  => {

    const {mutate: updateVendorData, isPending, isError, isSuccess, error} = useMutation({
        mutationKey: ['fetchUpdateVendorData'],
        mutationFn: (data:any) => fetchUpdateVendorDat(data.id, data.data),
        onSuccess: (data) => {
           
           if(data?.success){
            console.log(data);
            refetch()
            toast.success("Vendor update Successfully")
           
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


    return {updateVendorData, isPending, isError, isSuccess, error}
    
};
  export const useUpdateVendorImgData = (refetch:any)  => {

    const {mutate: updateVendorImgData, isPending, isError, isSuccess, error} = useMutation({
        mutationKey: ['fetchUpdateVendorImgData'],
        mutationFn: (data:any) => fetchUpdateVendorImgData(data.id, data.data),
        onSuccess: (data) => {
           
           if(data?.success){
            console.log(data);
            refetch()
            toast.success("Vendor image update Successfully")
           
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


    return {updateVendorImgData, isPending, isError, isSuccess, error}
    
};

