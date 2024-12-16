import { ReactNode } from "react";
import Nav from "./navigation/Nav";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({children} : {children: ReactNode}) => {
    return (
        <div>
            <Nav/>
            <ToastContainer/>
            {children}            
        </div>
    );
};

export default Layout;