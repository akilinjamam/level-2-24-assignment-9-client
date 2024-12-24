import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { fetchPostProductData } from "../data/fetchProductData";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const usePostProductData = ()  => {

    const navigate = useNavigate();

    const {mutate: postProductData, isPending, isError, isSuccess, error} = useMutation({
        mutationKey: ['fetchPostProductData'],
        mutationFn: (data: FormData) => fetchPostProductData(data),
        onSuccess: (data) => {
           
           if(data?.success){
            console.log(data);
            toast.success("Product Created Successfully")
            navigate('/vendorDashboard')
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


    return {postProductData, isPending, isError, isSuccess, error}
    
};