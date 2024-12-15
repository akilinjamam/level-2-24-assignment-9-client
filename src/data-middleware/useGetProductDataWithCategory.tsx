import { useQuery } from "@tanstack/react-query";
import { fetchGetProductDataWithCategory } from "../data/fetchProductData";

 const useGetProductDataWithCategory = () => {
    const {
      data: allProductDataWithCategory,
      isError,
      isLoading,
      error,
    } = useQuery({
      queryKey: ["fetchGetProductDataWithCategory"],
      queryFn: () => fetchGetProductDataWithCategory()
    });
  
    console.log(allProductDataWithCategory)
  
    return { allProductDataWithCategory, isError, isLoading, error };
  };


  export default useGetProductDataWithCategory