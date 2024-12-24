import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchUpdateProductImgWithId } from "../data/fetchProductData";


/* eslint-disable @typescript-eslint/no-explicit-any */
export const useUpdateProductImgData = (refetch:any, id:string)  => {


    const {mutate: updateProductImgData, isPending, isError, isSuccess, error} = useMutation({
        mutationKey: ['fetchupdateProductImgData'],
        mutationFn: (data:any) => fetchUpdateProductImgWithId(id, data),
        onSuccess: (data) => {
           
           if(data?.success){
            console.log(data);
            toast.success("Product img updated Successfully")
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


    return {updateProductImgData, isPending, isError, isSuccess, error}
    
};