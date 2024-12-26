import { NavLink, Outlet} from "react-router";
import { vendorDashMenu } from "./vendorDashRoutes/vendorDashRoute";
import { useContext } from "react";
import { MyContext } from "../../context/MyContext";
import Modal from "./vendorDashRoutes/Modal";
import { useDeleteProductData } from "../../data-middleware/useDeleteProductData";
import useGetProductData from "../../data-middleware/useProductData";
import useUserFromToken from "../../data-middleware/useUserFromToken";


const VendorDashboard = () => {

    const {open, setOpen, productName, id} = useContext(MyContext)
    const {userType} = useUserFromToken()

    const {refetch} = useGetProductData('', '', '')
    
    const {deleteProductData, isPending, error} = useDeleteProductData(refetch);
    console.log(error);

    const handleDelete = () => {
        deleteProductData(id)
    }
   
    return (
        <div className="w-[1000px] bg-gray-100 h-[500px] mx-auto">
            <div className="w-[100%] h-[30px] bg-green-600 flex items-center justify-center font-bold text-white">
                Dashboard
            </div>
            <div className="w-full h-full bg-gray-100 flex relative">
                <div className="w-[200px] bg-gray-200 px-3">
                    <p className="text-center font-bold">Menu</p>
                    <br />
                    <ul className="text-sm leading-6">
                        {
                            vendorDashMenu?.map((item) => (
                                <NavLink to={item?.link} className={({isActive}) => isActive ? 'text-blue-500 font-bold' : ''}>
                                    <li>.{item?.name}</li>
                                </NavLink>
                            ))
                        }
                        
                        
                        <NavLink style={{display: `${userType === 'VENDOR' ? 'block' : 'none'}`}} to="/vendorDashboard/vendorProfile" className={({isActive}) => isActive ? 'text-blue-500 font-bold' : ''}><li>.profile</li></NavLink>

                        <NavLink style={{display: `${userType === 'ADMIN' ? 'block' : 'none'}`}} to="/vendorDashboard/manageUsers" className={({isActive}) => isActive ? 'text-blue-500 font-bold' : ''}><li>.Manage Users</li></NavLink>
                    </ul>
                </div>
                <div className="w-[800px] bg-gray-100 px-2 py-1 overflow-hidden overflow-y-scroll">
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