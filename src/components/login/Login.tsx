/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { loginInput } from "./loginInputFields";
import useUserPostLoginData from "../../data-middleware/useUserLoginData";

const Login = () => {

    const {loginUserData, isPending} = useUserPostLoginData()

    const [registration, setRegistration] = useState<any>({
        email: '',
        password: '',
       
    })

    const handleSubmit = (e:any) => {
        e.preventDefault();

        console.log(registration);

        loginUserData(registration)
    }


    return (
        <div className="w-[1000px] bg-gray-100 mx-auto h-[400px] px-3 py-1 ">
            <p className="text-2xl font-bold">Login:</p>
            <br />
            <hr />
            <form  onSubmit={handleSubmit}>
                <br />
                {
                    loginInput?.slice(0,4)?.map((input:any) => (
                        <div>
                            <input className="text-sm w-[300px] px-2" type={input.type} placeholder={input.placeHolder} onChange={(e) => setRegistration({...registration, [input.value] : e.target.value})} />
                            <br /><br />
                        </div>
                    ))
                }
                
                <br /><br />
                <input className="w-[300px] bg-blue-500 text-white font-bold cursor-pointer" type="submit" value={`${isPending ? 'loading...' : 'Login'}`} />
            </form>
        </div>
    );
};

export default Login;