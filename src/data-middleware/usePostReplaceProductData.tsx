/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { fetchReplaceCartProductData } from "../data/fetchProductData";
import { toast } from "react-toastify";


const usePostReplaceProductData = () => {
    const navigate = useNavigate();
    const {mutate: replaceToCartData, isPending, isError, isSuccess, error} = useMutation({
        mutationKey: ['fetchPostreplaceToCartData'],
        mutationFn: (data:any) => fetchReplaceCartProductData(data),
        onSuccess: (data) => {
           
           if(data?.success){
            console.log(data);
            toast.success("Product replaced to Cart Successfully")
            navigate('/cart')
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

    return {replaceToCartData, isPending, isError, isSuccess, error}
};


export default usePostReplaceProductData;