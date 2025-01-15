/* eslint-disable @typescript-eslint/no-explicit-any */

import { useNavigate } from "react-router";
import useGetProductDataWithCategory from "../../data-middleware/useGetProductDataWithCategory";
import { MyContext } from "../../context/MyContext";
import { useContext } from "react";

const Categories = () => {
const {darkMode} = useContext(MyContext)
    const navigate = useNavigate();

   const {allProductDataWithCategory, isLoading} = useGetProductDataWithCategory()
   const data = allProductDataWithCategory?.data


    return (
        <div className={`lg:w-[1000px] md:w-[70%] sm:w-full xsm:w-full mx-auto my-6 px-2 ${darkMode ? 'bg-gray-600': 'bg-gray-100'}`}>
            <p className="text-2xl">Categories</p>
            <div >
                {   data?.length > 0 
                    ?      
                    <div className="flex flex-wrap">
                    {
                    data?.map((product:any) => 
                        <div onClick={() => navigate(`/allProductsWithCategory/${product?.category}`)} className="w-[150px] h-[150px] bg-gray-200 m-1 flex items-center justify-center relative cursor-pointer">
                        
                            <p className="z-10 bg-gray-400 bg-opacity-50 p-1 font-bold text-red-500">{product?.category}</p>
                        </div>
                        ) 
                    }
                    </div>
                    :
                    <div>
                        {   isLoading
                            ?
                            <div className="w-full h-[150px] bg-gray-100  m-1 flex items-center justify-center relative">
                                <p>Loading...</p>
                            </div> 
                            :
                            <div className="w-[150px] h-[150px] bg-green-100  m-1 flex items-center justify-center relative">
                            <p>No product found</p>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default Categories;