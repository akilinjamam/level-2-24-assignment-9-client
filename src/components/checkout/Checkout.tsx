import { Link } from "react-router";

const Checkout = () => {
    return (
        <div className="w-[100%] bg-white">
            <div className="w-[1000px]  mx-auto">
                <br />
                <div className="w-[100%] flex items-start justify-between text-sm">
                    <div className="w-[70%] h-auto ">
                        <div className="w-full h-[200px] bg-gray-100 mb-2 px-2">
                            <div className="flex items-center justify-between mb-2">
                                <p>Shop Name :</p>
                                <i className="uil uil-trash-alt"></i>
                            </div>
                            <hr />
                        </div>
                    </div>
                    <div className="w-[29.3%] h-[300px] bg-gray-100 px-2 relative">
                        <p className="text-xl font-bold">Promotion</p>
                        <br />
                        <div className="flex items-center justify-between">
                            <input placeholder="apply coupon code here" style={{outline:'none'}} className="w-[230px] h-[21px] px-1" type="text" name="" id="" />
                            <button className="bg-blue-400 px-1 text-white font-bold">APPLY</button>
                        </div>
                        <br />
                        <hr />
                        <br />
                        <div className="flex items-center justify-between">
                            <p>Sub-Total :</p>
                            <p>$100</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p>Delivery Charge :</p>
                            <p>$80</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p>Discount :</p>
                            <p>$80</p>
                        </div>
                        <hr />
                        <br />
                        <div className="flex items-center justify-between">
                            <p>Total :</p>
                            <p>$260</p>
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