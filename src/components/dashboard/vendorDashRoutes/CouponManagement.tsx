/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import useGetProductData from "../../../data-middleware/useProductData";
import useUserFromToken from "../../../data-middleware/useUserFromToken";
import { useGetVendorDataWithUserId } from "../../../data-middleware/useVendorData";
import { Link } from "react-router";

const CouponManagement = () => {

    

    const {decoded, userType} = useUserFromToken()
    
    const [mainData, setMainData] = useState([]);

    const {vendorData} = useGetVendorDataWithUserId(decoded as string);
    const getVendorId = vendorData?.data?.vendorId;

    console.log(getVendorId);

    const {allProductData} = useGetProductData('', '', '')
    
    const vendorWithVendorId = allProductData?.data?.filter((f:any) => f?.vendorId === getVendorId)
    
    console.log('vendor-products', vendorWithVendorId);

    const vendorsProductData = vendorWithVendorId;
    console.log(vendorsProductData);

   
    useEffect(() => {
        if (userType === "ADMIN") {
          setMainData(allProductData?.data || []);
        } else if (userType === "VENDOR" && getVendorId) {
          const vendorProducts = allProductData?.data?.filter(
            (f: any) => f?.vendorId === getVendorId
          );
          setMainData(vendorProducts || []);
        }
      }, [userType, allProductData, getVendorId]);


    return (
        <div className="w-full min-h-20 bg-gray-200 mt-1">
            {
                mainData?.map((product:any) => (
                    <div className="w-full h-auto bg-gray-100 p-2 mb-2 text-sm">
                        <div className="w-full h-auto flex">
                            <div className="w-[100px] h-[100px] bg-gray-200">
                                <img className="w-full h-full" src={product?.images[0]} alt="" />
                            </div>
                            <div className="w-full h-auto px-2">
                                <p className="font-bold">{product?.productName}</p>
                                <hr />
                                
                                <p>Coupon Code : {product?.couponCode}</p>
                                <p>Coupon Price : {product?.couponValue}</p>
                                <br />
                                <Link to={`/vendorDashboard/updateCoupon/${product?.productId}`}>
                                <button className=" bg-blue-500 text-white font-bold px-2 cursor-pointer" >Manage Coupon</button>
                                </Link>
                                
                                </div>
                        </div>
                    </div>
                ))
            }            
        </div>
    );
};

export default CouponManagement;