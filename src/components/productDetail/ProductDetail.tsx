/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useNavigate, useParams } from "react-router";
import calculateRating from "../../calculateRating/calculateRating";
import getLastDatesForYear from "../../calculateRating/getLastDate";
import useGetProductDataWithFlashId from "../../data-middleware/useGetProductDataWithId";
import { calculateTotalPrice } from "../../functionalComponents/calculateTotal/calculateTotal";
import { useContext, useEffect, useState } from "react";
import useGetProductData from "../../data-middleware/useProductData";
import useReplayData from "../../data-middleware/useReplayData";
import { MyContext } from "../../context/MyContext";


const ProductDetail = () => {

    const [replys, setReplys] = useState('');

    const navigate = useNavigate();

    const {allProductData} = useGetProductData('', '', '');

    const [selectImg, setSelectImg] = useState(0);
    const {productId} = useParams()
    const date = new Date();
    const getMonth = date.getMonth();

    const getLastDate = getLastDatesForYear(2024)


    console.log(getLastDate[getMonth]);
    console.log(productId);
    console.log(allProductData?.data)


    const {allProductDataWithId, refetch} = useGetProductDataWithFlashId(productId as string);
    console.log(allProductDataWithId)
    
    useEffect(() => {
        refetch()
    },[productId, refetch])
    
    const item = allProductDataWithId?.data;
    
    const findProductData = allProductData?.data?.filter((f:any) => f?.category  === item?.category);

    const findRelatedProductData = findProductData?.filter((f:any) => f?.productId !== productId)

    
    const getAllRatings = item?.Rating?.map((rate:any) => rate?.rating);
    console.log(getAllRatings?.length);

   const averageRating = Math.ceil(calculateTotalPrice(getAllRatings)/item?.Rating?.length);

   const {postReplayData} = useReplayData(refetch)

   const handleReply = (e:any, reviewId:string) => {
       e.preventDefault();

    
    const newReplay = `@customer:${replys}`

        const newData =  {
            reviewId,
            replay: newReplay
        }
        
         console.log(reviewId);
         postReplayData(newData)
   }
    
   const {darkMode} = useContext(MyContext)
    
    return (
        <div className={`${darkMode ? 'bg-gray-700' : 'bg-white'} h-[100vh]`}>
            <div className={`lg:w-[1000px] md:w-[70%] sm:w-full xsm:w-full mx-auto  m-6  ${darkMode ? 'bg-gray-300' : 'bg-gray-100'}`}>
                <div className="w-full lg:h-[400px] md:h-[400px] sm:h-auto xsm:h-auto flex flex-wrap">
                    <div className="lg:w-[35%] md:w-[35%] sm:w-full xsm:w-full h-full bg-gray-200 p-2">
                        <div className="w-[full] h-[300px] bg-gray-100">
                            <img className="w-full h-full" src={item?.images[selectImg]} alt="" />
                        </div>
                        <div className="flex my-1.5">
                            {
                                
                                item?.images?.slice(0,3).map((item:any, index: number) => 
                                <div style={{border: `${selectImg === index ? '2px solid blue' : ''}`}} className="w-[100px] h-[80px] bg-red-100 mx-1">
                                        <img onClick={() => setSelectImg(index)} className="w-full h-full cursor-pointer" src={item} alt="" />
                                </div>  
                                )
                            }
                        </div>
                    </div>
                    <div className="lg:w-[65%] md:w-[65%] sm:w-full xsm:w-full h-full p-2 text-sm leading-6 ">
                    <div>
                                    <p className="text-3xl font-semibold">{item?.productName}</p>
                                    <br />
                                    <p>Category: {item?.category}</p>
                                    <p>Quantity: {item?.quantity}</p>
                                    <p>{calculateRating(averageRating)?.map(_rating => <i className="uil uil-star text-yellow-400"></i>)}</p>
                                    <br />
                                    <hr />
                                    <p className="text-green-600 text-2xl">${item?.price}</p>
                                    <hr />
                                    <br />
                                    <Link to={`/vendors/${item?.vendor?.vendorId}/${item?.productId}`}>
                                        <p className="inline-block p-1 text-white font-semibold cursor-pointer bg-blue-400" title="Shop Name"><i className="uil uil-store"></i>  {item?.vendor?.vendorName}</p>
                                    </Link>
                                </div>
                    </div>
                </div>
            </div>
            <div className={`lg:w-[1000px] md:w-[70%] sm:w-full xsm:w-full mx-auto bg-gray-100 m-6 p-2 ${darkMode ? 'bg-gray-300' : 'bg-gray-100'}`}>
                <div className="w-full h-auto">
                    <p className="font-bold">Product Details:</p>
                    <p>{item?.details}</p>
                </div>
                <br />
                <div className="w-full h-auto">
                    <p className="font-bold">Average Ratings:</p>
                    <p>{getAllRatings?.length > 0 ? calculateRating(averageRating)?.map(_rating => <i className="uil uil-star text-yellow-400"></i>) : <span className="text-red-500 text-sm">Customers not given any average ratings yet...</span> }</p>
                </div>
                <br />
                <hr />
                <br />
                <div>
                    <p className="font-bold">Reviews:</p>
                    { item?.Review?.length > 0
                        ?
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
                        :
                        <p className="text-red-500 text-sm">No review Added...</p>
                    }                
                                 
                </div>
                <div>

                </div>
            </div>
            <div className={`lg:w-[1000px] md:w-[70%] sm:w-full xsm:w-full mx-auto bg-gray-100 m-6 p-2 ${darkMode ? 'bg-gray-300' : 'bg-gray-100'}`}>
                <div className="w-full h-auto">
                    <p className="font-bold">Related Products:</p>
                    <div className="flex flex-wrap">
                        {
                            findRelatedProductData?.map((item:any) => {
                                return (
                                    <div className="relative w-[150px] h-[150px] bg-green-100 m-1 flex items-center justify-center">
                                        <img className="absolute w-full h-full" src={item?.images[0]} alt="" />
                                        <p onClick={() => navigate(`/products/${item?.productId}`)} className="font-bold bg-opacity-50 bg-gray-200 w-full text-center cursor-pointer z-10">{item?.productName}</p>
                                        <p className="absolute bottom-0 text-red-700 font-bold bg-opacity-50 bg-gray-200 w-full text-center">{item?.price}</p>
                                    </div>
                                )
                            } )
                        }
                    </div>
                </div>
               
            </div>
        </div>
    );
};

export default ProductDetail;