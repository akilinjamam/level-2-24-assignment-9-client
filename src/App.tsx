import {createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./components/home/Home"
import Layout from "./functionalComponents/Layout"
import ProductDetail from "./components/productDetail/ProductDetail"
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
  ])
 

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
