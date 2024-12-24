/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router";
import useGetProductDataWithFlashSale from "../../data-middleware/useGetProductDataWithFlashSale";

const FlashSale = () => {
    const navigate = useNavigate();

    const {allProductDataWithFlashSale, isLoading} = useGetProductDataWithFlashSale()


    return (
        <div className="w-[1000px] mx-auto my-6 bg-white px-2">
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