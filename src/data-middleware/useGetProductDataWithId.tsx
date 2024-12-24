import { useQuery } from "@tanstack/react-query";
import { fetchGetProductDataWithId } from "../data/fetchProductData";


const useGetProductDataWithFlashId = (id:string) => {
    
    const {
        data: allProductDataWithId,
        isError,
        isLoading,
        error,
        refetch
      } = useQuery({
        queryKey: ["fetchGetProductDataWithId"],
        queryFn: () => fetchGetProductDataWithId(id)
      });
    
     
    
      return { allProductDataWithId, isError, isLoading, error, refetch };
    
   
};

export default useGetProductDataWithFlashId;