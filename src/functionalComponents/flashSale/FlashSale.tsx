/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router";
import useGetProductDataWithFlashSale from "../../data-middleware/useGetProductDataWithFlashSale";
import { useContext } from "react";
import { MyContext } from "../../context/MyContext";
const FlashSale = () => {
    const navigate = useNavigate();
    const {darkMode} = useContext(MyContext)
    const {allProductDataWithFlashSale, isLoading} = useGetProductDataWithFlashSale()


    return (
        <div className={`lg:w-[1000px] md:w-[70%] sm:w-full xsm:w-full mx-auto my-6  px-2 ${darkMode ? 'bg-gray-600': 'bg-gray-100'}`}>
            <p className="text-2xl">Flash Sale</p>
        {   allProductDataWithFlashSale?.data.length > 0 ?
                <div className="flex flex-wrap">
                    {
                    allProductDataWithFlashSale?.data?.slice(0,7)?.map((product:any) => 
                    <div  className="w-[150px] h-[150px] bg-green-100  m-1 flex items-center justify-center relative">
                        {/* <p>{product.price}</p> */}
                        <img className="absolute top-0 w-full h-full" src={product?.images[0]} alt="" />
                        <p className="z-10 text-yellow-300 font-bold bg-gray-700 bg-opacity-50 w-full text-center">{product?.price}</p>
                        <button className="z-10 absolute bottom-0 bg-blue-500 w-full text-white font-bold" onClick={() => navigate(`/allFlashSale`)}>
                            view all
                        </button>
                    </div> ) 
                    }
                </div>
                :
                <div className="p-2">
                    {
                        isLoading
                         ? 
                         <div className="w-full h-[150px] bg-gray-100  m-1 flex items-center justify-center relative">
                         <p>Loading...</p>
                     </div> 
                        : 
                        <div className="w-full h-[150px] bg-green-100  m-1 flex items-center justify-center relative">
                            <p>No product found</p>
                        </div>
                    }
                </div>
            }
        </div>
    );
};

export default FlashSale;