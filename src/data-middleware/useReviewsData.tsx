/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { fetchPostReviewData } from "../data/fetchReviews";
import { toast } from "react-toastify";


const useReviewsData = (refetch:any) => {
    const {mutate: postReviewData, isPending, isError, isSuccess, error} = useMutation({
        mutationKey: ['fetchPostReviewData'],
        mutationFn: (data:any) => fetchPostReviewData(data),
        onSuccess: (data) => {
            console.log(data)
            toast.success("Review Created Successfully")
            refetch()
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        }
    })


    return {postReviewData, isPending, isError, isSuccess, error}
};

export default useReviewsData;