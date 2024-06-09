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
import AddScholarship from "../PrivatePages/DashboardPages/AddScholarship";
import AdminRoute from "./AdminRoute";
import AdminModerator from "./AdminModerator";
import ScholarshipDetails from "../Pages/ScholarshipDetails";
import ManageScholarship from "../PrivatePages/DashboardPages/ManageScholarship";
import AppliedScholarship from "../PrivatePages/DashboardPages/AppliedScholarship";
import UpdateScholarship from "../PrivatePages/UpdateScholarship";
import Payment from "../PrivatePages/DashboardPages/Payment/Payment";
import EditMyApplication from "../PrivatePages/DashboardPages/EditMyApplication";

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
      {
        path: "/scholarship/:id",
        element: (
          <PrivateRoute>
            <ScholarshipDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      //admin & modarator can acccess this route
      {
        path: "/updatescholarship/:id",
        element: (
          <AdminModerator>
            <UpdateScholarship />
          </AdminModerator>
        ),
      },
    ],
  },

  {
    path: "/dashboard",
    errorElement: <Error />,
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "application",
        element: (
          <PrivateRoute>
            <MyApplication />
          </PrivateRoute>
        ),
      },
      {
        path: "application/:id",
        element: (
          <PrivateRoute>
            <EditMyApplication></EditMyApplication>
          </PrivateRoute>
        ),
      },
      {
        path: "myreviews",
        element: (
          <PrivateRoute>
            <MyReview />
          </PrivateRoute>
        ),
      },
      //admin and modarator can access these routes
      {
        path: "addscholarship",
        element: (
          <AdminModerator>
            <AddScholarship />
          </AdminModerator>
        ),
      },
      {
        path: "managescholarship",
        element: (
          <AdminModerator>
            <ManageScholarship />
          </AdminModerator>
        ),
      },
      {
        path: "appliedscholarship",
        element: (
          <AdminModerator>
            <AppliedScholarship />
          </AdminModerator>
        ),
      },
      //admin only route
      {
        path: "manageusers",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
    ],
  },
]);
