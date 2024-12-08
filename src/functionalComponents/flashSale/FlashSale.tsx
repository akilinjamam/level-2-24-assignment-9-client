import { useNavigate } from "react-router";
import { products } from "./flashSaleItems";

const FlashSale = () => {
    const navigate = useNavigate();
    return (
        <div className="w-[1000px] mx-auto my-6 bg-white px-2">
            <p className="text-2xl">Flash Sale</p>
            <div className="flex flex-wrap">
                {
                   products?.map((product, index) => <div onClick={() => navigate(`/products/${index+1}`)} className="w-[150px] h-[150px] bg-green-200 m-1 flex items-center justify-center">{product?.price}</div> ) 
                }
            </div>
        </div>
    );
};

export default FlashSale;