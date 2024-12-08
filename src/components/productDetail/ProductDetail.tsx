/* eslint-disable @typescript-eslint/no-unused-vars */
import { useParams } from "react-router";
import { products } from "../../functionalComponents/flashSale/flashSaleItems";
import calculateRating from "../../calculateRating/calculateRating";
import getLastDatesForYear from "../../calculateRating/getLastDate";

const ProductDetail = () => {
    const {productId} = useParams()
    const date = new Date();
    const getMonth = date.getMonth();

    const getLastDate = getLastDatesForYear(2024)



    console.log(getLastDate[getMonth]);
    console.log(productId);
    
    return (
        <div className="w-full bg-white">
            <div className="w-[1000px] mx-auto bg-gray-100 m-6">
                <div className="w-full h-[400px] flex">
                    <div className="w-[35%] h-full bg-gray-200 p-2">
                        <div className="w-[full] h-[300px] bg-gray-100">
                            
                        </div>
                        <div className="flex my-1.5">
                            {
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                products?.slice(0,1).map(item => item?.images?.map(_img => <div className="w-[100px] h-[80px] bg-red-100 mx-1"></div> ))
                            }
                        </div>
                    </div>
                    <div className="w-[65%] h-full p-2 text-sm leading-6 ">
                        {
                            products?.slice(0,1)?.map(item => (
                                <div>
                                    <p className="text-3xl font-semibold">{item?.productName}</p>
                                    <br />
                                    <p>Category: {item?.category}</p>
                                    <p>{calculateRating(item?.ratings)?.map(_rating => <i className="uil uil-star text-yellow-400"></i>)}</p>
                                    <br />
                                    <hr />
                                    <p className="text-green-600 text-2xl">${item?.price}</p>
                                    <hr />
                                    <br />
                                    <p className="cursor-pointer" title="Shop Name"><i className="uil uil-store"></i>  {item?.vendorName}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="w-[1000px] mx-auto bg-gray-100 m-6 p-2">
                <div className="w-full h-auto">
                    <p className="font-bold">Product Details:</p>
                    {
                        products?.slice(0,1)?.map(item => <p>{item?.details}</p> )
                    }
                </div>
                <br />
                <hr />
                <br />
                <p>Customer Review :</p>
                <div>

                </div>
            </div>
            <div className="w-[1000px] mx-auto bg-gray-100 m-6 p-2">
                <div className="w-full h-auto">
                    <p className="font-bold">Related Products:</p>
                    <div className="flex flex-wrap">
                        {
                            products?.map(_item => {
                                return (
                                    <div className="w-[150px] h-[150px] bg-green-100 m-1">
                                        
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