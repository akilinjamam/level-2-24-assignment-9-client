/* eslint-disable @typescript-eslint/no-explicit-any */

import { useNavigate } from "react-router";
import { useUpdateRecentProductData } from "../../data-middleware/useUpdateProductData";
import { useContext } from "react";
import { MyContext } from "../../context/MyContext";
import Pagination from "../pagination/Pagination";


const Products = ({ allProducts, range, setRange, setCategory, category, isLoading, refetch }: { allProducts: any, range: any, setRange: any, category: any, setCategory: any, isLoading: any, refetch: any }) => {



    const { setPaginatedDataContainer, paginatedDataContainer, setPaginatedIndex, darkMode } = useContext(MyContext)

    console.log('all-products', allProducts);

    const navigate = useNavigate();

    const { updateProductData } = useUpdateRecentProductData(refetch)

    const handleClick = (click: number, id: string) => {
        updateProductData({
            id: id,
            data: {
                clicked: click + 1
            }
        })
    }


    return (
        <div className={`lg:w-[1000px] md:w-[70%] sm:w-full xsm:w-full mx-auto my-6  pb-3 h-auto px-2 ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
            <p className="text-2xl">All Products: {allProducts?.length} </p>
            <br />
            <div className="w-full lg:h-[40px] md:h-[50px] sm:h-auto xsm:h-auto bg-gray-100 p-2">
                <label className="mr-2" htmlFor="">From:</label>
                <input value={range.from} onChange={(e) => setRange({ ...range, from: e.target.value })} type="number" className="mr-2" />
                <label className="mr-2" htmlFor="">To:</label>
                <input value={range.to} onChange={(e) => setRange({ ...range, to: e.target.value })} type="number" />
                <input value={category} onChange={(e) => setCategory(e.target.value)} type="text" className="ml-3 px-1" placeholder="search with category" />
                <button onClick={() => {
                    setRange({ from: '', to: '' })
                    setCategory('')
                }} className="ml-4 bg-gray-300 px-2 rounded font-bold">Cancel</button>
            </div>
            <br />
            {allProducts?.length > 0
                ?
                <div className="flex flex-wrap">
                    {
                        paginatedDataContainer?.map((product: any) =>
                            <div className="w-[150px] h-[150px] bg-green-200 m-1 flex items-center justify-center relative cursor-pointer">
                                <img title="click to get detail" onClick={() => {
                                    navigate(`/products/${product?.productId}`)
                                    handleClick(product?.clicked, product?.productId)
                                }} className="absolute top-0 w-full h-full" src={product?.images[1]} alt="" />
                                <p onClick={() => {
                                    navigate(`/products/${product?.productId}`)
                                    handleClick(product?.clicked, product?.productId)
                                }} title={product?.productName} className="z-10 bg-gray-400 bg-opacity-50 p-1 font-bold text-green-300 w-full text-center">{product?.productName?.length > 15 ? product?.productName?.slice(0, 15) + '..' : product?.productName}</p>
                                <p className="z-10 text-red-700 absolute top-2 bg-gray-100 bg-opacity-90 p-1 font-bold">${product?.price}</p>
                                <p onClick={() => navigate(`/vendors/${product?.vendorId}/${product?.productId}`)} className="z-10 text-white absolute bottom-0 bg-blue-500 bg-opacity-90 p-1 font-bold w-full text-center">Add To Cart</p>
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

            <div className=" h-[50px]  lg:w-[1000px] md:w-[70%] sm:w-full xsm:w-full mx-auto">
                <div className="w-ful">
                    <br />
                    {
                        (!isLoading && allProducts?.length > 0)
                        &&
                        <Pagination showData={allProducts} setPaginatedDataContainer={setPaginatedDataContainer} setPaginatedIndex={setPaginatedIndex} limit={10} />
                    }
                </div>
            </div>
        </div>
    );
};

export default Products;