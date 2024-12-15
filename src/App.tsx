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
      path: '/vendors/:vendorId',
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
  ])
 

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
