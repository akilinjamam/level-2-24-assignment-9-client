/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router";
import { useGetVendorDataWithId } from "../../data-middleware/useVendorData";
import usePostPurchaseProductData from "../../data-middleware/usePostPurchaseProductData";
import { useContext, useEffect, useState } from "react";
import useUserFromToken from "../../data-middleware/useUserFromToken";
import { useGetFollowData, usePostFollowData } from "../../data-middleware/useFollowsData";
import { toast } from "react-toastify";
import useGetPurchasedProductDataWithId from "../../data-middleware/useGetPurchasedProductDataWithId";
import ModalCart from "../dashboard/vendorDashRoutes/ModalCart";
import { MyContext } from "../../context/MyContext";



const Vendor = () => {

    const {setUserInfo, setCouponInfo, darkMode} = useContext(MyContext)
    const [open, setOpen] = useState<boolean>(false);
    
    const {decoded, userType, userName, phoneNumber} = useUserFromToken()

    const [cartId, setCartId] = useState('')
    
    const userId = decoded;

    const navigate = useNavigate();

    const {vendorId, productId} = useParams();

        
    const {vendorData, refetch} = useGetVendorDataWithId(vendorId as string);

   
    const vendor = vendorData?.data;

    const findSelectedProduct = vendor?.product?.find((f:any) => f?.productId === productId)

    const { allPurcasedProductDataWithId } = useGetPurchasedProductDataWithId(
        decoded as string
      );

    const checkSameVendor = allPurcasedProductDataWithId?.data?.find((f:any) => f?.vendorId === vendorId )
    console.log(checkSameVendor?.vendorId)
    console.log(allPurcasedProductDataWithId?.data?.length)
    const {addToCartData, isPending} = usePostPurchaseProductData()
    const [cartInfo, setCartInfo] = useState<any>({
        userId: '',
        productId: '',
        vendorId: '',
        productName: '',
        details: '',
        price:'',
        quantity:'',
        totalPrice: '',
        discount: '',
        category:'',
        purchased:''
    })
  
    const handleAddToCart = (details:string, price:number, discount:number, category:string, productName:string, prodId:string) => {

        if(userType === 'VENDOR' || userType === 'ADMIN'){
            
            toast.error(`${userType} can not purchase product`);
            return
        }

        setCartId(prodId)
        const newAddToCartData = {
            userId,
            productId:prodId,
            vendorId,
            productName,
            details: details,
            price,
            quantity: 1,
            totalPrice: price,
            discount,
            category,
            purchased: false
        }

        if(allPurcasedProductDataWithId?.data?.length > 0){
            if(!checkSameVendor?.vendorId){
                setOpen(true)
                setCartInfo(newAddToCartData)
                return
            }

            setCouponInfo({
                couponCode: '',
                couponValue: ''
            })
        }

        if(!decoded){
            toast.error('Please Login First');
            navigate('/login')
            return
        }

        addToCartData(newAddToCartData)
        setUserInfo({
            userName,
            phoneNumber
        })
        
       
    }

    const {getFollowData} = useGetFollowData()
    const {addFollows, isPending:pendingFollow} = usePostFollowData(refetch);

    

    
    const createFollow = (e: any ) => {  

        if(!decoded){
            toast.error('Please Login First');
            navigate('/login')
            return
        }


        e.preventDefault();

        const newFollowData = {
            userId,
            vendorId
        }
        setIsVendorFollows(!isVendorFollows)
        addFollows(newFollowData)
    }  

    

    const getUserFromAllVendor = getFollowData?.data?.filter((f:any) => f?.userId === userId);
    const getVendorFromUser = getUserFromAllVendor?.find((f:any) => f?.vendorId === vendorId);


    const [isVendorFollows, setIsVendorFollows] = useState(false);

    useEffect(() => {
        refetch()
    }, [refetch, vendorData, getFollowData]);

    useEffect(() => {
        
        if(getVendorFromUser?.vendorId){
            setIsVendorFollows(true)   
        }
    }, [ getVendorFromUser?.vendorId]);


    return (
        <div className={`w-[100%] text-sm relative ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}>
            <div className={`lg:w-[1000px] md:w-[70%] sm:w-full xsm:w-full  mx-auto p-2 flex flex-wrap ${darkMode ? 'bg-gray-300' : 'bg-gray-100'}`}>
                <div className="w-[400px] h-[150px] bg-gray-200 flex">
                    <div className="w-[150px] h-full bg-gray-300">
                        <img className="w-full h-full" src={vendor?.logo} alt="" />
                    </div>
                    <div className="w-[250px] h-full p-2 flex items-baseline justify-between">
                        <div>
                            <p>{vendor?.vendorName}</p>
                            <p>Following: {vendor?.follows?.length}</p>
                        </div>
                        <button onClick={createFollow} className="bg-blue-500 text-white p-1 cursor-pointer">{pendingFollow ? 'pending..' : `${isVendorFollows ? 'Following': "+Follow" }`}</button>
                    </div>
                </div>
                <div className="w-[600px] h-[150px] px-2">
                    <p className="font-semibold">Detail :</p>
                    <hr />
                    <p>{vendor?.details}</p>
                </div>
            </div>
            <div className={`lg:w-[1000px] md:w-[70%] sm:w-full xsm:w-full mx-auto  m-6 p-2 ${darkMode ? 'bg-gray-300' : 'bg-gray-100'}`}>
                <div className="w-full h-auto">
                    <p className="font-bold">Selected Product:</p>
                    <div className="flex flex-wrap">
                    <div className="w-[150px] h-[150px] bg-green-100 m-1  text-center flex items-center justify-center relative">
                            <img className="absolute h-full w-full" src={findSelectedProduct?.images[0]} alt="" />
                            <p onClick={() => navigate(`/products/${findSelectedProduct?.productId}`)} className="bg-gray-300 font-bold w-full bg-opacity-50 cursor-pointer z-10">{findSelectedProduct?.productName}</p>

                            <p  className="absolute top-1 text-red-700 font-bold ">{findSelectedProduct?.price}</p>

                                            
                            <p onClick={() => handleAddToCart(findSelectedProduct?.details, findSelectedProduct?.price, findSelectedProduct?.discount, findSelectedProduct?.category, findSelectedProduct?.productName, findSelectedProduct?.productId)}  className="absolute bottom-0  text-white bg-blue-500 w-full cursor-pointer font-bold ">{(isPending && (cartId === findSelectedProduct?.productId)) ? 'adding...': 'Add To Cart'}</p>
                    </div>
                    </div>
                </div>  
            </div>
            <div className={`lg:w-[1000px] md:w-[70%] sm:w-full xsm:w-full mx-auto bg-gray-100 m-6 p-2 ${darkMode ? 'bg-gray-300' : 'bg-gray-100'}`}>
                <div className="w-full h-auto">
                    <p className="font-bold">All Products:</p>
                    <div className="flex flex-wrap">
                        {
                            vendor?.product?.map((item:any) => {
                                return (
                                    <div className="w-[150px] h-[150px] bg-green-100 m-1  text-center flex items-center justify-center relative">
                                            <img className="absolute h-full w-full" src={item?.images[0]} alt="" />
                                            <p onClick={() => navigate(`/products/${item?.productId}`)} className="bg-gray-300 font-bold w-full bg-opacity-50 cursor-pointer z-10">{item?.productName}</p>

                                            <p  className="absolute top-1 text-red-700 font-bold ">{item?.price}</p>

                                            <p onClick={() => handleAddToCart(item?.details, item?.price, item?.discount, item?.category, item?.productName, item?.productId)}  className="absolute bottom-0  text-white bg-blue-500 w-full cursor-pointer font-bold ">{(isPending && (cartId === item?.productId)) ? 'adding...': 'Add To Cart'}</p>
                                            
                                        </div>
                                )
                            } )
                        }
                    </div>
                </div>  
            </div>
            <div className={`absolute top-0 z-10 w-full h-[100vh] bg-black bg-opacity-50 flex items-center justify-center ${open ? 'block' : 'hidden'}`}>
                <ModalCart setOpen={setOpen} cartInfo={cartInfo} />
            </div>
        </div>
    );
};

export default Vendor;