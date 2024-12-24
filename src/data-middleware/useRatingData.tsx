/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { fetchPostRatingData } from "../data/fetchRaing";
import { toast } from "react-toastify";


const useRatingData = () => {
    const {mutate: postRating, isPending, isError, isSuccess, error} = useMutation({
        mutationKey: ['fetchpostRatingData'],
        mutationFn: (data:any) => fetchPostRatingData(data),
        onSuccess: (data) => {
           
           if(data?.success){
            console.log(data);
            toast.success("Rating given Successfully")
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


    return {postRating, isPending, isError, isSuccess, error}
};

export default useRatingData;