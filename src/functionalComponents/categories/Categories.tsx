/* eslint-disable @typescript-eslint/no-explicit-any */

import { useNavigate } from "react-router";
import useGetProductDataWithCategory from "../../data-middleware/useGetProductDataWithCategory";

const Categories = () => {

    const navigate = useNavigate();

   const {allProductDataWithCategory} = useGetProductDataWithCategory()
   const data = allProductDataWithCategory?.data


    return (
        <div className="w-[1000px] mx-auto my-6 bg-white px-2">
            <p className="text-2xl">Categories</p>
            <div className="flex flex-wrap">
                {
                   data?.map((product:any) => 
                    <div onClick={() => navigate(`/allProductsWithCategory/${product?.category}`)} className="w-[150px] h-[150px] bg-gray-200 m-1 flex items-center justify-center relative cursor-pointer">
                       
                        <p className="z-10 bg-gray-400 bg-opacity-50 p-1 font-bold text-red-500">{product?.category}</p>
                    </div>
                ) 
                }
            </div>
        </div>
    );
};

export default Categories;