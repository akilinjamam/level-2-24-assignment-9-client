/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchResetPasswordData } from "../data/fetchUserData";
import { useNavigate } from "react-router";

const useResetPassword = () => {
    const navigate = useNavigate()
    const {mutate: resetPassword, isPending, isError, isSuccess, error} = useMutation({
        mutationKey: ['fetchresetPassword'],
        mutationFn: (data: any) => fetchResetPasswordData(data),
        onSuccess: (data) => {
           
           if(data?.success){
            console.log(data);
            toast.success("An Email has been sent. please check and verify")
            navigate('/login')
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

    return {resetPassword, isPending, isError, isSuccess, error}

};

export default useResetPassword;