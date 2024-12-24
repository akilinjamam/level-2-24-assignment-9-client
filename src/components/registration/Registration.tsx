/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { registrationInput } from "./inputFields";
import useUserPostData from "../../data-middleware/useUserPostData";

const Registration = () => {

    const {postUserData, isPending} = useUserPostData()

    const [registration, setRegistration] = useState<any>({
        userName: '',
        email: '',
        phoneNumber: '',
        address: '',
        userType: ''
    })

    const handleSubmit = (e:any) => {
        e.preventDefault();

        console.log(registration);

        postUserData(registration)
    }

    return (
        <div className="w-[1000px] bg-gray-100 mx-auto h-auto px-3 py-3 ">
            <p className="text-2xl font-bold">Registration:</p>
            <br />
            <hr />
            <form  onSubmit={handleSubmit}>
                <br />
                {
                    registrationInput?.slice(0,5)?.map((input:any) => (
                        <div>
                            <input className="text-sm w-[300px] px-2" type={input.type} placeholder={input.placeHolder} onChange={(e) => setRegistration({...registration, [input.value] : e.target.value})} />
                            <br /><br />
                        </div>
                    ))
                }
                {
                    registrationInput?.slice(5,6)?.map(select => (
                        <select  className="text-sm w-[300px]" name="" id="" onChange={(e) => setRegistration({...registration, [select.value] : e.target.value})}>
                            <option value="">Select User Type</option>
                            {
                                select.options?.map((option:any, index:number) => {
                                    return (
                                        <option key={index} value={option.value}>{option.name}</option>
                                    )
                                })
                            }
                           
                        </select>
                    ))
                }
                <br /><br />
                <input className="w-[300px] bg-blue-500 text-white font-bold cursor-pointer" type="submit" value={`${isPending ? 'loading...' : 'Registration'}`} />
            </form>
        </div>
    );
};

export default Registration;