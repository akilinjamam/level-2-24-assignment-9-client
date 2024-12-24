/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchPostReplyData } from '../data/fetchReplyData';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const useReplayData = (refetch:any) => {
    const {mutate: postReplayData, isPending, isError, isSuccess, error} = useMutation({
        mutationKey: ['fetchPostReplayData'],
        mutationFn: (data:any) => fetchPostReplyData(data),
        onSuccess: (data) => {
            console.log(data)
            refetch()
            toast.success("Replay Created Successfully")
           
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        }
    })


    return {postReplayData, isPending, isError, isSuccess, error}
};

export default useReplayData;