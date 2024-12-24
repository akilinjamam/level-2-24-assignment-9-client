/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "./VendorProfile";
import {  useGetVendorDataWithUserId } from "../../../data-middleware/useVendorData";
import useGetProductData from "../../../data-middleware/useProductData";
import { useContext } from "react";
import { MyContext } from "../../../context/MyContext";

const ProductVendorDash = () => {
    const {setOpen, setId, setProductName} = useContext(MyContext)
    const navigate = useNavigate();

    const token = localStorage.getItem('userToken');

    let decoded;
    if(token){
        const decode = jwtDecode<DecodedToken>(token);
        decoded = decode?.userId;
    }else{
        decoded = ''
    }

    const {vendorData} = useGetVendorDataWithUserId(decoded as string);
    const getVendorId = vendorData?.data?.vendorId;

    console.log(getVendorId);

    const {allProductData, isLoading} = useGetProductData('', '', '')
    
    const vendorWithVendorId = allProductData?.data?.filter((f:any) => f?.vendorId === getVendorId)
    
    console.log('vendor-products', vendorWithVendorId);

    const vendorsProductData = vendorWithVendorId;



    return (
        <div className="w-full">
            <div className="flex items-center justify-end">
                <Link to="/vendorDashboard/createProduct">
                    <button className="font-bold text-white bg-blue-500 px-2">+Create Product</button>
                </Link>
            </div>
            <hr className="mt-2" />
            { !isLoading
                ?
                vendorsProductData?.slice()?.reverse()?.map((product:any) => (
                    <div className="flex w-full h-[300px] bg-gray-200 mb-3">
                    <div  className="w-[300px] h-full "> 
                        <div className="w-[300px] h-[200px] bg-gray-300">
                            <img className="w-full h-full" src={product?.images[0]} alt="" />
                        </div>
                        <div className="w-full flex">
                            {
                                product?.images?.slice(0,3)?.map((smImg:any) => (
                                    <img className="w-[100px] h-[100px]" src={smImg} alt="" />
                                ))
                            }
                        </div>
                    </div>
                    <div className="w-auto px-2">
                        <p className="text-xl font-bold">{product?.productName}</p>
                        <p>Category: {product?.category}</p>
                        <p>price: {product?.price}</p>
                        <p>Quantity: {product?.quantity}</p>
                        <p>discount: {product?.discount}</p>
                        <p>flash sale: {product?.flashSale ? 'On' : 'Off'}</p>
                        <br />
                        <p>Details: {product?.details}</p>
                        <br />
                        <div>
                            <button onClick={() => navigate(`/vendorDashboard/editProduct/${product?.productId}`)} className="text-white font-bold bg-green-500 px-2 mr-2 cursor-pointer">Edit</button>

                            <button onClick={() => navigate(`/vendorDashboard/editProductImg/${product?.productId}`)} className="text-white font-bold bg-green-500 px-2 mr-2 cursor-pointer">Edit Image</button>

                            <button onClick={() => {
                                setOpen(true)
                                setId(product?.productId)
                                setProductName(product?.productName)
                                
                            }} className="text-white font-bold bg-red-500 px-2 mr-2 cursor-pointer">Delete</button>
                        </div>
                    </div>
                </div>
                ))

                :
                <p>Loading...</p>
            }
            
        </div>
    );
};

export default ProductVendorDash;