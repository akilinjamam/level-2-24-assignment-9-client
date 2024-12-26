/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useDeleteUserData, useGetallUserData, useUpdateUserData } from '../../../data-middleware/useUserManageData';

const ManageUsers: React.FC = () => {

    const {getAllUserData, refetch} = useGetallUserData()
    console.log(getAllUserData);

    const getAllUsers = getAllUserData?.data?.filter((f:any) => f?.userType === 'USER');
    const getAllVendors = getAllUserData?.data?.filter((f:any) => f?.userType === 'VENDOR');


    const {deleteUserData} = useDeleteUserData(refetch);
    const {updateUserData} = useUpdateUserData(refetch)

    const handleSuspendUser = (id:string) => {
        deleteUserData(id)
    }

    const handleBlacklist = (id:string) => {
        updateUserData(id)
    }

    return (
        <div className='text-sm'>
            <h1 className='font-bold'>Manage Users:</h1>
            <hr />
            <br />
            {
                getAllUsers?.map((user:any) => {
                    return (
                    <div className='bg-gray-200 p-2 flex items-center justify-between mb-2'>
                        <p className='w-[150px]'>{user?.userName}</p>
                        <p className='w-[150px]'>{user?.email}</p>
                        <p className='w-[150px]'>{user?.phoneNumber}</p>
                        <p className='w-[150px]'>{user?.userType}</p>
                        <p onClick={() => handleSuspendUser(user?.userId)} className='bg-red-500 text-white font-bold px-1 cursor-pointer'>{user?.suspend ? 'Remove-Suspend' : 'Suspend User'}</p>
                    </div>)
                })
            }
            <br />
            <p>This is the Manage Users component.</p>
            <br />
            <h1 className='font-bold'>Manage Vendors:</h1>
            <hr />
            <br />
            {
                getAllVendors?.map((user:any) => {
                    return (
                    <div className='bg-gray-200 p-2 flex items-center justify-between mb-2'>
                        <p className='w-[130px]'>{user?.userName}</p>
                        <p className='w-[150px]'>{user?.email}</p>
                        <p className='w-[100px]'>{user?.phoneNumber}</p>
                        <p className='w-[100px]'>{user?.userType}</p>
                        <p onClick={() => handleBlacklist(user?.userId)}  className='bg-orange-500 cursor-pointer text-white font-bold px-1'>{user?.blacklist ? 'Remove-Blacklist': 'Blacklist'}</p>
                        <p onClick={() => handleSuspendUser(user?.userId)}  className='bg-red-500 text-white font-bold px-1 cursor-pointer'>{user?.suspend ? 'Remove-Suspend' : 'Suspend User'}</p>
                    </div>)
                })
            }
            <br />
        </div>
    );
};

export default ManageUsers;