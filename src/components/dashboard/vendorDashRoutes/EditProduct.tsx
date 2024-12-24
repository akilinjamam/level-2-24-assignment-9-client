/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router";
import { productInputs } from "./productInput";
import { useEffect, useState } from "react";
import useGetProductDataWithFlashId from "../../../data-middleware/useGetProductDataWithId";
import { useUpdateProductData } from "../../../data-middleware/useUpdateProductData";

const EditProduct = () => {

    const [flashSale, setFlashSale] = useState<any>(false);
    const {id} = useParams();
    const {allProductDataWithId, refetch} = useGetProductDataWithFlashId(id as string)
    const productData = allProductDataWithId?.data;

    const [productInput, setProductInput] = useState<any>({
        productName: '',
        category: '',
        quantity: '',
        discount: '',
        price: '',
        details: ''
    });

    useEffect(() => {
        setProductInput({
        productName: productData?.productName,
        category: productData?.category,
        quantity: productData?.quantity,
        discount: productData?.discount,
        price: productData?.price,
        details: productData?.details
        })
        setFlashSale(productData?.flashSale)
    }, [productData])

    const {updateProductData, isPending} = useUpdateProductData(refetch)

    const updateData = (e:any) => {
        e.preventDefault();

        const newFlashSale = flashSale === 'true' ? true : false;

        const {quantity, price, discount, productName, category, details} = productInput;
      
        const newQuantity = Number(quantity)
        const newPrice = Number(price)
        const newDiscount = Number(discount)

        const newData = {
            id: id,
            data: {
                productName,
                category,
                quantity: newQuantity,
                price: newPrice,
                discount: newDiscount,
                details,
                flashSale: newFlashSale
            }
        }

        console.log(newData);

        updateProductData(newData)

    }


    return (
        <div>
           <p className="font-bold">Edit Product: {id}</p>
           <hr />
           <br />
           <div>
            <form action="">

                {
                    productInputs?.map(item => (
                        <div className="text-sm">
                            <input value={productInput?.[item?.value]} className="w-[300px]" type={item?.type} placeholder={item?.placeHolder} onChange={(e) => setProductInput({...productInput, [item?.value] : e.target.value})}/>
                            <br /><br />
                            
                        </div>
                    ))
                }
                <label htmlFor="">Flash Sale :</label>
                <select value={flashSale} className="text-sm" name="" id="" onChange={(e:any) => setFlashSale(e.target.value)}>
                    <option value="">Select Flash Sales</option>
                    <option value="true">On</option>
                    <option value="false">Off</option>
                </select>
                <br /><br />
                <button onClick={updateData} className="font-bold bg-green-500 px-2 text-white">
                    {isPending ? 'updating...': 'update'}
                </button>

            </form>
           </div>

        </div>
    );
};

export default EditProduct;