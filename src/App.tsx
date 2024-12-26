/* eslint-disable @typescript-eslint/no-explicit-any */
import {createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./components/home/Home"
import Layout from "./functionalComponents/Layout"
import ProductDetail from "./components/productDetail/ProductDetail"
import Vendor from "./components/vendor/Vendor"
import Cart from "./components/cart/Cart"
import Checkout from "./components/checkout/Checkout"
import OrderSummery from "./components/orderSummery/OrderSummery"
import AllProductsWithCategory from "./components/allProductsWithCategory/AllProductsWithCategory"
import FlashSale from "./functionalComponents/flashSale/FlashSale"
import AllFlashSale from "./functionalComponents/flashSale/AllFleshSale"
import Registration from "./components/registration/Registration"
import Login from "./components/login/Login"
import VendorDashboard from "./components/dashboard/VendorDashboard"
import ProductVendorDash from "./components/dashboard/vendorDashRoutes/ProductVendorDash"
import VendorProfile from "./components/dashboard/vendorDashRoutes/VendorProfile"
import CreateVendorProfile from "./components/dashboard/vendorDashRoutes/CreateVendorProfile"
import CreateProduct from "./components/dashboard/vendorDashRoutes/CreateProduct"
import EditProduct from "./components/dashboard/vendorDashRoutes/EditProduct"
import EditImage from "./components/dashboard/vendorDashRoutes/EditImage"
import { useState } from "react"
import { MyContext } from "./context/MyContext"
import Success from "./components/success/Success"
import PurchaseHistory from "./components/purchaseHistory/PurchaseHistory"
import VendorReviews from "./components/dashboard/vendorDashRoutes/vendorReviews"
import ChangePassword from "./components/login/ChangePassword"
import RecoveryPassword from "./components/login/RecoveryPassword"
import MonitorTransection from "./components/dashboard/vendorDashRoutes/MonitorTransection"
import ManageUsers from "./components/dashboard/vendorDashRoutes/ManageUsers"
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout><Home/></Layout>
    },
    {
      path: '/products/:productId',
      element: <Layout><ProductDetail/></Layout>
    },
    {
      path: '/vendors/:vendorId/:productId',
      element: <Layout><Vendor/></Layout>
    },
    {
      path: '/cart',
      element: <Layout><Cart/></Layout>
    },
    {
      path: '/checkout',
      element: <Layout><Checkout/></Layout>
    },
    {
      path: '/orderSummery',
      element: <Layout><OrderSummery/></Layout>
    },
    {
      path: '/allProductsWithCategory/:id',
      element: <Layout><AllProductsWithCategory/></Layout>
    },
    {
      path: '/flashSale',
      element: <Layout><FlashSale/></Layout>
    },
    {
      path: '/allFlashSale',
      element: <Layout><AllFlashSale/></Layout>
    },
    {
      path: '/registration',
      element: <Layout><Registration/></Layout>
    },
    {
      path: '/login',
      element: <Layout><Login/></Layout>
    },
    {
      path: '/change-password',
      element: <Layout><ChangePassword/></Layout>
    },
    {
      path: '/recoveryPassword',
      element: <Layout><RecoveryPassword/></Layout>
    },
    {
      path: '/success',
      element: <Layout><Success/></Layout>
    },
    {
      path: '/purchaseHistory',
      element: <Layout><PurchaseHistory/></Layout>
    },
    {
      path: '/vendorDashboard',
      element: <Layout><VendorDashboard/></Layout>,
      children: [
        {index: true, element:<ProductVendorDash/> },
        {
          path: 'vendorProfile',
          element: <VendorProfile/>
        },
        {
          path: 'createVendorProfile',
          element: <CreateVendorProfile/>
        },
        {
          path: 'createProduct',
          element: <CreateProduct/>
        },
        {
          path: 'editProduct/:id',
          element: <EditProduct/>
        },
        {
          path: 'editProductImg/:id',
          element: <EditImage/>
        },
        {
          path: 'vendorReviews',
          element: <VendorReviews/>
        },
        {
          path: 'monitor-transection',
          element: <MonitorTransection/>
        },
        {
          path: 'manageUsers',
          element: <ManageUsers/>
        },
      ]
    },
  ])


  /* 
  
  {
    "productId": "0e29bcc2-8961-4274-9461-0141bf5d1eb1",
    "purchasedProductId": "3af1c619-9934-447b-a784-c6dd658399fa",
    "quantity" : 3,
    "price": 50,
    "discount": 10
}
  
  */


type TCartInfo = {
  productId: string;
  purchasedProductId:string;
  price: number;
  quantity: number;
  discount: number;
}
  const [open, setOpen] = useState<boolean | undefined>(false);
  const [id, setId] = useState<string | undefined>('');
  const [productName, setProductName] = useState<string | undefined>('');
  const [refetchData, setRefetchDta] = useState<any>();
  const [cartInfo, setCartInfo] = useState<TCartInfo>({
    productId:'',
    purchasedProductId: '',
    quantity: 0,
    price: 0,
    discount: 0
  })

  return (
    <>
      <MyContext.Provider value={{open, setOpen, id, setId, productName, setProductName, setRefetchDta, refetchData, cartInfo, setCartInfo}}>
          <RouterProvider router={router}/>
      </MyContext.Provider>
    </>
  )
}

export default App
