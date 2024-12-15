/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useNavigate } from "react-router";
import useGetProductDataWithFlashSale from "../../data-middleware/useGetProductDataWithFlashSale";

const AllFlashSale = () => {
    // const navigate = useNavigate();

    const {allProductDataWithFlashSale} = useGetProductDataWithFlashSale()


    return (
        <div className="w-[1000px] mx-auto my-6 bg-white px-2">
            <p className="text-2xl">All Flash Sale</p>
            <div className="flex flex-wrap">
                {
                   allProductDataWithFlashSale?.data?.map((product:any) => 
                   <div  className="w-[150px] h-[150px] bg-green-100  m-1 flex items-center justify-center relative">
                    {/* <p>{product.price}</p> */}
                    <img className="absolute top-0 w-full h-full" src={product?.images[0]} alt="" />
                    <p className="z-10 text-yellow-300 font-bold bg-gray-700 bg-opacity-50 w-full text-center">{product?.price}</p>
                    
                   </div> ) 
                }
            </div>
        </div>
    );
};

export default AllFlashSale;