import { products } from "../flashSale/flashSaleItems";


const Products = () => {
    return (
        <div className="w-[1000px] mx-auto my-6 bg-white px-2">
            <p className="text-2xl">All Products</p>
            <div className="flex flex-wrap">
                {
                   products?.map(product => <div className="w-[150px] h-[150px] bg-green-200 m-1 flex items-center justify-center">{product?.price}</div> ) 
                }
            </div>
        </div>
    );
};

export default Products;