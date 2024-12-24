/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { resetPasswordInput } from "./loginInputFields";
import { toast } from "react-toastify";
import { useLocation } from "react-router";
import useRecoveryPassword from "../../data-middleware/useRecoveryPassword";


const RecoveryPassword = () => {

    const location = useLocation();

  // Extract the query parameters from the URL
  const searchParams = new URLSearchParams(location.search);
  const userToken = searchParams.get("userToken");

  console.log(userToken);

    const {resetPassword, isPending:isResetPassPending} = useRecoveryPassword()
   

    const [registration, setRegistration] = useState<any>({
        email: '',
        password: '',
    })

    const handleSubmit = (e:any) => {
        e.preventDefault();

        if(!registration.email){
            toast.error('please provide email')
            return 
        }
        if(!registration.password){
            toast.error('please provide password')
            return 
        }

        resetPassword({
            token: userToken,
            data: registration
        })
    }


    return (
        <div className="w-[1000px] bg-gray-100 mx-auto h-[400px] px-3 py-1 ">
                    <p className="text-2xl font-bold">Reset Password:</p>
                    <br />
                    <hr />
                    <form  onSubmit={handleSubmit}>
                        <br />
                        {
                            resetPasswordInput?.slice(0,4)?.map((input:any) => (
                                <div>
                                    <input className="text-sm w-[300px] px-2" type={input.type} placeholder={input.placeHolder} onChange={(e) => setRegistration({...registration, [input.value] : e.target.value})} />
                                    <br /><br />
                                </div>
                            ))
                        }
                        
                        <br /><br />
                        <input className="w-[300px] bg-blue-500 text-white font-bold cursor-pointer" type="submit" value={`${isResetPassPending ? 'loading...' : 'Reset Password'}`} />
                        <br />
                        
                    </form>
                </div>
    );
};

export default RecoveryPassword;