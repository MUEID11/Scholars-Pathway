import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Error from "../Components/Error";
import Home from "../Home/Home";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../PrivatePages/Dashboard";
import AllScholarship from "../Pages/AllScholarship";
import Profile from "../PrivatePages/DashboardPages/Profile";
import MyApplication from "../PrivatePages/DashboardPages/MyApplication";
import MyReview from "../PrivatePages/DashboardPages/MyReview";
import ManageUsers from "../PrivatePages/DashboardPages/ManageUsers";

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
      { path: 'profile',
      element: <PrivateRoute><Profile/></PrivateRoute>
      },
      {
        path: 'application',
        element: <PrivateRoute><MyApplication /></PrivateRoute>
      },
      {
        path: 'myreviews',
        element: <PrivateRoute><MyReview/></PrivateRoute>
      },
      {
        path: 'manageusers',
        element: <PrivateRoute><ManageUsers/></PrivateRoute>
      }
    ],
  },
]);
