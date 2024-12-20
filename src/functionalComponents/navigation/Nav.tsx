import { NavLink } from "react-router";
import { navroutes } from "./navroute";

const Nav = () => {
    return (
        <div className="w-full h-[100px] bg-orange-600">
            <div className="w-[1000px] h-full  mx-auto">
                <div className="w-[80%] h-[40%] ">
                    <ul className="flex items-center justify-around p-1.5 w-[80%] ">
                        {
                            navroutes?.map((item, index) => <NavLink to={item?.link} className={({isActive}) => isActive ? 'text-blue-900 font-bold' : "text-white"}><li key={index+1}>{item?.route}</li></NavLink> )
                        }
                    </ul>
                </div>
                <div className="w-full h-[60%] flex items-center justify-between">
                    <div className="w-[20%] flex items-center justify-center">
                        <p>Logo</p>
                    </div>
                    <div className="w-[75%] h-[70%] bg-blue-300">
                        <input className="w-[100%] h-[100%] p-2" type="text" />
                    </div>
                    <div className="w-[5%] h-[70%] flex items-center justify-center bg-gray-300 text-2xl"><i className="uil uil-message"></i></div>
                </div>
            </div>
        </div>
    );
};

export default Nav;