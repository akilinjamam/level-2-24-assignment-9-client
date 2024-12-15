import { useQuery } from "@tanstack/react-query";
import { fetchGetProductDataWithFlashSale } from "../data/fetchProductData";


const useGetProductDataWithFlashSale = () => {
    
    const {
        data: allProductDataWithFlashSale,
        isError,
        isLoading,
        error,
      } = useQuery({
        queryKey: ["fetchGetProductDataWithFlashSale"],
        queryFn: () => fetchGetProductDataWithFlashSale()
      });
    
      console.log(allProductDataWithFlashSale)
    
      return { allProductDataWithFlashSale, isError, isLoading, error };
    
   
};

export default useGetProductDataWithFlashSale;