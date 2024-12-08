import Products from "../../functionalComponents/allProducts/AllProducts";
import Carousel from "../../functionalComponents/carousel/Carousel";
import Categories from "../../functionalComponents/categories/Categories";
import FlashSale from "../../functionalComponents/flashSale/FlashSale";

const Home = () => {
    return (
        <div className="bg-gray-100">
            <Carousel/>
            <FlashSale/>
            <Categories/>
            <Products/>
        </div>
    );
};

export default Home;