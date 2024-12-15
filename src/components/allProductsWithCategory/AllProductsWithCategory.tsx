/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router";
import useGetProductData from "../../data-middleware/useProductData";

const AllProductsWithCategory = () => {

    const {id} =useParams()

    const {allProductData} = useGetProductData(id as string, '', '')

    const allProducts = allProductData?.data;

    return (
        <div className="w-[1000px] mx-auto my-6 bg-white px-2">
        <p className="text-2xl">All Products</p>
        <div className="flex flex-wrap">
            {
               allProducts?.map((product:any) => 
                <div className="w-[150px] h-[150px] bg-green-200 m-1 flex items-center justify-center relative cursor-pointer">
               <img className="absolute top-0 w-full h-full" src={product?.images[1]} alt="" />
               <p className="z-10 bg-gray-400 bg-opacity-50 p-1 font-bold text-green-300">{product?.category}</p>
           </div>
           ) 
            }
        </div>
    </div>
    );
};

export default AllProductsWithCategory;