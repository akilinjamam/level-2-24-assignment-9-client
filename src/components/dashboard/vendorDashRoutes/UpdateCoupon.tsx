/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router";
import useGetProductDataWithFlashId from "../../../data-middleware/useGetProductDataWithId";
import { useEffect, useState } from "react";
import { useUpdateProductData } from "../../../data-middleware/useUpdateProductData";

const UpdateCoupon = () => {

    const { id } = useParams<{ id: string }>();
    const [couponData, setCouponData] = useState<any>({
        couponCode: '',
        couponValue: ''
    });

    const {allProductDataWithId, refetch} = useGetProductDataWithFlashId(id as string);

    const {updateProductData,} = useUpdateProductData(refetch)

    useEffect(() => {
        setCouponData({
            couponCode: allProductDataWithId?.data?.couponCode,
            couponValue: allProductDataWithId?.data?.couponValue
        })
    },[allProductDataWithId])

    console.log(couponData);

    const updateCoupon = (e:any) => {
        e.preventDefault();

        const data = {
            couponCode: couponData?.couponCode,
            couponValue: Number(couponData?.couponValue)
        }

        updateProductData({ id, data })

        console.log(couponData);
    }

    return (
        <div className="text-sm">
            <p className="font-bold">Add Coupon :</p>
            <br />
            <form action="" onSubmit={updateCoupon}>
                <input value={couponData?.couponCode} type="text" placeholder="Coupon Code" onChange={(e:any) => setCouponData({...couponData, couponCode: e.target.value})} required/>
                <br /><br />
                <input value={couponData?.couponValue} type="number" placeholder="Coupon Price" onChange={(e:any) => setCouponData({...couponData, couponValue: e.target.value})} required/>
                <br /><br />
                <input className="bg-blue-500 text-white px-1 font-bold" type="submit" value="Add Coupon" />
            </form>
        </div>
    );
};

export default UpdateCoupon;