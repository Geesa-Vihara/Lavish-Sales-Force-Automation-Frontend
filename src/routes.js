import Dashboard from "@material-ui/icons/Dashboard";
//import Person from "@material-ui/icons/Person";
import People from "@material-ui/icons/People";
import Store from "@material-ui/icons/Store";
import Storage from "@material-ui/icons/Storage";
//import LibraryBooks from "@material-ui/icons/LibraryBooks";
//import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
//import Notifications from "@material-ui/icons/Notifications";
import Description from "@material-ui/icons/Description";
//import Unarchive from "@material-ui/icons/Unarchive";
//import Language from "@material-ui/icons/Language";
import Timeline from "@material-ui/icons/Timeline";
import AttachMoney from "@material-ui/icons/AttachMoney";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
//import UserProfile from "views/UserProfile/UserProfile.jsx";

//import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import SalesRepTable from "components/SalesRep/SalesRepTable";
import DistributorTable from "components/Distributor/DistributorTable"
import CustomerTable from "components/Customer/CustomerTable"
import AnalyticsPage from "views/Analytics/Analytics.jsx";
import Tracking from "views/Tracking/Tracking.jsx";
import Reports from "views/Reports/Reports.jsx";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },

  {
    path: "/stock",
    name: "Stock ",
    icon: Storage,
    component:NotificationsPage,
    layout: "/admin"
  },

  {
    path: "/reports",
    name: "Reports",
    icon: Description,
    component: Reports,
    layout: "/admin"
  },
     
  {
    path: "/track",
    name: "Tracking",
    icon: LocationOn,
    component: Tracking,
    layout: "/admin"
  },
  
  {
    path: "/salesreps",
    name: "Sales Representatives",
    icon: People,
    component: SalesRepTable,
    layout: "/admin"
  },

  {
    path: "/customers",
    name: "Customers",
    icon: Store,
    component: CustomerTable,
    layout: "/admin"
  },

  {
    path: "/distributors",
    name: "Distributors",
    icon: People,
    component: DistributorTable,
    layout: "/admin"
  },
  
  {
    path: "/invoices",
    name: "Sales Invoices",
    icon: AttachMoney,
    component: NotificationsPage,
    layout: "/admin"
  },
  
  {
    path: "/analytics",
    name: "Analytics",
    icon: Timeline,
    component: AnalyticsPage,
    layout: "/admin"
  }
];

export default dashboardRoutes;
