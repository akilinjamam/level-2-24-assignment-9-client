/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { fetchAddToCartProductData } from "../data/fetchProductData";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const usePostPurchaseProductData = () => {
    const navigate = useNavigate();
    const {mutate: addToCartData, isPending, isError, isSuccess, error} = useMutation({
        mutationKey: ['fetchPostAddToCartData'],
        mutationFn: (data:any) => fetchAddToCartProductData(data),
        onSuccess: (data) => {
           
           if(data?.success){
            console.log(data);
            toast.success("Product Added to Cart Successfully")
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

    return {addToCartData, isPending, isError, isSuccess, error}
};

export default usePostPurchaseProductData;