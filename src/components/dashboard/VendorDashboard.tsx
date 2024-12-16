import { NavLink, Outlet } from "react-router";
import { vendorDashMenu } from "./vendorDashRoutes/vendorDashRoute";

const VendorDashboard = () => {
    return (
        <div className="w-[1000px] bg-gray-100 h-[500px] mx-auto">
            <div className="w-[100%] h-[30px] bg-green-600 flex items-center justify-center font-bold text-white">
                Dashboard
            </div>
            <div className="w-full h-full bg-gray-100 flex">
                <div className="w-[200px] bg-gray-200 px-3">
                    <p className="text-center font-bold">Menu</p>
                    <br />
                    <ul className="text-sm leading-6">
                        {
                            vendorDashMenu?.map((item, index) => (
                                <NavLink to={item?.link} className={({isActive}) => isActive ? 'text-blue-500 font-bold' : ''}>
                                    <li>{index+1}. {item?.name}</li>
                                </NavLink>
                            ))
                        }
                    </ul>
                </div>
                <div className="w-[800px] bg-gray-100 px-2 py-1">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default VendorDashboard;