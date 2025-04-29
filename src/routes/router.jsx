import { createBrowserRouter } from "react-router-dom";
import Root, { AuthLayout } from "../../Root";
import Login from "../Pages/Login";
import SendCode from "../Pages/SendCode";
import Changepassword from "../Pages/Changepassword";
import Home from "../Pages/Home";
import AddInsurance from "../components/AddInsurance";
import Insurances from "../components/Insurances";
import Mandatory from "../components/Mandatory";
import DetailsInsurance from "../components/detailsInsurance";
import Brokerage from "../components/Brokerage";
import User from "../components/user.jsx";
import ProtectedRouter from './../components/ProtectedRouter';
import AddVehicle from "../components/AddVehicle";
import AddInsuranceCompany from "../components/AddInsuranceCompany";
import InsuranceCompanyList from "../components/InsuranceCompanyList";
import Customers from "../components/Customers";
import CustomerInfo from "../components/CustomerInfo.jsx";
import DetailsVehicle from "../components/DetailsVehicle.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {

                path: '/',
                element:
                    <ProtectedRouter><Home /></ProtectedRouter>,
            }, {

                path: '/home',
                element:
                    <ProtectedRouter><Home /></ProtectedRouter>,
            },
            {
                path: '/AddInsurance',
                element: <ProtectedRouter><AddInsurance /></ProtectedRouter>
            }, {
                path: '/Insurances',
                element: <ProtectedRouter><Insurances /></ProtectedRouter>
            }, {
                path: '/Mandatory',
                element: <ProtectedRouter><Mandatory /></ProtectedRouter>
            }, {
                path: '/detailsInsurance/:id',
                element: <ProtectedRouter> <DetailsInsurance /></ProtectedRouter>
            }, {
                path: '/Brokerage',
                element: <ProtectedRouter> <Brokerage /></ProtectedRouter>
            }, {
                path: '/user',
                element: <ProtectedRouter> <User /></ProtectedRouter>
            }, {
                path: '/add_vehicle/:id',
                element: <ProtectedRouter> <AddVehicle /></ProtectedRouter>
            }, {
                path: '/add_Company',
                element: <ProtectedRouter> <AddInsuranceCompany /></ProtectedRouter>
            }, {
                path: '/Insurance_company',
                element: <ProtectedRouter> <InsuranceCompanyList /></ProtectedRouter>
            },  {
                path: '/customers',
                element: <ProtectedRouter> <Customers /></ProtectedRouter>
            }, {
                path: '/Profile',
                element: <ProtectedRouter> <CustomerInfo /></ProtectedRouter>
            }, {
                path: '/DetailsVehicle',
                element: <ProtectedRouter> <DetailsVehicle /></ProtectedRouter>
            }
        ],

    }, {
        path: '/',
        element: <AuthLayout />,
        children: [
            {
                path: '/',
                element: <Login />
            }, {
                path: '/login',
                element: <Login />
            },
            {
                path: '/code',
                element: <SendCode />

            }, {
                path: '/changepassword',
                element: <Changepassword />
            }
        ]
    }

])
export default router;
