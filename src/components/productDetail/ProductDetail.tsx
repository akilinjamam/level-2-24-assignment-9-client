/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useParams } from "react-router";
import { products } from "../../functionalComponents/flashSale/flashSaleItems";
import calculateRating from "../../calculateRating/calculateRating";
import getLastDatesForYear from "../../calculateRating/getLastDate";
import useGetProductDataWithFlashId from "../../data-middleware/useGetProductDataWithId";
import { calculateTotalPrice } from "../../functionalComponents/calculateTotal/calculateTotal";
import { useState } from "react";
import useGetProductData from "../../data-middleware/useProductData";

const ProductDetail = () => {

    const {allProductData} = useGetProductData('', '', '');

    const [selectImg, setSelectImg] = useState(0);
    const {productId} = useParams()
    const date = new Date();
    const getMonth = date.getMonth();

    const getLastDate = getLastDatesForYear(2024)



    console.log(getLastDate[getMonth]);
    console.log(productId);
    console.log(allProductData?.data)


    const {allProductDataWithId} = useGetProductDataWithFlashId(productId as string);

    
    
    
    const item = allProductDataWithId?.data;
    
    const findProductData = allProductData?.data?.filter((f:any) => f?.category  === item?.category);

    const findRelatedProductData = findProductData?.filter((f:any) => f?.productId !== productId)

    console.log(findRelatedProductData)

    const getAllRatings = item?.Rating?.map((rate:any) => rate?.rating);

   const averageRating = Math.ceil(calculateTotalPrice(getAllRatings)/item?.Rating?.length);
    
    
    return (
        <div className="w-full bg-white">
            <div className="w-[1000px] mx-auto bg-gray-100 m-6">
                <div className="w-full h-[400px] flex">
                    <div className="w-[35%] h-full bg-gray-200 p-2">
                        <div className="w-[full] h-[300px] bg-gray-100">
                            <img className="w-full h-full" src={item?.images[selectImg]} alt="" />
                        </div>
                        <div className="flex my-1.5">
                            {
                                
                                item?.images?.slice(0,2).map((item:any, index: number) => 
                                <div style={{border: `${selectImg === index ? '2px solid blue' : ''}`}} className="w-[100px] h-[80px] bg-red-100 mx-1">
                                        <img onClick={() => setSelectImg(index)} className="w-full h-full cursor-pointer" src={item} alt="" />
                                </div>  
                                )
                            }
                        </div>
                    </div>
                    <div className="w-[65%] h-full p-2 text-sm leading-6 ">
                    <div>
                                    <p className="text-3xl font-semibold">{item?.productName}</p>
                                    <br />
                                    <p>Category: {item?.category}</p>
                                    <p>{calculateRating(averageRating)?.map(_rating => <i className="uil uil-star text-yellow-400"></i>)}</p>
                                    <br />
                                    <hr />
                                    <p className="text-green-600 text-2xl">${item?.price}</p>
                                    <hr />
                                    <br />
                                    <Link to={`/vendors/${item?.vendor?.vendorId}`}>
                                        <p className="inline-block p-1 text-white font-semibold cursor-pointer bg-blue-400" title="Shop Name"><i className="uil uil-store"></i>  {item?.vendor?.vendorName}</p>
                                    </Link>
                                </div>
                    </div>
                </div>
            </div>
            <div className="w-[1000px] mx-auto bg-gray-100 m-6 p-2">
                <div className="w-full h-auto">
                    <p className="font-bold">Product Details:</p>
                    <p>{item?.details}</p>
                </div>
                <br />
                <hr />
                <br />
                <p>Customer Review :</p>
                {
                    item?.Review?.map( (item:any) => {
                        return (
                            <div>
                                {item?.review}
                            </div>
                        )
                    })
                }
                <div>

                </div>
            </div>
            <div className="w-[1000px] mx-auto bg-gray-100 m-6 p-2">
                <div className="w-full h-auto">
                    <p className="font-bold">Related Products:</p>
                    <div className="flex flex-wrap">
                        {
                            findRelatedProductData?.map((item:any) => {
                                return (
                                    <div className="relative w-[150px] h-[150px] bg-green-100 m-1 flex items-center justify-center">
                                        <p className="font-bold bg-opacity-50 bg-gray-200 w-full text-center">{item?.productName}</p>
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