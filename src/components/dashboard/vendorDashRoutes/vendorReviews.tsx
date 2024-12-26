/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import useGetProductData from "../../../data-middleware/useProductData";
import useUserFromToken from "../../../data-middleware/useUserFromToken";
import { useGetVendorDataWithUserId } from "../../../data-middleware/useVendorData";
import useReplayData from "../../../data-middleware/useReplayData";
import { toast } from "react-toastify";

const VendorReviews = () => {

    const [replys, setReplys] = useState('')

    const {decoded, userType} = useUserFromToken()
    
    const [mainData, setMainData] = useState([]);

    const {vendorData} = useGetVendorDataWithUserId(decoded as string);
    const getVendorId = vendorData?.data?.vendorId;

    console.log(getVendorId);

    const {allProductData, refetch} = useGetProductData('', '', '')
    
    const vendorWithVendorId = allProductData?.data?.filter((f:any) => f?.vendorId === getVendorId)
    
    console.log('vendor-products', vendorWithVendorId);

    const vendorsProductData = vendorWithVendorId;
    console.log(vendorsProductData);

    const {postReplayData} = useReplayData(refetch)

    const handleReply = (e:any, reviewId:string) => {
        e.preventDefault();

        if(replys === ''){
            toast.error('Please Enter Reply')
            return
        }

        const newReplays = `@Seller: ${replys}`

        const newData = {
            replay: newReplays,
            userId: decoded,
            reviewId
        }

        postReplayData(newData)

    }

    useEffect(() => {
        if (userType === "ADMIN") {
          setMainData(allProductData?.data || []);
        } else if (userType === "VENDOR" && getVendorId) {
          const vendorProducts = allProductData?.data?.filter(
            (f: any) => f?.vendorId === getVendorId
          );
          setMainData(vendorProducts || []);
        }
      }, [userType, allProductData, getVendorId]);


    return (
        <div className="w-full min-h-20 bg-gray-200 mt-1">
            {
                mainData?.map((product:any) => (
                    <div className="w-full h-auto bg-gray-100 p-2 mb-2">
                        <div className="w-full h-auto flex">
                            <div className="w-[200px] h-[200px] bg-gray-200">
                                <img className="w-full h-full" src={product?.images[0]} alt="" />
                            </div>
                            <div className="w-full h-auto px-2">
                                <p className="font-bold">{product?.productName}</p>
                                <hr />
                                <br />
                                {
                                    product?.Review?.map((review:any) => {
                                        return (
                                            <div className="w-full h-auto bg-gray-100 px-2 mb-2 text-sm pb-2">
                                                
                                                <div className="flex items-center justify-between">
                                                    
                                                    <p className="text-sm">{review?.review}</p>
                                                    <br />
                                                    <br />  
                                                    <div>
                                                        <input className="px-2" placeholder="give reply here..." type="text" onChange={(e) => setReplys(e.target.value)}/>
                                                        <button onClick={(e:any) => handleReply(e,review?.reviewId)} className="bg-blue-500 text-white p-1 cursor-pointer ml-2 font-bold">Reply</button>
                                                    </div>
                                                </div>
                                                <p>Replies:</p>
                                                <br />
                                                {  
                                                    review?.Replay?.map((reply:any) => {
                                                        return (
                                                            <div style={{borderLeft: '2px solid gray' }} className="w-full min-h-[50px]  px-2 text-sm relative">
                                                                <p className="text-sm absolute bottom-0">{reply?.replay}</p>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        )
                                    })
                    }  
                            </div>
                        </div>
                    </div>
                ))
            }            
        </div>
    );
};

export default VendorReviews;