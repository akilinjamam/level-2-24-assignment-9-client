import { Link } from "react-router";

const Cart = () => {
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
                        
                        <div className="w-full h-[200px] bg-gray-100">

                        </div>
                    </div>
                    <div className="w-[29.3%] h-[300px] bg-gray-100 px-2 relative">
                        <p className="text-xl font-bold">Order Summery</p>
                        <hr />
                        <br />
                        <div className="flex items-center justify-between">
                            <p>Sub-Total :</p>
                            <p>$100</p>
                        </div>
                        <Link to="/checkout">
                            <button className="w-[95%] bg-blue-400 text-white font-bold absolute bottom-1">Procceed to Checkout</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;