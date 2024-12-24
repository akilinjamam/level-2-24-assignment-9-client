import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { fetchDeleteProductDataWithId } from "../data/fetchProductData";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const useDeleteProductData = (refetch:any)  => {

    const {mutate: deleteProductData, isPending, isError, isSuccess, error} = useMutation({
        mutationKey: ['fetchDeleteProductData'],
        mutationFn: (id:string) => fetchDeleteProductDataWithId(id),
        onSuccess: (data) => {
           
           if(data?.success){
            console.log(data);
            toast.success("Product deleted Successfully")
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

    return {deleteProductData, isPending, isError, isSuccess, error}    
};