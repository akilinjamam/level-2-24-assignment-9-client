import { useEffect, useState } from "react";
import useGetProductData from "../../../data-middleware/useProductData";
import { useGetVendorDataWithUserId } from "../../../data-middleware/useVendorData";
import useUserFromToken from "../../../data-middleware/useUserFromToken";

import {Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend} from 'chart.js'

import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels'

/* eslint-disable @typescript-eslint/no-explicit-any */
const Overview = () => {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        BarElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        ChartDataLabels
      );


     



    // calculation and fetcing data
    const {decoded, userType} = useUserFromToken()
    
    const [mainData, setMainData] = useState<any>([]);

    const {vendorData} = useGetVendorDataWithUserId(decoded as string);
    const getVendorId = vendorData?.data?.vendorId;

    console.log(getVendorId);

    const {allProductData} = useGetProductData('', '', '')
    
    const vendorWithVendorId = allProductData?.data?.filter((f:any) => f?.vendorId === getVendorId)
    
    console.log('vendor-products', vendorWithVendorId);

    const vendorsProductData = vendorWithVendorId;
    console.log(vendorsProductData);

   
    useEffect(() => {
        if (userType === "ADMIN") {
          setMainData(allProductData?.data || []);
        } else if (userType === "VENDOR" && getVendorId) {
          const vendorProducts = allProductData?.data?.filter(
            (f: any) => f?.vendorId === getVendorId
          );
          setMainData(vendorProducts || []);
        }
      }, [userType, allProductData, getVendorId]);

      console.log(mainData?.map((item:any) => item?.category
      ));

      const allCategory = mainData?.map((item:any) => item?.category)

      const countMap = allCategory?.reduce((acc:any, item:any) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
      }, {});
      
      // Map the original array to their counts
      const countArray = Object?.values(countMap) || []
      
      console.log(countMap);


      const uniqueArray = [...new Set(allCategory)];
      

    console.log(uniqueArray);




    const data = {
        labels: uniqueArray,
        datasets: [
          {
            label: 'Category wise products',
            data: countArray,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)', 
                'rgba(255, 159, 64, 0.7)', 
                'rgba(153, 102, 255, 0.7)',
                'rgba(253, 102, 255, 0.7)',
                'rgba(753, 102, 255, 0.7)',
            ],
            fill: true,
          },
        ],
      };

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: "Category wise products",
          },
          
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };


    return (
        <div>
            <Bar style={{width:'100%'}} data={data} options={options} />
        </div>
    );
};

export default Overview;