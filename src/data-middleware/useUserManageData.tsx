/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "@tanstack/react-query";

import { fetchDeleteUserData, fetchGetUserData, fetchUpdateUserData } from "../data/fetchUserData";
import { toast } from "react-toastify";

export const useGetallUserData = () => {
    const {
        data: getAllUserData,
        isError,
        isLoading,
        error,
        refetch
      } = useQuery({
        queryKey: ["fetchGetAllUserData"],
        queryFn: () => fetchGetUserData()
      });
    
      return { getAllUserData, isError, isLoading, error, refetch };
};

export const useUpdateUserData = (refetch:any) => {
   
    const {mutate: updateUserData, isPending, isError, isSuccess, error} = useMutation({
        mutationKey: ['fetchUpdateUserData'],
        mutationFn: (id:string) => fetchUpdateUserData(id),
        onSuccess: (data) => {
           
           if(data?.success){
            console.log(data);
            toast.success("user updated Successfully")
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

    return {updateUserData, isPending, isError, isSuccess, error}
    
}
export const useDeleteUserData = (refetch:any) => {
   
    const {mutate: deleteUserData, isPending, isError, isSuccess, error} = useMutation({
        mutationKey: ['fetchDeleteUserData'],
        mutationFn: (id:string) => fetchDeleteUserData(id),
        onSuccess: (data) => {
           
           if(data?.success){
            console.log(data);
            toast.success("user deleted Successfully")
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


    return {deleteUserData, isPending, isError, isSuccess, error}
    
}

