/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router";
import { DecodedToken } from "../dashboard/vendorDashRoutes/VendorProfile";
import useGetPurchasedProductDataWithId from "../../data-middleware/useGetPurchasedProductDataWithId";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../context/MyContext";
import useDeleteAddtoCartData from "../../data-middleware/useDeleteAddtoCartData";

const Cart = () => {

    const {cartInfo, setCartInfo, setProductName} = useContext(MyContext);
    

  const token = localStorage.getItem("userToken");
  let decoded;
  if (token) {
    const decode = jwtDecode<DecodedToken>(token);
    decoded = decode?.userId;
  }

  const { allPurcasedProductDataWithId, refetch } = useGetPurchasedProductDataWithId(
    decoded as string
  );
  console.log(allPurcasedProductDataWithId?.data);

  // State to manage quantities for each product
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [selectIndex, setSelectIndex] = useState<number>(0);
  const [selectedProductPrice, setSelectedProductPrice] = useState<number>(0);
 
  console.log(selectIndex);
  console.log(selectedProductPrice);

  const handleIncrease = (index: number, productPrice:number) => {
    setQuantities((prev) => ({
      ...prev,
      [index]: (prev[index] || 1) + 1,
    }));
    setSelectedProductPrice(productPrice)
  };

  const handleDecrease = (index: number, productPrice:number) => {
    setQuantities((prev) => ({
      ...prev,
      [index]: prev[index] && prev[index] > 1 ? prev[index] - 1 : 1,
    }));
    setSelectedProductPrice(productPrice)
  };


  useEffect(() => {
    const newPrice = allPurcasedProductDataWithId?.data[selectIndex]?.price;
    const newQuantity = quantities[selectIndex] ? quantities[selectIndex] : 1;
    const newDiscount =  allPurcasedProductDataWithId?.data[selectIndex]?.discount;
    const newProductId =  allPurcasedProductDataWithId?.data[selectIndex]?.productId;
    const newPurchasedProductId =  allPurcasedProductDataWithId?.data[selectIndex]?.purchasedProductId;
    setCartInfo({
        productId: newProductId,
        purchasedProductId: newPurchasedProductId,
        quantity: newQuantity,
        price:newPrice,
        discount:newDiscount
    })
  },[allPurcasedProductDataWithId,selectIndex, quantities,setCartInfo ])

 

  const handleProccedToCheckOut = () => {
    console.log(cartInfo);
    setProductName(allPurcasedProductDataWithId?.data[selectIndex]?.productName)
}

    const {deleteAddToCartData, isPending, error} = useDeleteAddtoCartData(refetch)
    const handleDelete = (prodId:string) => {
        deleteAddToCartData(prodId)
    }
    console.log(error);

  return (
    <div className="w-[100%] bg-white">
      <div className="w-[1000px] mx-auto">
        <br />
        <div className="w-[100%] flex items-start justify-between text-sm">
          <div className="w-[70%] h-auto ">
            {allPurcasedProductDataWithId?.data?.length > 0 ? (
              allPurcasedProductDataWithId?.data?.map(
                (item: any, index: number) => (
                  <div key={item?.productId}>
                    <div onClick={() => {
                        setSelectIndex(index)
                       
                    }} style={{border: `${index === selectIndex ? '1px solid blue': ''}`}} className="w-full h-[200px] bg-gray-100 mb-2 px-2">
                      <div className="flex items-center justify-end mb-2">
                        <i onClick={() => handleDelete(item?.purchasedProductId)}  className={`${!isPending ? 'uil uil-trash-alt cursor-pointer' : 'uil uil-spinner-alt'}`}></i>
                      </div>
                      <hr />
                      <p>Product Name : {item?.productName}</p>
                      <p>Price : {item?.price}</p>
                      <p className="font-bold">Details : {item?.details}</p>
                      <br />
                      <div className="flex items-center justify-between bg-gray-200">
                        <p>Quantity:</p>
                        <p>
                          <i
                            onClick={() => handleDecrease(index, item?.price)}
                            className="uil uil-angle-down cursor-pointer"
                          ></i>{" "}
                          {quantities[index] || 1}{" "}
                          <i
                            onClick={() => handleIncrease(index,item?.price)}
                            className="uil uil-angle-up cursor-pointer"
                          ></i>
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )
            ) : (
              <div className="w-[100%] h-auto ">
                <div className="w-full h-[200px] bg-gray-100 flex items-center justify-center">
                  No Product added to cart yet
                </div>
              </div>
            )}
          </div>
          <div className="w-[29.3%] h-[300px] bg-gray-100 px-2 relative">
            <p className="text-xl font-bold">Order Summary</p>
            <hr />
            <br />
            <div className="flex items-center justify-between">
              <p>Sub-Total : </p>
              <p>${allPurcasedProductDataWithId?.data[selectIndex]?.price}</p>
            </div>
            <br />
            <div className="flex items-center justify-between">
              <p>Quantity : </p>
              <p>${quantities[selectIndex] ? quantities[selectIndex] : 1}</p>
            </div>
            <br />
            <div className="flex items-center justify-between">
              <p>Discount : </p>
              <p>${allPurcasedProductDataWithId?.data[selectIndex]?.discount}</p>
            </div>
            <hr />
            <br />
            <div className="flex items-center justify-between">
              <p>Total : </p>
                {   allPurcasedProductDataWithId?.data?.length > 0
                    &&
                     <p>${(quantities[selectIndex] ? quantities[selectIndex] : 1) * (allPurcasedProductDataWithId?.data[selectIndex]?.price) - (allPurcasedProductDataWithId?.data[selectIndex]?.discount) }</p>
                }
            </div>
            <Link to="/checkout">
              <button onClick={handleProccedToCheckOut} className="w-[95%] bg-blue-400 text-white font-bold absolute bottom-1">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
