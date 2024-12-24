/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import useGetProductData from "../../data-middleware/useProductData";
import Products from "../../functionalComponents/allProducts/AllProducts";
import Carousel from "../../functionalComponents/carousel/Carousel";
import Categories from "../../functionalComponents/categories/Categories";
import FlashSale from "../../functionalComponents/flashSale/FlashSale";


const Home = () => {
    const [category, setCategory] = useState<any>('');
    const [range, setRange] = useState<any>({
        from: '',
        to: ''
       })
   
   const {allProductData, refetch, isLoading} = useGetProductData(category, range.from, range.to) ;

   useEffect(() => {
    refetch()
   },[range, refetch, category])

  

   console.log(range.from, range.to)

    return (
        <div className="bg-gray-100">
            <Carousel/>
            <FlashSale/>
            <Categories />
            <Products allProducts ={allProductData} range={range} setRange={setRange} category={category} setCategory={setCategory} isLoading={isLoading}/>
        </div>
    );
};

export default Home;