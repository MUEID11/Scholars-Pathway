import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Error from "../Components/Error";
import Home from "../Home/Home";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <Error></Error>, 
      children: ([
        {
            path:'/',
            element: <Home></Home>,
        },
      ])
    },
    {
        path:'/login',
        element: <Login></Login>
    },
    {
        path: '/register',
        element: <Register></Register>
    }
  ]);