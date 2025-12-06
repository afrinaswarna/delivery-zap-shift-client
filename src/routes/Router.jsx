import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import PrivateRoutes from "../PrivateRoute/PrivateRoutes";
import Rider from "../Pages/Auth/Rider/Rider";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels";
import Payment from "../Pages/Dashboard/Payment";
import PaymentSuccess from "../Pages/Dashboard/PaymentSuccess";
import PaymentCancelled from "../Pages/Dashboard/PaymentCancelled";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import ApproveRider from "../Pages/Dashboard/ApproveRider";
import UserManagement from "../Pages/Dashboard/UserManagement";
import AdminRoutes from "../PrivateRoute/AdminRoutes";
import AssignRiders from "../Pages/Dashboard/AssignRiders";
import RiderRoutes from "../PrivateRoute/RiderRoutes";
import AssignDeliveries from "../Pages/Dashboard/AssignDeliveries";
import CompletedDeliveries from "../Pages/Dashboard/CompletedDeliveries";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path:'/rider',
        element:<PrivateRoutes><Rider></Rider></PrivateRoutes>,
         loader:()=>fetch('/serviceCenters.json').then(res=>res.json())

      },
      {
        path:'/sendParcel',
        element:<PrivateRoutes><SendParcel></SendParcel></PrivateRoutes>,
        loader:()=>fetch('/serviceCenters.json').then(res=>res.json())
      },
      {
        path: "/coverage",
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
        Component: Coverage,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component:Login
      },
      {
        path:'register',
        Component:Register
      }
    ],
  },
  {
    path:'dashboard',
    element:<PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
    children:[
      {
        path:'my-parcels',
        Component:MyParcels
      },
      {
        path:'payment/:parcelId',
        Component:Payment
      },
      {
        path:'payment-history',
        Component:PaymentHistory

      },
      {
        path:'payment-success',
        Component:PaymentSuccess
      },
      {
        path:'payment-cancelled',
        Component:PaymentCancelled
      },
      // rider only routes
      {
        path:'assigned-deliveries',
        element:<RiderRoutes><AssignDeliveries></AssignDeliveries></RiderRoutes>
      },
      {
        path:'completed-deliveries',
        element:<RiderRoutes><CompletedDeliveries></CompletedDeliveries></RiderRoutes>
      },
      // admin routes
      {
        path:'approve-rider',
        element:<AdminRoutes><ApproveRider></ApproveRider></AdminRoutes>
      },
      {
        path:'assign-rider',
        element:<AdminRoutes><AssignRiders></AssignRiders></AdminRoutes>
      },
      {
        path:'approve-rider',
        element:<AdminRoutes><ApproveRider></ApproveRider></AdminRoutes>
      },
      {
        path:'user-management',
      element:<AdminRoutes><UserManagement></UserManagement></AdminRoutes>
      }
    ]
  }
]);
