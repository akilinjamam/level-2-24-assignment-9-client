/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { fetchPostLoginData } from "../data/fetchUserData";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";

export type TTokenDecode = {
    userName: string;
    email: string;
    address: string;
    UserType: string;
    phoneNumber: string
}

const useUserPostLoginData = () => {

    const navigate = useNavigate();
    
    const {mutate: loginUserData, isPending, isError, isSuccess, error} = useMutation({
        mutationKey: ['fetchPostLoginData'],
        mutationFn: (data) => fetchPostLoginData(data),
        onSuccess: (data) => {
            const token = data?.data?.accesstoken
            console.log(data?.success)
            if(data?.success){
                toast.success("User logged in Successfully")
            }
            if(!data?.success){
                console.log(data);
                toast.error(data)
            }
            if(token){
                localStorage.setItem("userToken", token)
            }
            let decoded
            if(token){
                decoded = jwtDecode<TTokenDecode>(token);
            }
            if((decoded?.UserType === 'VENDOR') || (decoded?.UserType === 'ADMIN') ){
                navigate('/vendorDashboard/vendorProfile')
            }
            if(decoded?.UserType === 'USER' ){
                navigate('/')
            }

        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        }
    })


    return {loginUserData, isPending, isError, isSuccess, error}
    
};

export default useUserPostLoginData;