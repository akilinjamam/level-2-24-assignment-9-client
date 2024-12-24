/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation } from '@tanstack/react-query';
import { fetchDeleteAddToCartProductData } from '../data/fetchProductData';
import { toast } from 'react-toastify';

const useDeleteAddtoCartData = (refetch:any) => {
   

    const {mutate: deleteAddToCartData, isPending, isError, isSuccess, error} = useMutation({
        mutationKey: ['fetchDeleteUserData'],
        mutationFn: (id:string) => fetchDeleteAddToCartProductData(id),
        onSuccess: (data) => {
            console.log(data)
            toast.success("deleted from add to cart Successfully")
            refetch()
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        }
    })


    return {deleteAddToCartData, isPending, isError, isSuccess, error}
};

export default useDeleteAddtoCartData;