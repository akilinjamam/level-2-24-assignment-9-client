/* eslint-disable @typescript-eslint/no-explicit-any */

const Products = ({allProducts, range, setRange, setCategory, category}: {allProducts:any, range:any, setRange:any, category:any, setCategory: any}) => {
   
    return (
        <div className="w-[1000px] mx-auto my-6 bg-white px-2">
            <p className="text-2xl">All Products</p>
            <br />
            <div className="w-full h-[40px] bg-gray-100 p-2">
                <label className="mr-2" htmlFor="">From:</label>
                <input value={range.from} onChange={(e) => setRange({...range, from:e.target.value})} type="number" className="mr-2"/>
                <label className="mr-2" htmlFor="">To:</label>
                <input value={range.to}  onChange={(e) => setRange({...range, to:e.target.value})} type="number" />
                <input value={category} onChange={(e) => setCategory(e.target.value)} type="text"  className="ml-3 px-1" placeholder="search with category"/>
                <button onClick={() => {
                    setRange({from: '', to: ''})
                    setCategory('')
                }} className="ml-4 bg-gray-300 px-2 rounded font-bold">Cancel</button>
            </div>
            <br />
            <div className="flex flex-wrap">
                {
                   allProducts?.data?.map((product:any) => 
                    <div className="w-[150px] h-[150px] bg-green-200 m-1 flex items-center justify-center relative cursor-pointer">
                   <img className="absolute top-0 w-full h-full" src={product?.images[1]} alt="" />
                   <p className="z-10 bg-gray-400 bg-opacity-50 p-1 font-bold text-green-300">{product?.category}</p>
               </div>
               ) 
                }
            </div>
        </div>
    );
};

export default Products;