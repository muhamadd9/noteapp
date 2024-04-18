import Register from "./Components/Register/Register";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Components/Login/Login";
import LayOut from "./Components/LayOut/LayOut";
import Home from "./Components/Home/Home";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";


function App() {
  let routes = createBrowserRouter([
    {path : '/' , element : <LayOut/> , children : [
      {index : true , element : <ProtectedRoutes> <Home/> </ProtectedRoutes>},
      {path : '/home' , element : <ProtectedRoutes> <Home/> </ProtectedRoutes>},
      {path : '/noteapp' , element : <ProtectedRoutes> <Home/> </ProtectedRoutes>},
      {path : '/register' , element : <Register/>},
      {path : '/login' , element : <Login/>},
    ]}
  ])
  return (
  <RouterProvider router={routes}>

  </RouterProvider>
  )
}

export default App;
