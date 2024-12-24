import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../components/dashboard/vendorDashRoutes/VendorProfile';

const useUserFromToken = () => {
   const token = localStorage.getItem('userToken');
    let decoded:string | undefined;
    if(token){
        const decode = jwtDecode<DecodedToken>(token);
        decoded = decode?.userId
    }

    return {decoded}
};

export default useUserFromToken;