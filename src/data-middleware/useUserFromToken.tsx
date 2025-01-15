import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../components/dashboard/vendorDashRoutes/VendorProfile';

const useUserFromToken = () => {
   const token = localStorage.getItem('userToken');
    let decoded:string | undefined;
    let userType: string | undefined
    let userName: string | undefined
    let phoneNumber: string | undefined
    if(token){
        const decode = jwtDecode<DecodedToken>(token);
        decoded = decode?.userId
        userType = decode?.userType
        userName = decode?.userName
        phoneNumber = decode?.phoneNumber
    }

    return {decoded, userType, userName, phoneNumber}
};

export default useUserFromToken;