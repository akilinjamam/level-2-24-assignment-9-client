/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchCreatePayment } from "../data/fetchPayment";

export const useCreatePaymentData = () => {
   
    const {mutate: createPayment, isPending, isError, isSuccess, error} = useMutation({
        mutationKey: ['fetchPaymentData'],
        mutationFn: (data:any) => fetchCreatePayment(data),
        onSuccess: (data) => {
           
           if(data?.success){
            if(data?.data?.url){
                window.open(data?.data?.url, "_blank")
            }
           }
        },
        onError: (error:any) => {
            console.log(error)
            toast.error(error.message)
        }
    })

    return {createPayment, isPending, isError, isSuccess, error}
};
