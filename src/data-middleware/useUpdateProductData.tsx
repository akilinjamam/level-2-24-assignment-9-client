import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchUpdateProductDataWithId } from "../data/fetchProductData";
/* eslint-disable @typescript-eslint/no-explicit-any */
export const useUpdateProductData = (refetch:any)  => {

  

    const {mutate: updateProductData, isPending, isError, isSuccess, error} = useMutation({
        mutationKey: ['fetchUpdateProductData'],
        mutationFn: (data: any) => fetchUpdateProductDataWithId(data?.id, data?.data),
        onSuccess: (data) => {
           if(data?.success){
            console.log(data);
            refetch()
            toast.success("Product updated Successfully")
           
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


    return {updateProductData, isPending, isError, isSuccess, error}
    
};

export const useUpdateRecentProductData = (refetch:any)  => {

  

    const {mutate: updateProductData, isPending, isError, isSuccess, error} = useMutation({
        mutationKey: ['fetchUpdateProductData'],
        mutationFn: (data: any) => fetchUpdateProductDataWithId(data?.id, data?.data),
        onSuccess: (data) => {
           if(data?.success){
            console.log(data);
            refetch()
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


    return {updateProductData, isPending, isError, isSuccess, error}
    
};