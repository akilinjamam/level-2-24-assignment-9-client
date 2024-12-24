/* eslint-disable @typescript-eslint/no-explicit-any */


const Modal = ({productName, setOpen, deleteData, pending}: {productName?:any, setOpen?:any, deleteData?:any, pending:any}) => {
    return (
        <div className="w-[400px] h-[200px] bg-white relative flex items-center justify-center">
            <p className="font-bold">Are you sure to delete {productName}</p>
            <div  className="absolute bottom-0 w-full h-[40px] bg-gray-100 flex items-center justify-around">
                    <button onClick={deleteData}  className="text-white bg-green-500 font-bold px-2">{pending ? 'deleting...': 'Delete'}</button>
                    <button onClick={() => setOpen(false)} className="text-white bg-red-500 font-bold px-2">Cancel</button>
            </div>
        </div>
    );
};

export default Modal;