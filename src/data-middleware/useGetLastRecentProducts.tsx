import { useQuery } from "@tanstack/react-query";
import { fetchGetLastProducts } from "../data/fetchProductData";

 const useGetLastRecentProducts = () => {
    const {
      data: recentProducts,
      isError,
      isLoading,
      error,
    } = useQuery({
      queryKey: ["fetchGetLastRecentProducts"],
      queryFn: () => fetchGetLastProducts()
    });
  
    return { recentProducts, isError, isLoading, error };
  };


  export default useGetLastRecentProducts