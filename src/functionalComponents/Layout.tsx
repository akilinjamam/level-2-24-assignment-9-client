import { ReactNode } from "react";
import Nav from "./navigation/Nav";

const Layout = ({children} : {children: ReactNode}) => {
    return (
        <div>
            <Nav/>
            {children}            
        </div>
    );
};

export default Layout;