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
      ]
    },
  ])
 

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
