import { ReactNode, useEffect } from "react";
import Nav from "./navigation/Nav";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../components/dashboard/vendorDashRoutes/VendorProfile";

const Layout = ({children} : {children: ReactNode}) => {


    const location = useLocation()?.pathname
    const navigate = useNavigate();
    const token = localStorage.getItem('userToken');
    let decoded:string | undefined;
    if(token){
        const decode = jwtDecode<DecodedToken>(token);
        decoded = decode?.userType
    }
    console.log(decoded);

    useEffect(() => {
        if((!token)){
            if(location === '/vendorDashboard'){
                navigate('/')
            }
        }
        if((decoded === 'USER')){
            if(location === '/vendorDashboard'){
                navigate('/')
            }
        }
    })

    console.log(location);


    return (
        <div>
            <Nav/>
            <ToastContainer/>
            {children}            
        </div>
    );
};

export default Layout;