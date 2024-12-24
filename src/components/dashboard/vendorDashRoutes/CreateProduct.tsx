/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { productInputs } from "./productInput";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "./VendorProfile";
import { useGetVendorDataWithUserId } from "../../../data-middleware/useVendorData";
import { toast } from "react-toastify";
import { usePostProductData } from "../../../data-middleware/usePostProductData";


const CreateProduct = () => {
    const token = localStorage.getItem("userToken");

    let decoded;

    if(token){
        const decoding = jwtDecode<DecodedToken>(token);
        decoded = decoding?.userId
    }

    const {vendorData} = useGetVendorDataWithUserId(decoded as string)

    const findVendorId = vendorData?.data?.vendorId;

    console.log('vendorid:',findVendorId);

    const [imgPreview, setImgPreview] = useState<any>([]);
    const [imgFile, setImgFile] = useState<any>([]);
    const [flash, setFlash] = useState<any>(false);

    const [productInput, setProductInput] = useState<any>({
        productName: '',
        category: '',
        quantity: '',
        discount: '',
        price: '',
        details: ''
    });

    const {postProductData, isPending} = usePostProductData()

    const handleSubmit = (e:any) => {
        e.preventDefault();

        const formData = new FormData();

        if(!findVendorId){
            toast.error('please create vendor profile first')
        }

        const {price, discount, quantity, ...remaining} = productInput
        const newPrice = Number(price)
        const newdiscount = Number(discount)
        const newQantity = Number(quantity);

        const flashSale = flash === 'true' ? true : false;

        const newProduct = {
            ...remaining,
            price: newPrice,
            discount: newdiscount,
            quantity: newQantity,
            vendorId: findVendorId,
            clicked: 0,
            flashSale
        }

        console.log(newProduct);

        formData.append("data", JSON.stringify(newProduct));

        for( const image of imgFile){
            formData.append("images", image)
        }

        postProductData(formData)

    }

    const handleImageChanges = (e:any) => {


        const file = e.target.files![0];

        setImgFile((prev:any) => [...prev, file]);

        if(file){
            const reader = new FileReader();

            reader.onloadend = () => {
                setImgPreview((prev:any) => [...prev, reader.result as string])
            }

            reader.readAsDataURL(file)
        }
    }

    return (
        <div>
            <p className="font-bold">Create Product:</p>
            <hr />
            <br />
            <form action="" onSubmit={handleSubmit}>
                            {
                                productInputs?.map(item => (
                                    <div className="text-sm">
                                        <input className="w-[300px]" type={item?.type} placeholder={item?.placeHolder} onChange={(e) => setProductInput({...productInput, [item?.value] : e.target.value})}/>
                                        <br /><br />
                                    </div>
                                ))
                            }
                            <select className="text-sm" name="" id="" onChange={(e) => setFlash(e.target.value) }>
                                <option value="">Select Flash Sale Option</option>
                                <option value="true">On</option>
                                <option value="false">Off</option>
                            </select>
                            <br /><br />
                            <div className="flex">
                                { imgPreview?.length > 0 &&
                                    imgPreview?.map((preview:any) => (
                                        <img className="w-[100px] h-[100px] mb-2 mr-2" src={preview} alt="" />
                                    ))
                                }
                            </div>
                            <label className=" xtext-sm bg-green-500 font-bold text-white px-2 py-1 cursor-pointer" htmlFor="image">Add Image</label>
                            <input  type="file" name=""  id="image" className='hidden' onChange={(e) => handleImageChanges(e)} />
                            <br /><br />
                            <input className="bg-blue-500 text-white font-bold px-2" type="submit" value={isPending ? 'creating...': 'Submit'} />
                        </form>
        </div>
    );
};

export default CreateProduct;