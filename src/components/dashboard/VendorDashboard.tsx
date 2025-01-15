import { NavLink, Outlet, useNavigate} from "react-router";
import { vendorDashMenu } from "./vendorDashRoutes/vendorDashRoute";
import { useContext, useState } from "react";
import { MyContext } from "../../context/MyContext";
import Modal from "./vendorDashRoutes/Modal";
import { useDeleteProductData } from "../../data-middleware/useDeleteProductData";
import useGetProductData from "../../data-middleware/useProductData";
import useUserFromToken from "../../data-middleware/useUserFromToken";


const VendorDashboard = () => {

    const navigate = useNavigate();
    const {userName} = useUserFromToken()
    const [disappear, setDisappear] = useState(true)
    const {open, setOpen, productName, id} = useContext(MyContext);
    const [view, setview ] = useState(false)
    const {userType} = useUserFromToken()

    const {refetch} = useGetProductData('', '', '')
    
    const {deleteProductData, isPending, error} = useDeleteProductData(refetch);
    console.log(error);

    const handleDelete = () => {
        deleteProductData(id)
    }
   
    return (
        <div className="lg:w-[1000px] md:w-[70%] sm:w-full xsm:w-full bg-gray-100 h-[500px] mx-auto">
            <div className="w-[100%] h-[30px] bg-green-600 flex items-center justify-center font-bold text-white relative">
                Dashboard
                <i onClick={() => setDisappear(!disappear)} className="uil uil-bars sm:absolute xsm:absolute right-3 top-1 cursor-pointer lg:hidden md:hidden"></i>
                <div className={`absolute right-0 top-8 bg-white w-[250px] h-[300px] z-10 px-2 ${disappear ? 'hidden' : 'block'}`}>
                <ul className="text-sm leading-6 px-1">
                        {
                            vendorDashMenu?.map((item) => (
                                <NavLink to={item?.link} className={({isActive}) => isActive ? 'text-blue-500 font-bold' : 'text-gray-600'}>
                                    <li><i className={item?.icon}></i> {item?.name}</li>
                                </NavLink>
                            ))
                        }
                        
                        <NavLink style={{display: `${userType === 'ADMIN' ? 'block' : 'none'}`}} to="/vendorDashboard/manageUsers" className={({isActive}) => isActive ? 'text-blue-500 font-bold' : ''}><li><i className="uil uil-user-circle"></i> Manage Users</li></NavLink>

                        <div className="flex items-center justify-between relative">
                            <i className="uil uil-book-reader"></i>
                            <div onClick={() => setview(!view)} className="w-[150px] bg-blue-500 h-[20px] px-2 flex items-center justify-between  cursor-pointer">
                                <p className="text-white text-xs">User Option</p>
                                <i className="uil uil-angle-down text-white"></i>
                            </div>
                            
                        </div>
                        <div className={`${view ? 'block' : 'hidden'}`}>
                            <div className="flex items-center justify-end" >
                                <p onClick={() => navigate('/vendorDashboard/vendorProfile')} style={{display: `${userType === 'VENDOR' ? 'block' : 'none'}`}} className="w-[150px] bg-blue-500 h-[20px] px-2 flex items-center justify-between  cursor-pointer text-white mb-[2px] hover:bg-blue-950 ">profile</p>
                            </div>
                            <div className="flex items-center justify-end" >
                                <p onClick={() => {
                                    localStorage.removeItem('userToken')
                                    navigate('/login')
                                }} className="w-[150px] bg-blue-500 h-[20px] px-2 flex items-center justify-between  cursor-pointer text-white hover:bg-blue-950">Logout</p>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
            <div className="w-full h-full bg-gray-100 flex relative">
                <div className="w-[200px] lg:block md:hidden sm:hidden xsm:hidden  bg-gray-200 ">
                    <p className="text-sm w-full text-center bg-gray-400 py-2 font-bold ">{userName}</p>
                    <hr />
                    <p className="text-center font-bold">Menu</p>
                    <br />
                    <ul className="text-sm leading-6 px-4">
                        {
                            vendorDashMenu?.map((item) => (
                                <NavLink to={item?.link} className={({isActive}) => isActive ? 'text-blue-500 font-bold' : ''}>
                                    <li><i className={item?.icon}></i> {item?.name}</li>
                                </NavLink>
                            ))
                        }
                        
                        <NavLink style={{display: `${userType === 'ADMIN' ? 'block' : 'none'}`}} to="/vendorDashboard/manageUsers" className={({isActive}) => isActive ? 'text-blue-500 font-bold' : ''}><li><i className="uil uil-user-circle"></i> Manage Users</li></NavLink>

                        <div className="flex items-center justify-between relative">
                            <i className="uil uil-book-reader"></i>
                            <div onClick={() => setview(!view)} className="w-[150px] bg-blue-500 h-[20px] px-2 flex items-center justify-between  cursor-pointer">
                                <p className="text-white text-xs">User Option</p>
                                <i className="uil uil-angle-down text-white"></i>
                            </div>
                            
                        </div>
                        <div className={`${view ? 'block' : 'hidden'}`}>
                            <div className="flex items-center justify-end" >
                                <p onClick={() => navigate('/vendorDashboard/vendorProfile')} style={{display: `${userType === 'VENDOR' ? 'block' : 'none'}`}} className="w-[150px] bg-blue-500 h-[20px] px-2 flex items-center justify-between  cursor-pointer text-white mb-[2px] hover:bg-blue-950 ">profile</p>
                            </div>
                            <div className="flex items-center justify-end" >
                                <p onClick={() => {
                                    localStorage.removeItem('userToken')
                                    navigate('/login')
                                }} className="w-[150px] bg-blue-500 h-[20px] px-2 flex items-center justify-between  cursor-pointer text-white hover:bg-blue-950">Logout</p>
                            </div>
                        </div>
                    </ul>
                </div>
                <div className="lg:w-[800px] md:w-[70%] sm:w-full xsm:w-full bg-gray-100 px-2 py-1 overflow-hidden overflow-y-scroll">
                    <Outlet/>
                </div>
                 <div className={`absolute w-full h-[500px] bg-black bg-opacity-50 flex items-center justify-center ${open ? 'block' : 'hidden'}`}>
                        <Modal productName={productName} setOpen={setOpen} deleteData={handleDelete} pending={isPending} />
                </div>
            </div>
        </div>
    );
};

export default VendorDashboard;