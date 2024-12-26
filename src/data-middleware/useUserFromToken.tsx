import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../components/dashboard/vendorDashRoutes/VendorProfile';

const useUserFromToken = () => {
   const token = localStorage.getItem('userToken');
    let decoded:string | undefined;
    let userType: string | undefined
    if(token){
        const decode = jwtDecode<DecodedToken>(token);
        decoded = decode?.userId
        userType = decode?.userType
    }

    return {decoded, userType}
};

export default useUserFromToken;