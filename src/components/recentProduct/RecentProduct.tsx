/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router";
import useGetLastRecentProducts from "../../data-middleware/useGetLastRecentProducts";
import { MyContext } from "../../context/MyContext";
import { useContext } from "react";

const RecentProduct = () => {

    const {darkMode} = useContext(MyContext)
    const navigate = useNavigate();

    const {recentProducts, isLoading} = useGetLastRecentProducts()

    return (
        <div className={`lg:w-[1000px] md:w-[70%] sm:w-full xsm:w-full mx-auto my-6  px-2 ${darkMode ? 'bg-gray-600': 'bg-gray-200'}`}>
            <p className="text-2xl">Recent Products</p>
            {   recentProducts?.data.length > 0 ?
                <div className="flex flex-wrap">
                    {
                    recentProducts?.data?.slice(0,10)?.map((product:any) => 
                    <div  className="w-[150px] h-[150px] bg-green-100  m-1 flex items-center justify-center relative">
                        {/* <p>{product.price}</p> */}
                        <img className="absolute top-0 w-full h-full" src={product?.images[0]} alt="" />
                        <p className="z-10 text-yellow-300 font-bold bg-gray-700 bg-opacity-50 w-full text-center">{product?.price}</p>
                        <button className="z-10 absolute bottom-0 bg-blue-500 w-full text-white font-bold" onClick={() => navigate(`/products/${product?.productId}`)}>
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

export default RecentProduct;