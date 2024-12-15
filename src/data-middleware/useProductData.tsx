import { useQuery } from "@tanstack/react-query";
import { fetchGetProductData} from "../data/fetchProductData";

 const useGetProductData = (category: string, from: string, to:string) => {
  const {
    data: allProductData,
    isError,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["fetchGetProductData"],
    queryFn: () => fetchGetProductData(category, from , to)
  });

  console.log(allProductData)

  return { allProductData, isError, isLoading, error, refetch };
};

export default useGetProductData



