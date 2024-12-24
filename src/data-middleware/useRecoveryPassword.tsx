/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchRecoveryPasswordData,  } from "../data/fetchUserData";
import { useNavigate } from "react-router";

const useRecoveryPassword = () => {
    const navigate = useNavigate()
    const {mutate: resetPassword, isPending, isError, isSuccess, error} = useMutation({
        mutationKey: ['fetchRecoveryPassword'],
        mutationFn: (data: any) => fetchRecoveryPasswordData(data.data, data.token),
        onSuccess: (data) => {
           
           if(data?.success){
            console.log(data);
            toast.success("password successfully updated")
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

export default useRecoveryPassword;