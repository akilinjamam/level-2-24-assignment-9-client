/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router";
import useGetProductDataWithFlashSale from "../../data-middleware/useGetProductDataWithFlashSale";
import { useContext } from "react";
import { MyContext } from "../../context/MyContext";

const AllFlashSale = () => {
    const navigate = useNavigate();

    const {allProductDataWithFlashSale} = useGetProductDataWithFlashSale()

    const {darkMode} = useContext(MyContext)

    return (
        <div className={`${darkMode ? 'bg-gray-600': 'bg-white'} w-full h-[100vh]`}>
            <div className="lg:w-[1000px] md:w-[70%] sm:w-full xsm:w-full mx-auto my-6 bg-white px-2">
            <p className="text-2xl">All Flash Sale</p>
            <div className="flex flex-wrap">
                {
                   allProductDataWithFlashSale?.data?.map((product:any) => 
                   <div onClick={() => navigate(`/products/${product?.productId}`)}  className="w-[150px] h-[150px] bg-green-100  m-1 flex items-center justify-center cursor-pointer relative">
                    {/* <p>{product.price}</p> */}
                    <img className="absolute top-0 w-full h-full" src={product?.images[0]} alt="" />
                    <p className="z-10 text-yellow-300 font-bold bg-gray-700 bg-opacity-50 w-full text-center">{product?.price}</p>
                    
                   </div> ) 
                }
            </div>
        </div>
        </div>
    );
};

export default AllFlashSale;