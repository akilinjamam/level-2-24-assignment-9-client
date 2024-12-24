/* eslint-disable @typescript-eslint/no-explicit-any */
import {  useMutation, useQuery } from "@tanstack/react-query";



import { fetchGetFollowData, fetchPostFollowData } from "../data/fetchFollowData";
import { toast } from "react-toastify";

export const useGetFollowData = () => {
   
    const {data: getFollowData, isPending, isError, isSuccess, error, refetch} = useQuery({
        queryKey: ['fetchGetFollowData'],
        queryFn: () => fetchGetFollowData(),

    })

    return {getFollowData, isPending, isError, isSuccess, error, refetch}
};


export const usePostFollowData = (refetch:any)  => {

    const {mutate: addFollows, isPending, isError, isSuccess, error} = useMutation({
        mutationKey: ['fetchPostFollowData'],
        mutationFn: (data: any) => fetchPostFollowData(data),
        onSuccess: (data) => {
           
           if(data?.success){
            console.log(data);
            refetch();
            // toast.success("Follows Created Successfully")
            
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


    return {addFollows, isPending, isError, isSuccess, error}
    
};
