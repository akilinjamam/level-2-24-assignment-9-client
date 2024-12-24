import { useState } from "react";
import { changlePasswordInput,} from "./loginInputFields";
import useChangePassword from "../../data-middleware/useChangePassword";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ChangePassword = () => {
    const {changlePassword, isPending:isChangePassPending} = useChangePassword()
   

    const [registration, setRegistration] = useState<any>({
        oldPassword: '',
        newPassword: '',
    })

    const handleSubmit = (e:any) => {
        e.preventDefault();

        changlePassword(registration)
    }


    return (
        <div className="w-[1000px] bg-gray-100 mx-auto h-[400px] px-3 py-1 ">
                    <p className="text-2xl font-bold">Change Password:</p>
                    <br />
                    <hr />
                    <form  onSubmit={handleSubmit}>
                        <br />
                        {
                            changlePasswordInput?.slice(0,4)?.map((input:any) => (
                                <div>
                                    <input className="text-sm w-[300px] px-2" type={input.type} placeholder={input.placeHolder} onChange={(e) => setRegistration({...registration, [input.value] : e.target.value})} />
                                    <br /><br />
                                </div>
                            ))
                        }
                        
                        <br /><br />
                        <input className="w-[300px] bg-blue-500 text-white font-bold cursor-pointer" type="submit" value={`${isChangePassPending ? 'loading...' : 'Change Password'}`} />
                        <br />
                        
                    </form>
                </div>
    );
};

export default ChangePassword;