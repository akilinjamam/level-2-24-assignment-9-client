/* eslint-disable @typescript-eslint/no-explicit-any */

import { useNavigate } from "react-router";

const Products = ({allProducts, range, setRange, setCategory, category ,isLoading}: {allProducts:any, range:any, setRange:any, category:any, setCategory: any, isLoading:any}) => {

    const navigate = useNavigate();
   
    return (
        <div className="w-[1000px] mx-auto my-6 bg-white px-2">
            <p className="text-2xl">All Products</p>
            <br />
            <div className="w-full h-[40px] bg-gray-100 p-2">
                <label className="mr-2" htmlFor="">From:</label>
                <input value={range.from} onChange={(e) => setRange({...range, from:e.target.value})} type="number" className="mr-2"/>
                <label className="mr-2" htmlFor="">To:</label>
                <input value={range.to}  onChange={(e) => setRange({...range, to:e.target.value})} type="number" />
                <input value={category} onChange={(e) => setCategory(e.target.value)} type="text"  className="ml-3 px-1" placeholder="search with category"/>
                <button onClick={() => {
                    setRange({from: '', to: ''})
                    setCategory('')
                }} className="ml-4 bg-gray-300 px-2 rounded font-bold">Cancel</button>
            </div>
            <br />
            {   allProducts?.data.length > 0 
                ?
                <div className="flex flex-wrap">
                    {
                        allProducts?.data?.map((product:any) => 
                            <div onClick={() => navigate(`/products/${product?.productId}`)} className="w-[150px] h-[150px] bg-green-200 m-1 flex items-center justify-center relative cursor-pointer">
                            <img className="absolute top-0 w-full h-full" src={product?.images[1]} alt="" />
                            <p title={product?.productName} className="z-10 bg-gray-400 bg-opacity-50 p-1 font-bold text-green-300 w-full text-center">{product?.productName?.length > 15 ? product?.productName?.slice(0,15) + '..' : product?.productName }</p>
                            <p className="z-10 text-red-700 absolute bottom-2 bg-gray-100 bg-opacity-50 p-1 font-bold">{product?.price}</p>
                        </div>
                        ) 
                    }
                </div>
                :
                <div className="w-full h-[150px] bg-green-100  m-1 flex items-center justify-center relative">
                    {
                        isLoading 
                        ?
                        <div className="w-full h-[150px] bg-gray-100  m-1 flex items-center justify-center relative">
                            <p>Loading...</p>
                        </div>
                        :
                        <div className="w-full h-[150px] bg-gray-100  m-1 flex items-center justify-center relative">
                            <p>No product found</p>
                        </div>
                    }
                </div>
            }
        </div>
    );
};

export default Products;