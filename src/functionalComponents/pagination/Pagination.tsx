/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import pagination from './Pagination.module.scss';
const Pagination = ({showData, setPaginatedDataContainer, setPaginatedIndex, limit=10}: {showData:any, setPaginatedDataContainer:any, setPaginatedIndex:any, limit:any}) => {
    console.log(showData)
    const [count, setCount] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const navigation = [
        {
            value:'<',
            link: 'decrease'
        },
        {
            value:count,
            link: 'one'
        },
        {
            value:count+1,
            link: 'two'
        },
        {
            value:count+2,
            link: 'three'
        },
        {
            value:'>',
            link: 'increase'
        },
    ]

    
    useEffect(() => {
        const paginatedData = showData?.slice((pageNumber*limit) - limit, pageNumber*limit);
        setPaginatedDataContainer(paginatedData)
        setPaginatedIndex(pageNumber)
    },[ pageNumber,setPaginatedDataContainer,setPaginatedIndex, showData, limit])

    const handleNav = (nav:any) => {
        if(nav.link === 'increase'){
           if(count <= (Math.ceil((showData?.length/limit)-3))){
            setCount(prevCount => prevCount+1)
           }
        }
        if(nav.link === 'decrease'){
            if(count > 1 ){
                setCount(prevCount => prevCount-1)
            }
        }
        if(nav.link === 'one'){
            setPageNumber(nav.value)
        }
        if(nav.link === 'two'){
            setPageNumber(nav.value)
        }
        if(nav.link === 'three'){
            setPageNumber(nav.value)
        }
       
    }


    const active = (value:any) => {
        return value === pageNumber ? 'orange' : 'gray'
    }
    const hide = (value:any) => {
       
       if(value.link === 'three'){
            if((showData?.length < limit )){
            return 'none'
        }else{
            return 'block'
        }
       }

    }

    return (
        <div className={`${pagination.main} flex items-center justify-start`}>
           <div style={{opacity: `${showData?.length < limit ? 0 : 1}`}} className={`${pagination.container} flex items-center justify-between`}>
                {
                    navigation.slice(0, (showData?.length <= (limit *3)) ? (Math.ceil(showData?.length/limit)+1) : 4  ).map((nav, index) => {
                        return (
                            <div style={{ display:`${hide(nav)}`}}  key={index+1} >
                                <div style={{backgroundColor: `${active(nav.value)}`}} onClick={() => handleNav(nav)} className={`${pagination.pageBox} flex items-center justify-center`}>
                                {nav.value}
                                </div>
                            </div>
                        )
                    })
                }
                <p>....</p>
                <div className={`${pagination.pageBox} flex items-center justify-center`}>
                    {Math.ceil(showData?.length/limit) === 0 ? 1 : Math.ceil(showData?.length/limit)}
                </div>
                {
                    navigation.slice(4,5).map((nav, index) => {
                        return (
                            <div onClick={() => handleNav(nav)} className={`${pagination.pageBox} flex items-center justify-center`} key={index+1}>
                                {nav.value}
                            </div>
                        )
                    })
                }
           </div>
        </div>
    );
};

export default Pagination;