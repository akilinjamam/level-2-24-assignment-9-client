import { Link } from "react-router";

const Success = () => {

    return (
        <div className="w-[1000px] h-[300px] mx-auto bg-gray-100 flex justify-center items-center">
            <div>
                <p className="text-sm font-bold text-center">Payment successfully done</p>
                <div className="flex items-center justify-between w-[300px] h-[100px]">  
                <button className="text-white bg-green-500 font-bold px-2 cursor-pointer">Payment History</button>
                <Link to="/">
                <button className="text-white bg-blue-500 font-bold px-2 cursor-pointer">Home</button>
                </Link>
                </div>
            </div>
        </div>
    );
};

export default Success;