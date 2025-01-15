import { useContext } from "react";
import { MyContext } from "../../context/MyContext";
import RecentProduct from "./RecentProduct";


const AllRecentProducts = () => {
    const {darkMode} = useContext(MyContext)
    return (
        <div className={`${darkMode ? 'bg-gray-700' : 'bg-white'} h-[100vh]`}>
            <RecentProduct/>
        </div>
    );
};

export default AllRecentProducts;