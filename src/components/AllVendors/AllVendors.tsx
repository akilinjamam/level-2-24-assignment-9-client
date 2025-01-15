/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router";
import useGetLastRecentProducts from "../../data-middleware/useGetLastRecentProducts";
import { useGetAllVendors } from "../../data-middleware/useVendorData";
import { useContext } from "react";
import { MyContext } from "../../context/MyContext";

const AllVendors = () => {

    const {darkMode} = useContext(MyContext)
    const {allVendorData} = useGetAllVendors();

    console.log('allVendors',allVendorData?.data);

    const navigate = useNavigate();

    const {recentProducts, isLoading} = useGetLastRecentProducts()

    return (
        <div className={`lg:w-[1000px] md:w-[70%] sm:w-full xsm:w-full mx-auto my-6  px-2 ${darkMode ? 'bg-gray-600': 'bg-gray-200' }`}>
            <p className="text-2xl">All Vendors</p>
            {   recentProducts?.data.length > 0 ?
                <div className="flex flex-wrap">
                    {
                    allVendorData?.data?.map((product:any) => 
                    <div  className="w-[150px] h-[150px] bg-green-100  m-1 flex items-center justify-center relative">
                        {/* <p>{product.price}</p> */}
                        <img className="absolute top-0 w-full h-full" src={product?.logo} alt="" />
                        <p onClick={() => navigate(`/vendors/${product?.vendorId}/${product?.product[0]?.productId}`)} className="z-10 text-yellow-300 font-bold bg-gray-700 bg-opacity-50 w-full text-center cursor-pointer">{product?.shopName}</p>
                        
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

export default AllVendors;