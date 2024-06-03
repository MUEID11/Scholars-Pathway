import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Error from "../Components/Error";
import Home from "../Home/Home";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../PrivatePages/Dashboard";
import AllScholarship from "../Pages/AllScholarship";
import Account from "../PrivatePages/DashboardPages/Account";
import Profile from "../PrivatePages/DashboardPages/Profile";

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
        element: <AllScholarship></AllScholarship>,
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
  {
    path: "/dashboard",
    errorElement: <Error/>,
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      { path: 'account',
      element: <PrivateRoute><Account/></PrivateRoute>

      },
      { path: 'profile',
      element: <PrivateRoute><Profile/></PrivateRoute>
      }
    ],
  },
]);
