/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchChangePasswordData } from "../data/fetchUserData";
import { useNavigate } from "react-router";

const useChangePassword = () => {
    const navigate = useNavigate()
    const {mutate: changlePassword, isPending, isError, isSuccess, error} = useMutation({
        mutationKey: ['fetchchanglePassword'],
        mutationFn: (data: any) => fetchChangePasswordData(data),
        onSuccess: (data) => {
           
           if(data?.success){
            console.log(data);
            toast.success("Password Changed Successfully")
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

    return {changlePassword, isPending, isError, isSuccess, error}

};

export default useChangePassword;