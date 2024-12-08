const OrderSummery = () => {
    return (
        <div className="w-[100%] bg-white">
            <div className="w-[1000px]  mx-auto">
                <br />
                <div className="w-[100%] flex items-start justify-between text-sm">
                    <div className="w-[70%] h-auto ">
                        <div className="w-full h-[200px] bg-gray-100 mb-2 px-2">
                            <div className="flex items-center justify-between mb-2">
                                <p>Select Payment Method :</p>
                                <i className="uil uil-trash-alt"></i>
                            </div>
                            <hr />
                            <br />
                            <div className="w-[120px] h-[120px] bg-gray-200"></div>
                        </div>
                    </div>
                    <div className="w-[29.3%] h-[300px] bg-gray-100 px-2 relative">
                        <p className="text-xl font-bold">Order Summery</p>
                        
                        <hr />
                        

                        <br />
                        <div className="flex items-center justify-between">
                            <p>Total :</p>
                            <p>$260</p>
                        </div>

                        <button className="w-[95%] bg-blue-400 text-white font-bold absolute bottom-1">Procceed to Pay</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSummery;