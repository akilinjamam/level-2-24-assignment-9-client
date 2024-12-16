import { Link } from "react-router";


const VendorProfile = () => {
    return (
        <div className="w-full">
            <div className="w-full h-[30px] flex items-center justify-end">
                <Link to="/vendorDashboard/createVendorProfile">
                    <button className="font-bold text-white bg-blue-500 px-2">+Create Profile</button>
                </Link>
            </div>     
            <hr className="mt-2" />       
        </div>
    );
};

export default VendorProfile;