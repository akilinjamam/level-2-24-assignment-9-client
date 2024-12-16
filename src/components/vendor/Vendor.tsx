/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router";
import { useGetVendorDataWithId } from "../../data-middleware/useVendorData";

const Vendor = () => {

    const navigate = useNavigate();

    const {vendorId, productId} = useParams()
    console.log('productId:',productId);
    
    const {vendorData} = useGetVendorDataWithId(vendorId as string);

    console.log(vendorData?.data);

    const vendor = vendorData?.data;

    const findSelectedProduct = vendor?.product?.find((f:any) => f?.productId === productId)


    return (
        <div className="w-[100%] text-sm">
            <div className="w-[1000px] bg-gray-100 mx-auto p-2 flex">
                <div className="w-[400px] h-[150px] bg-gray-200 flex">
                    <div className="w-[150px] h-full bg-gray-300">
                        <img className="w-full h-full" src={vendor?.logo} alt="" />
                    </div>
                    <div className="w-[250px] h-full p-2 flex items-baseline justify-between">
                        <div>
                            <p>{vendor?.vendorName}</p>
                            <p>Following: {vendor?.follows?.length}</p>
                        </div>
                        <button className="bg-blue-500 text-white p-1">+Follow</button>
                    </div>
                </div>
                <div className="w-[600px] h-[150px] px-2">
                    <p className="font-semibold">Detail :</p>
                    <hr />
                    <p>{vendor?.details}</p>
                </div>
            </div>
            <div className="w-[1000px] mx-auto bg-gray-100 m-6 p-2">
                <div className="w-full h-auto">
                    <p className="font-bold">Selected Product:</p>
                    <div className="flex flex-wrap">
                    <div className="w-[150px] h-[150px] bg-green-100 m-1  text-center flex items-center justify-center relative">
                                            <p onClick={() => navigate(`/products/${findSelectedProduct?.productId}`)} className="bg-gray-300 font-bold w-full bg-opacity-50 cursor-pointer">{findSelectedProduct?.productName}</p>

                                            <p  className="absolute top-1 text-red-700 font-bold ">{findSelectedProduct?.price}</p>

                                            
                                            <p onClick={() => navigate('/cart')}  className="absolute bottom-0  text-white bg-blue-500 w-full cursor-pointer font-bold ">Add To Cart</p>
                                    </div>
                    </div>
                </div>  
            </div>
            <div className="w-[1000px] mx-auto bg-gray-100 m-6 p-2">
                <div className="w-full h-auto">
                    <p className="font-bold">All Products:</p>
                    <div className="flex flex-wrap">
                        {
                            vendor?.product?.map((item:any) => {
                                return (
                                    <div className="w-[150px] h-[150px] bg-green-100 m-1  text-center flex items-center justify-center relative">
                                            <p onClick={() => navigate(`/products/${item?.productId}`)} className="bg-gray-300 font-bold w-full bg-opacity-50 cursor-pointer">{item?.productName}</p>

                                            <p  className="absolute top-1 text-red-700 font-bold ">{item?.price}</p>

                                            
                                            <p onClick={() => navigate('/cart')}  className="absolute bottom-0  text-white bg-blue-500 w-full cursor-pointer font-bold ">Add To Cart</p>
                                        </div>
                                )
                            } )
                        }
                    </div>
                </div>  
            </div>
        </div>
    );
};

export default Vendor;