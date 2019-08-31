import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import People from "@material-ui/icons/People";
import Store from "@material-ui/icons/Store";
import Storage from "@material-ui/icons/Storage";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
import Timeline from "@material-ui/icons/Timeline";
import AttachMoney from "@material-ui/icons/AttachMoney";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
// core components/views for RTL layout


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },

  {
    path: "/stock",
    name: "Stock ",
    rtlName: "خرائط",
    icon: Storage,
    component: TableList,
    layout: "/admin"
  },

  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  },
     
  {
    path: "/track",
    name: "Tracking",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Maps,
    layout: "/admin"
  },
  
  {
    path: "/salesreps",
    name: "Sales Representatives",
    rtlName: "قائمة الجدول",
    icon: People,
    component: TableList,
    layout: "/admin"
  },

  {
    path: "/customer",
    name: "Customers",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Store,
    component: TableList,
    layout: "/admin"
  },

  {
    path: "/distributor",
    name: "Distributors",
    rtlName: "ملف تعريفي للمستخدم",
    icon: People,
    component: TableList,
    layout: "/admin"
  },
  
  {
    path: "/invoices",
    name: "Sales Invoices",
    rtlName: "قائمة الجدول",
    icon: AttachMoney,
    component: TableList,
    layout: "/admin"
  },
  
  {
    path: "/analytics",
    name: "Analytics",
    rtlName: "لوحة القيادة",
    icon: Timeline,
    component: DashboardPage,
    layout: "/admin"
  }
];

export default dashboardRoutes;
