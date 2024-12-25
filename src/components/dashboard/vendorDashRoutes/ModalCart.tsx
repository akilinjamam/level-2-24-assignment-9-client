import { useState } from "react";
import usePostReplaceProductData from "../../../data-middleware/usePostReplaceProductData";
import { useNavigate } from "react-router";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ModalCart = ({setOpen, cartInfo} : {setOpen: any, cartInfo:any}) => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState<string>('')
    const {replaceToCartData} = usePostReplaceProductData()
    
    const handleSelection = () => {
        
        if(selected === '1'){
            replaceToCartData(cartInfo)
        }else{
            setOpen(false)
            navigate('/cart')
        }
        setOpen(false)
    }
    return (
        <div className="w-[400px] h-[200px] bg-white relative flex items-center justify-center">
            <select name="" id="" className="bg-gray-200" onChange={(e) => setSelected(e.target.value)}>
                <option value="">Select Option</option>
                <option value="1">Replace the cart with the new product(s).</option>
                <option value="2">Retain the current cart and cancel the addition.</option>
            </select>
            <div  className="absolute bottom-0 w-full h-[40px] bg-gray-100 flex items-center justify-around">
                    <button onClick={handleSelection}  className="text-white bg-green-500 font-bold px-2">Ok</button>
                    <button onClick={() => setOpen(false)}  className="text-white bg-red-500 font-bold px-2">Cancel</button>
            </div>
        </div>
    );
};

export default ModalCart;