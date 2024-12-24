import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { MyContext } from "../../context/MyContext";
import { toast } from "react-toastify";

const Checkout = () => {
    const {productName, cartInfo, setCartInfo} = useContext(MyContext)

    const [coupon, setCoupon] = useState('');
    const [gotCoupon, setGotCoupon] = useState(false);
    const [couponDiscount, setCouponDiscount] = useState(0);

    const handleCoupon = () => {
        if(!gotCoupon){
            if(coupon === '1234'){
                setGotCoupon(true)
                setCartInfo({...cartInfo, discount:cartInfo?.discount + couponDiscount})
            }
        }else{
            toast.error('you have already applied coupon')
        }
    }

    useEffect(() => {
        setCouponDiscount(15)
    },[couponDiscount])



    return (
        <div className="w-[100%] bg-white">
            <div className="w-[1000px]  mx-auto">
                <br />
                <div className="w-[100%] flex items-start justify-between text-sm">
                    <div className="w-[70%] h-auto ">
                        <div className="w-full h-[200px] bg-gray-100 mb-2 px-2 py-1">
                            <p>Product Name: {productName}</p>
                            <p>Quantity: {cartInfo?.quantity}</p>
                            <p>Price: {cartInfo?.price}</p>
                            <p>Discount: {cartInfo?.discount}</p>
                        </div>
                    </div>
                    <div className="w-[29.3%] h-[300px] bg-gray-100 px-2 relative">
                        <p className="text-xl font-bold">Promotion</p>
                        <p className="text-sm font-bold text-green-500">apply coupon code: 1234 and get 15 tk discount</p>
                        <br />
                        <div className="flex items-center justify-between">
                            <div>
                                <input placeholder="apply coupon code" style={{outline:'none'}} className="w-[230px] h-[21px] px-1" type="text" name="" id="" onChange={(e) => setCoupon(e.target.value)} />
                            </div>
                            <button onClick={handleCoupon} className="bg-blue-400 px-1 text-white font-bold">APPLY</button>
                        </div>
                        <br />
                        <hr />
                        <br />
                        <div className="flex items-center justify-between">
                            <p>Price :</p>
                            <p>${cartInfo?.price}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p>Quantity :</p>
                            <p>{cartInfo?.quantity}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p>Discount :</p>
                            <p>${cartInfo?.discount}</p>
                        </div>
                        <hr />
                        <br />
                        <div className="flex items-center justify-between">
                            <p>Total :</p>
                            <p>{(cartInfo?.price * cartInfo?.quantity) - cartInfo?.discount }</p>
                        </div>

                        <Link to="/orderSummery">
                            <button className="w-[95%] bg-blue-400 text-white font-bold absolute bottom-1">Procceed to Pay</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;