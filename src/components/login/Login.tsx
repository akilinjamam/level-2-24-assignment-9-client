/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
import { loginInput } from "./loginInputFields";
import useUserPostLoginData from "../../data-middleware/useUserLoginData";
import { Link } from "react-router";
import useResetPassword from "../../data-middleware/useResetPassword";
import { toast } from "react-toastify";
import { MyContext } from "../../context/MyContext";

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

    const {resetPassword} = useResetPassword()
    const handleSendEmail = () => {

        if(!registration.email){
            toast.error('please type email')
            return
        }

        resetPassword({email: registration.email})
    }

    const handleDemoUser = (userType:string) => { 
        if(userType ==='user'){
            setRegistration({
                email: 'testuser@gmail.com',
                password: '1234',
            })
        }
        if(userType ==='vendor'){
            setRegistration({
                email: 'testvendor@gmail.com',
                password: '1234',
            })
        }
        if(userType ==='admin'){
            setRegistration({
                email: 'admin@gmail.com',
                password: '1234',
            })
        }
     }

    const handleRemove = () => { 
        setRegistration({
            email: '',
            password: '',
        })
     }

     const {darkMode} = useContext(MyContext)

    return (
       <div className={`${darkMode ? 'bg-gray-700' : 'bg-white'} h-[100vh]`}>
            <div className="lg:w-[1000px] md:w-[70%] sm:w-full xsm:w-full bg-gray-100 mx-auto h-[400px] px-3 py-1 ">
            <p className="text-2xl font-bold">Login:</p>
            <div>
                <br />
                <button onClick={() => handleDemoUser('user')} className="bg-blue-500 text-white font-bold px-2 py-1 mr-2 text-sm cursor-pointer" >Demo User Login</button>
                <button onClick={() => handleDemoUser('vendor')} className="bg-blue-500 text-white font-bold px-2 py-1 mr-2 text-sm cursor-pointer" >Demo Vendor Login</button>
                <button onClick={() => handleDemoUser('admin')} className="bg-blue-500 text-white font-bold px-2 py-1 text-sm cursor-pointer mr-2" >Demo Admin Login</button>
                <button onClick={handleRemove} className="bg-red-500 text-white font-bold px-2 py-1 text-sm cursor-pointer" >Remove</button>
            </div>
            <br />
            <hr />
            <form  onSubmit={handleSubmit}>
                <br />
                {
                    loginInput?.slice(0,4)?.map((input:any) => (
                        <div>
                            <input value={registration[input.value]} className="text-sm w-[300px] px-2" type={input.type} placeholder={input.placeHolder} onChange={(e) => setRegistration({...registration, [input.value] : e.target.value})} />
                            <br /><br />
                        </div>
                    ))
                }
                
                <br /><br />
                <input className="w-[300px] bg-blue-500 text-white font-bold cursor-pointer" type="submit" value={`${isPending ? 'loading...' : 'Login'}`} />
                <br />
                <div className="w-[300px] flex items-center justify-between text-sm text-blue-500">
                    <Link to="/change-password"><p className="cursor-pointer">Change Password</p></Link>
                    <p onClick={handleSendEmail} className="cursor-pointer">Reset Password</p>
                </div>
            </form>
            </div>
       </div>
    );
};

export default Login;