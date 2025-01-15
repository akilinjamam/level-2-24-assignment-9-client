

import footer from './Footer.module.css';
import { NavLink } from "react-router-dom";

import { navroutes } from "../../functionalComponents/navigation/navroute";
import { socialIcons } from './socialIcon';
import { useContext } from 'react';
import { MyContext } from '../../context/MyContext';

const Footer = () => {
    const {darkMode} = useContext(MyContext)
    const date = new Date();
    return (
        <div className="lg:w-[1000px] md:w-[70%] sm:w-full xsm:w-full mx-auto lg:h-auto bg-orange-500 rounded-lg my-6">
            <div style={{borderRadius:'10px 10px 0 0'}} className={`${footer.main} w-full lg:h-[200px] sm:h-auto xsm:h-auto  bg-gray-200 p-3 flex justify-between items-center my-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} `}>
            <section className="lg:w-[350px]  xsm:w-[50%] sm:w-[50%] lg:h-full xsm:h-auto sm:h-auto">
                <p className="font-bold text-xl mb-3">All Navigations:</p>
                {
                    navroutes?.slice(0,5).map(nav => {
                        return (
                            <NavLink to={nav.link}><p className="leading-7 cursor-pointer">{nav.route}</p></NavLink>
                        )
                    })
                }
            </section>            
            <section className="w-[350px]  xsm:w-[50%] sm:w-[50%] lg:h-full xsm:h-auto sm:h-auto ">
                <p className="font-bold text-xl mb-3">Contact Info:</p>
                {
                    navroutes?.slice(2,4).map((nav, index) => {
                        return (
                            <NavLink key={index+1} to={nav.link}><p className="leading-7 cursor-pointer">{nav.route}</p></NavLink>
                        )
                    })
                }
            </section>            
            <section className="lg:w-[350px] lg:h-full sm:w-full xsm:w-full xsm:h-auto sm:h-auto xsm:my-6">
                {
                    socialIcons.map((icon, index) => {
                        return (
                            <span  key={index+1} className="mr-8 text-2xl">{icon.icon}</span>
                        )
                    })
                }
                <br />
                <br />
                <div className="text-sm font-semibold">
                    <p>Email : FarahShop223@gmail.com</p>
                    <p>Phone No: : +801-33452365</p>
                    <p>Office Address : Kolpolok, Road-2, Block-C/Line-3, BridgeCom-Tower, Kalamial Bazar, Chittagong, Bangladesh</p>
                </div>
            </section>            
            </div>
            <div className="text-center">
                <p className="text-sm font-semibold">&copy; All Rights reserved by Farah Shop</p>
                <p className="pb-3 text-sm font-semibold">{date.getFullYear()}</p>
            </div>
        </div>
    );
};

export default Footer;