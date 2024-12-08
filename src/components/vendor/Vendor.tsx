/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router";
import { products } from "../../functionalComponents/flashSale/flashSaleItems";

const Vendor = () => {
    return (
        <div className="w-[100%] text-sm">
            <div className="w-[1000px] bg-gray-100 mx-auto p-2 flex">
                <div className="w-[400px] h-[150px] bg-gray-200 flex">
                    <div className="w-[150px] h-full bg-gray-300">

                    </div>
                    <div className="w-[250px] h-full p-2 flex items-baseline justify-between">
                        <div>
                            <p>Shop Name</p>
                            <p>Following: 12</p>
                        </div>
                        <button className="bg-blue-500 text-white p-1">+Follow</button>
                    </div>
                </div>
                <div className="w-[600px] h-[150px] px-2">
                    <p className="font-semibold">Detail :</p>
                    <hr />
                    <p>details will be added here</p>
                </div>
            </div>
            <div className="w-[1000px] mx-auto bg-gray-100 m-6 p-2">
                <div className="w-full h-auto">
                    <p className="font-bold">All Products:</p>
                    <div className="flex flex-wrap">
                        {
                            products?.map(_item => {
                                return (
                                    <Link to='/cart'>
                                        <div className="w-[150px] h-[150px] bg-green-100 m-1 cursor-pointer">
                                        
                                        </div>
                                    </Link>
                                )
                            } )
                        }
                    </div>
                </div>
               
            </div>
        </div>
    );
};

export default Vendor;