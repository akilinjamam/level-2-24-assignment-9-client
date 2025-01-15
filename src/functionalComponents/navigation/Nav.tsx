/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, useNavigate } from "react-router";
import { navroutes } from "./navroute";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../../components/dashboard/vendorDashRoutes/VendorProfile";
import useGetPurchasedProductDataWithId from "../../data-middleware/useGetPurchasedProductDataWithId";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../context/MyContext";

const Nav = () => {
    const {setDarkMode} = useContext(MyContext)
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

    const [view, setView] = useState(false)

    return (
        <div className=" w-full h-[50px] bg-orange-600 sticky top-0 z-50">

            <div className=" lg:w-[1000px] md:w-[70%] sm:w-full xsm:w-full h-full  mx-auto">
                <div className="w-[100%] h-[100%] flex">
                <i onClick={() => setView(!view)} className="uil uil-bars xsm:absolute sm:absolute lg:hidden  left-2 top-3 text-white "></i>
                <div className={`${view ? 'absolute' : 'hidden'} w-[150px] h-[300px] bg-white xsm:absolute top-12 sm:absolute lg:hidden px-2 text-sm`}>
                        {
                            navroutes?.map((item, index) => <NavLink to={item?.link} className={({isActive}) => isActive ? 'text-blue-900 font-bold' : "text-gray-600"}><p key={index+1}>{item?.route}</p></NavLink> )
                        }

                        
                        { (decoded && (decoded === 'VENDOR' || decoded === 'ADMIN'))
                            &&
                            <NavLink onClick={handleDash} className={({isActive}) => isActive ? 'text-blue-900 font-bold' : "text-gray-700"} to="/vendorDashboard"><p>Dashboard</p></NavLink>
                        }
                        <p onClick={() => {
                            localStorage.removeItem('userToken')
                            navigate('/login')
                        }} className="text-gray-700 cursor-pointer">Logout</p>

                        <NavLink onClick={handleDash} className={({isActive}) => isActive ? 'text-blue-900 font-bold' : "text-gray-700"} to="/cart"><p>Cart {allPurcasedProductDataWithId?.data?.length > 0 ? allPurcasedProductDataWithId?.data?.length : ''}</p></NavLink>

                        <p onClick={() => {
                            setDarkMode((prev:any) => !prev)
                        }} className="text-gray-700 cursor-pointer">Brightness </p>
                </div>
                    <ul className="xsm:hidden sm:hidden md:hidden  lg:flex items-center justify-around p-1.5 w-[100%] ">
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

                        <li onClick={() => {
                            setDarkMode((prev:any) => !prev)
                        }} className="text-white cursor-pointer"><i className="uil uil-brightness"></i></li>
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