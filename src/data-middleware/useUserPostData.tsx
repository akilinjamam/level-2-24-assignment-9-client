import { useMutation } from "@tanstack/react-query";
import { fetchPostUserData } from "../data/fetchUserData";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const useUserPostData = () => {

    const navigate = useNavigate();

    const {mutate: postUserData, isPending, isError, isSuccess, error} = useMutation({
        mutationKey: ['fetchPostUserData'],
        mutationFn: (data) => fetchPostUserData(data),
        onSuccess: (data) => {
            console.log(data)
            toast.success("User Created Successfully")
            navigate('/login')
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        }
    })


    return {postUserData, isPending, isError, isSuccess, error}
    
};

export default useUserPostData;