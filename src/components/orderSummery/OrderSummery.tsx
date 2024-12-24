import { useContext, useState } from "react";
import { MyContext } from "../../context/MyContext";
import { toast } from "react-toastify";
import { useCreatePaymentData } from "../../data-middleware/useCreatePaymentData";

const OrderSummery = () => {
    const {cartInfo} = useContext(MyContext)
    const [selcetPayment, setSelectPayment] = useState(false)

    const {createPayment, isPending} = useCreatePaymentData()
    const handlePayment = () => {
        if(selcetPayment){
            createPayment(cartInfo)
        }else{
            toast.error('please select payment method first')
        }
    }

    return (
        <div className="w-[100%] bg-white">
            <div className="w-[1000px]  mx-auto">
                <br />
                <div className="w-[100%] flex items-start justify-between text-sm">
                    <div className="w-[70%] h-auto ">
                        <div className="w-full h-[200px] bg-gray-100 mb-2 px-2">
                            <div className="flex items-center justify-between mb-2">
                                <p>Select Payment Method box from below :</p>
                            </div>
                            <hr />
                            <br />
                            <div onClick={() => setSelectPayment(!selcetPayment)} style={{border: `${selcetPayment ? '1px solid blue': ''}`}} className="w-[120px] h-[120px] bg-gray-200 flex items-center justify-center font-bold cursor-pointer">Amar Pay</div>
                        </div>
                    </div>
                    <div className="w-[29.3%] h-[300px] bg-gray-100 px-2 relative">
                        <p className="text-xl font-bold">Order Summery</p>
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
                        <hr />
                        <div className="flex items-center justify-between">
                            <p>Sub-Total :</p>
                            <p>{cartInfo?.price * cartInfo?.quantity}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p>(-) Discount :</p>
                            <p>{cartInfo?.discount}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p>(-) Discount :</p>
                            <p> {(cartInfo?.price * cartInfo?.quantity) - cartInfo?.discount}</p>
                        </div>

                        <button onClick={handlePayment} className="w-[95%] bg-blue-400 text-white font-bold absolute bottom-1">{isPending ? 'processing..': 'Procceed to Pay'}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSummery;