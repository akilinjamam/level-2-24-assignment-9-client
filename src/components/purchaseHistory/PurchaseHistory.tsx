/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import useOrderHistoryData from "../../data-middleware/useOrderHistoryData";
import useUserFromToken from "../../data-middleware/useUserFromToken";
import useRatingData from "../../data-middleware/useRatingData";
import { toast } from "react-toastify";
import useReviewsData from "../../data-middleware/useReviewsData";
import useReplayData from "../../data-middleware/useReplayData";

const PurchaseHistory = () => {

    const {decoded} = useUserFromToken();
    const [rating, setRating] = useState('');
    const [reviews, setReviews] = useState('');
    const [replys, setReplys] = useState('');

    const {orderHistoryData, isLoading, refetch} = useOrderHistoryData();

    console.log(orderHistoryData?.data);
    console.log(decoded);

    const {postRating} = useRatingData();

    const handleRating = (pruchasedId:string, productId:string) => {

        if(!rating){
            toast.error('Please Select Rating');
            return
        }

        const newData = {
            productId: productId,
            userId: decoded,
            rating: Number(rating), 
            purchasedProductId:pruchasedId
        }

        console.log(newData);
        postRating(newData)

    }

    const {postReviewData, isPending:isPendingReview} = useReviewsData(refetch)

    const handleReviews = (productId:string, purchasedProductId:string, e:any) => {
        
        e.preventDefault();
        const newData = {
            productId: productId,
            userId: decoded,
            review: reviews,
            purchasedProductId:purchasedProductId
        }

        console.log(newData);
        postReviewData(newData)
    }

    const {postReplayData} = useReplayData(refetch)

    const handleReply = (e:any, reviewId:string) => {
        e.preventDefault();

        const newReplay = `@customer: ${replys}`;

        const newData = {
            replay: newReplay,
            userId: decoded,
            reviewId
        }

        console.log(newData);
        postReplayData(newData)
    }


    return (
        <div className="w-[1000px] mx-auto bg-gray-100 px-2 py-2 ">
            <p className="font-bold" >Order History :</p>
            <hr />
            <br />
            {
                !isLoading 
                ?
                (   orderHistoryData?.data?.length > 0
                    ?
                    orderHistoryData?.data?.map((item:any) => {
                        return (
                            <div className="w-full h-auto bg-gray-200 px-2 mb-5">
                                <p className="font-bold">Product: {item?.productName}</p>
                                <br />
                                <div className="flex items-center justify-between">
                                    <p className="text-sm">Price:</p>
                                    <p className="text-sm">{item?.price}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm">Quantity:</p>
                                    <p className="text-sm">{item?.quantity}</p>
                                </div>
                                <div style={{borderBottom: '1px solid lightgray '}}></div>
                                <br />
                                <div className="flex items-center justify-between">
                                    <p className="text-sm">Sub-Total:</p>
                                    <p className="text-sm">{item?.totalPrice + item?.discount}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm">(-) Discount:</p>
                                    <p className="text-sm">{item?.discount}</p>
                                </div>
                                <div style={{borderBottom: '1px solid lightgray '}}></div>
                                <br />
                                <div className="flex items-center justify-between font-bold">
                                    <p className="text-sm">Total:</p>
                                    <p className="text-sm">{item?.totalPrice}</p>
                                </div>
                                <br />
                                <div style={{borderBottom: '1px solid lightgray '}}></div>
                                <br />
                               <div className="w-full h-auto text-sm flex item-center justify-between ">
                                    <div>
                                        <form action="" onSubmit={(e) =>handleReviews(item?.productId, item?.purchasedProductId, e)}>
                                            <label className="mr-2" htmlFor="">Give Review: </label>
                                            <input className="w-[300px] px-2" type="text" placeholder="Write Review" onChange={(e) => setReviews(e.target.value) }/>
                                            <input className="bg-blue-500 text-white p-1 cursor-pointer ml-2 font-bold" type="submit" value={isPendingReview ? 'Reviewing...': 'Submit Review'}/>
                                        </form>
                                    </div>
                                    <div>
                                        
                                        <select name="" id="" onChange={ (e) => setRating(e.target.value)} >
                                            <option value="1">Select Rating </option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                        <button onClick={() => handleRating(item?.purchasedProductId, item?.productId)} className="bg-blue-500 text-white p-1 cursor-pointer ml-2 font-bold">Submit Rating</button>
                                    </div>
                               </div>
                               <br />
                               <div style={{borderBottom: '1px solid lightgray '}}></div>
                               <br />
                               <div>
                                   <p className="font-bold">Review:</p>
                                 {
                                    item?.Review?.map((review:any) => {
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
                               <br />
                            </div>
                        )
                    })
                    :
                    <p>
                        No Order History    
                    </p>
                )
                :
                <p>
                    Loading...
                </p>
            }
            
        </div>
    );
};

export default PurchaseHistory;