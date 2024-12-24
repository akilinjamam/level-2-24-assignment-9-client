import { NavLink, useNavigate } from "react-router";
import { navroutes } from "./navroute";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../../components/dashboard/vendorDashRoutes/VendorProfile";
import useGetPurchasedProductDataWithId from "../../data-middleware/useGetPurchasedProductDataWithId";
import { useEffect } from "react";

const Nav = () => {

    const token = localStorage.getItem('userToken');
    const navigate = useNavigate();
    let decoded:string | undefined; 
    if(token){
        const decode = jwtDecode<DecodedToken>(token);
        decoded = decode?.userType
    }

    const { allPurcasedProductDataWithId, refetch } = useGetPurchasedProductDataWithId(
        decoded as string
      );

      useEffect(() => {
        refetch()
      },[refetch])
     

    const handleDash = () => {
        if(decoded !== 'VENDOR'){
            navigate('/')
        }
    }

    return (
        <div className="w-full h-[50px] bg-orange-600">
            <div className="w-[1000px] h-full  mx-auto">
                <div className="w-[100%] h-[100%] flex">
                    <ul className="flex items-center justify-around p-1.5 w-[100%] ">
                        {
                            navroutes?.map((item, index) => <NavLink to={item?.link} className={({isActive}) => isActive ? 'text-blue-900 font-bold' : "text-white"}><li key={index+1}>{item?.route}</li></NavLink> )
                        }
                        { (decoded && (decoded === 'VENDOR' || decoded === 'ADMIN'))
                            &&
                            <NavLink onClick={handleDash} className={({isActive}) => isActive ? 'text-blue-900 font-bold' : "text-white"} to="/vendorDashboard"><li>Dashboard</li></NavLink>
                        }
                        <li onClick={() => {
                            localStorage.removeItem('userToken')
                            navigate('/login')
                        }} className="text-white cursor-pointer">Logout</li>

                        <NavLink onClick={handleDash} className={({isActive}) => isActive ? 'text-blue-900 font-bold' : "text-white"} to="/cart"><li>Cart {allPurcasedProductDataWithId?.data?.length > 0 ? allPurcasedProductDataWithId?.data?.length : ''}</li></NavLink>
                    </ul>
                </div>
                {/* <div className="w-full h-[60%] flex items-center justify-between">
                    <div className="w-[20%] flex items-center justify-center">
                        <p>Logo</p>
                    </div>
                    <div className="w-[75%] h-[70%] bg-blue-300">
                        <input className="w-[100%] h-[100%] p-2" type="text" />
                    </div>
                    <div className="w-[5%] h-[70%] flex items-center justify-center bg-gray-300 text-2xl"><i className="uil uil-message"></i></div>
                </div> */}
            </div>
        </div>
    );
};

export default Nav;