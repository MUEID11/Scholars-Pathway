import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Error from "../Components/Error";
import Home from "../Home/Home";

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
  ]);