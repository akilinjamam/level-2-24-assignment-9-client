import { useQuery } from "@tanstack/react-query";
import { fetchGetAddToCartProductData } from "../data/fetchProductData";

const useGetPurchasedProductDataWithId = (id:string) => {
    const {
        data: allPurcasedProductDataWithId,
        isError,
        isLoading,
        error,
        refetch
      } = useQuery({
        queryKey: ["fetchGetAddToCartProductData"],
        queryFn: () => fetchGetAddToCartProductData(id)
      });
    
     
    
      return { allPurcasedProductDataWithId, isError, isLoading, error, refetch };
};

export default useGetPurchasedProductDataWithId;