/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router";
import { useGetVendorDataWithUserId, useUpdateVendorData, useUpdateVendorImgData } from "../../../data-middleware/useVendorData";
import { useEffect, useState } from "react";
import { vendorProfileInputs } from "./vendorProfileInputs";
import { toast } from "react-toastify";

export interface DecodedToken {
    userId: string;
    userName: string;
    email: string;
    address: string;
    userType: string;
    phoneNumber: string;
  }


const VendorProfile = () => {

    const [edit, setEdit] = useState(false);

    const [imgPreview, setImgPreview] = useState<any>();
    const [imgFile, setImgFile] = useState<any>();

    const [vendorInput, setVendorInput] = useState<any>({
        shopName: '',
        vendorName: '',
        details: '',
    })
    
    const token = localStorage.getItem("userToken") as any;
    
    let decoded;
    if(token){
        const decode = jwtDecode<DecodedToken>(token as string)
        decoded = decode?.userId;
    }else{
        decoded = ''
    }
    const {vendorData, refetch} = useGetVendorDataWithUserId(decoded);

    const vendorInfo = vendorData?.data;
    console.log(vendorInfo?.data);
    const userId = vendorData?.data?.userId;
    const vendorId = vendorData?.data?.vendorId;


    useEffect(() => {
        setVendorInput({
            shopName: vendorInfo?.shopName,
            vendorName: vendorInfo?.vendorName,
            details: vendorInfo?.details
        })
    },[vendorInfo])

    const {updateVendorData} = useUpdateVendorData(refetch)

    const updateData = () => {
        console.log(vendorId);

        const newUpdatedData = {
            id: vendorId,
            data: vendorInput
        }

        updateVendorData(newUpdatedData)

    }

    const handleImgPreview = (e:any) => {
        e.preventDefault();

        const file = e.target.files![0];

        setImgFile(file);

        if(file){
            const reader = new FileReader();

            reader.onloadend = () => {
                setImgPreview(reader.result as string)
            }

            reader.readAsDataURL(file)
        }

    }

    const {updateVendorImgData, isPending} = useUpdateVendorImgData(refetch)

    const handleUpdateImgData = (e:any) => {
        e.preventDefault();
        console.log('hello');

        if(!imgFile){
            toast.error('please select image first')
            return 
        }

        const formData = new FormData();

        formData.append("images", imgFile)

        console.log(imgFile);
        const newData = {
            id: vendorId,
            data: formData
        }

        updateVendorImgData(newData)

    }

console.log(userId);
    return (
        <div className="w-full">
            <div className={`w-full h-[30px] flex items-center ${userId ? 'justify-start' : 'justify-end'}`}>
                { !userId &&
                    <Link to="/vendorDashboard/createVendorProfile">
                        <button className="font-bold text-white bg-blue-500 px-2">+Create Profile</button>
                    </Link>
                }
                {
                    userId &&
                    <p className="font-bold">Vendor Profile :</p>
                }
                
            </div>     
            <hr className="mt-2" /> 
            <br />  
            {
                userId &&
                <div className="flex w-[full]">
                    <div className="w-auto">
                        {
                            imgPreview
                            ?
                            <img className="w-[200px] h-[200px]" src={imgPreview} alt="" />
                            :
                            <img className="w-[200px] h-[200px]" src={vendorInfo?.logo} alt="" />
                        }
                    </div>
                    { !edit &&
                        <div className="w-[70%] px-2 text-sm">
                        <p>Vendor Name :{vendorInfo?.vendorName}</p>
                        <p>Shop Name : {vendorInfo?.shopName}</p>
                        <br />
                        <hr />
                        <p>{vendorInfo?.details}</p>
                    </div>
                    }
                    { edit &&
                        <div className="w-[70%] px-2 text-sm">
                        {
                            vendorProfileInputs?.map(input => (
                                <div>
                                    <input value={vendorInput[input.value]} type={input.type} name="" id="" onChange={(e) => setVendorInput({...vendorInput, [input.value]: e.target.value})}/>
                                    <br /><br />
                                </div>
                            ))
                        }
                    </div>
                    }
                </div>
            }   
            <div className="mt-2">
                <button onClick={() => setEdit(true)} className="bg-blue-500 text-white font-bold px-2 cursor-pointer">Edit</button>    
                { edit &&
                    <button onClick={() => {
                        setEdit(false)
                        setImgPreview('')
                    }} className="bg-red-500 text-white font-bold px-2 cursor-pointer ml-2">Cancel</button> 
                }   
                { edit &&
                    <button onClick={updateData} className="bg-green-500 text-white font-bold px-2 cursor-pointer ml-2">Update</button> 
                }   
                { edit &&
                    <label htmlFor="image" className="bg-yellow-500 text-white font-bold px-2 cursor-pointer ml-2">Change Image</label> 
                }   
                { edit &&
                    <button onClick={handleUpdateImgData} className="bg-yellow-500 text-white font-bold px-2 cursor-pointer ml-2">{isPending ? 'updating...': 'Update Image'}</button> 
                }   
                
                <input id="image" type="file" className="hidden" onChange={handleImgPreview}/>
            </div> 
        </div>
    );
};

export default VendorProfile;