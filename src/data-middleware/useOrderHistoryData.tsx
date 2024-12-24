import { useQuery } from "@tanstack/react-query";
import { fetchGetPurchasedHistoryUsingId } from "../data/fetchProductData";

const useOrderHistoryData = () => {
    const {
        data: orderHistoryData,
        isError,
        isLoading,
        isPending,
        error,
        refetch
      } = useQuery({
        queryKey: ["fetchOrderHisotyDataWithId"],
        queryFn: () => fetchGetPurchasedHistoryUsingId()
      });
    
     
      return { orderHistoryData, isError, isLoading, error, refetch , isPending};
};

export default useOrderHistoryData;