import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Error from "../Components/Error";
import Home from "../Home/Home";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../PrivatePages/Dashboard";
import AllScholarship from "../Pages/AllScholarship";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/all",
        element: <AllScholarship></AllScholarship>
      }
      ,
      {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard/></PrivateRoute>
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);
