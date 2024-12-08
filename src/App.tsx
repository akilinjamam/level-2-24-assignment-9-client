import {createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./components/home/Home"
import Layout from "./functionalComponents/Layout"
function App() {


  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout><Home/></Layout>
    }
  ])
 

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
