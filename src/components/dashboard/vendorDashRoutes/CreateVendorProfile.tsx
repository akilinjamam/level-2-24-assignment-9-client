/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState } from "react";
import { vendorProfileInputs } from "./vendorProfileInputs";
import { usePostVendorData } from "../../../data-middleware/useVendorData";

const CreateVendorProfile = () => {

    const [imgPreview, setImgPreview] = useState<any>();
    const [imgFile, setImgFile] = useState<any>();

    const [vendorInput, setVendorInput] = useState({
        shopName: '',
        vendorName: '',
        details: '',
    })

    const {postVendorData} = usePostVendorData()

    const handleSubmit = (e:any) => {
        e.preventDefault();
        console.log(vendorInput);

        const formData = new FormData();

        formData.append("images", imgFile)
        formData.append("data", JSON.stringify(vendorInput))

        console.log(imgFile);

        postVendorData(formData)


    }


    const handleImageChanges = (e: ChangeEvent<HTMLInputElement>) => {
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

    return (
        <div>
            <p className="font-bold">Create Profile :</p>
            <hr />
            <br />
            <form action="" onSubmit={handleSubmit}>
                {
                    vendorProfileInputs?.map(item => (
                        <div className="text-sm">
                            <input className="w-[300px]" type={item?.type} placeholder={item?.placeHolder} onChange={(e) => setVendorInput({...vendorInput, [item?.value] : e.target.value})}/>
                            <br /><br />
                        </div>
                    ))
                }
                { imgPreview &&
                    <img className="w-[100px] h-[100px] mb-2" src={imgPreview} alt="" />
                }
                <label className=" xtext-sm bg-green-500 font-bold text-white px-2 py-1 cursor-pointer" htmlFor="image">Add Image</label>
                <input  type="file" name=""  id="image" className='hidden' onChange={(e) => handleImageChanges(e)} />
                <br /><br />
                <input className="bg-blue-500 text-white font-bold px-2" type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default CreateVendorProfile;