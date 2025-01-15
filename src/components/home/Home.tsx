/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import useGetProductData from "../../data-middleware/useProductData";
import Products from "../../functionalComponents/allProducts/AllProducts";
import Carousel from "../../functionalComponents/carousel/Carousel";
import Categories from "../../functionalComponents/categories/Categories";
import FlashSale from "../../functionalComponents/flashSale/FlashSale";
import Footer from "../Footer/Footer";
import RecentProduct from "../recentProduct/RecentProduct";
import AllVendors from "../AllVendors/AllVendors";
import { MyContext } from "../../context/MyContext";


const Home = () => {
    const {darkMode} = useContext(MyContext)
    const [category, setCategory] = useState<any>('');

    const [addCount, setAddCount] = useState<number>(12)
    console.log(addCount);
    const [range, setRange] = useState<any>({
        from: '',
        to: ''
       })
   
   const {allProductData, refetch, isLoading} = useGetProductData(category, range.from, range.to) ;

   useEffect(() => {
    refetch()
   },[range, refetch, category])


//    const limitedData = allProductData?.data?.slice(0,addCount);

   const showData = allProductData?.data;
   
   const handleInfinitScroll = async () => {
    console.log("scrollHeight" + document.documentElement.scrollHeight);
    console.log("innerHeight" + window.innerHeight);
    console.log("scrollTop" + document.documentElement.scrollTop);

    const scrollHeight = document.documentElement.scrollHeight
    const scrollTop = document.documentElement.scrollTop
    const innerHeight = window.innerHeight

    if(scrollHeight === (scrollTop + innerHeight)){
        setAddCount((prev) => prev + 12)
    }

};

useEffect(() => {
    window.addEventListener("scroll", handleInfinitScroll)
    return () => {
        window.removeEventListener("scroll", handleInfinitScroll)
    }
})


const scrollTop = () => {

    document.documentElement.scrollTop = 0
}

    return (
        <div  className={`w-full ${darkMode && 'bg-gray-800 text-white'}`}>
            <div onClick={scrollTop} className="z-40 w-[50px] h-[50px] rounded-full bg-blue-500 flex items-center justify-center fixed bottom-10 right-10 cursor-pointer"><i className="uil uil-arrow-up text-white font-bold text-3xl"></i></div>
            <Carousel/>
            <FlashSale/>
            <Categories />
            <Products refetch={refetch} allProducts ={showData} range={range} setRange={setRange} category={category} setCategory={setCategory} isLoading={isLoading}/>
            <RecentProduct/>
            <AllVendors/>
            <Footer/>
        </div>
    );
};

export default Home;