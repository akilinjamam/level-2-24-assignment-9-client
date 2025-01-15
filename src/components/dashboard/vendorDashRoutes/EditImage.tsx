/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router";
import useGetProductDataWithFlashId from "../../../data-middleware/useGetProductDataWithId";
import { useState } from "react";
import { useUpdateProductImgData } from "../../../data-middleware/useUpdateProductImgData";

const EditImage = () => {

    const {id} = useParams();

    const [imgPreview, setImgPreview] = useState<any>([])
    const [imgFile, setImgFile] = useState<any>([])

    const [selectImg, setSelectImg] = useState(0);
   

    const {allProductDataWithId, refetch} = useGetProductDataWithFlashId(id as string);
    
    console.log(allProductDataWithId?.data);

    const changeImg = (e:any) => {
        
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

    const {updateProductImgData} = useUpdateProductImgData(refetch, id as string)

    const updateImage = (e:any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("images", imgFile);
        const data = {
            indexId: selectImg
        };
        formData.append("data", JSON.stringify(data));

        updateProductImgData(formData)
    }
    return (
        <div>
           <p className="font-bold">Edit Images : {id}</p>
           <hr />
           <br />
           <div>
                { imgPreview?.length > 0
                &&
                    <img  className="w-[200px] h-[200px]" src={imgPreview} alt="" />
                }
           </div>
           <br />
           <div className="flex flex-wrap">
                {
                    allProductDataWithId?.data?.images?.map((image:any, index:number) => <img className="w-[200px] h-[200px] cursor-pointer" style={{border: `${index === selectImg ? '1px solid blue' : 'none'}`}} src={image} alt="" onClick={() => setSelectImg(index)}/> )
                }
           </div>
           <br />
           <div>
                <label htmlFor="img" className="bg-green-500 px-2 font-bold cursor-pointer text-white ml-2 ">Change Image</label>
                <button onClick={updateImage} className="bg-green-500 px-2 font-bold text-white ml-2">Update Image</button>
                <br />
                <input type="file" name="" id="img" className="hidden" onChange={changeImg}/>
           </div>
        </div>
    );
};

export default EditImage;