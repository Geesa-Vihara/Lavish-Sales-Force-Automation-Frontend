import React from "react";
//import {Component} from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
// core components
import Admin from "layouts/Admin.jsx";
import Login from "views/Pages/Login.jsx";
import "assets/css/material-dashboard-react.css?v=1.7.0";
import ForgotPassword from "views/Pages/ForgotPassword";
import UpdateProfile from "views/UserProfile/UpdateProfile";
import ResetPassword from "views/Pages/ResetPassword";

import Update from "components/SalesRep/Update";
import SalesRepTable from "components/SalesRep/SalesRepTable";
import View from "components/SalesRep/View";
import Delete from "components/SalesRep/Delete";
import CheckExp from "components/Auth/CheckExp";

const hist = createBrowserHistory();

const PrivateRoute = ({ component: Component, ...props }) => {
  return (
    <Route
      {...props}
      render={innerProps =>
            CheckExp()===false && localStorage.getItem("jwtToken")!==null?
            <Component {...innerProps} />
            :            
            <Redirect to={{
              pathname:"/login",
              state:{expire:"Session expired please login again"}
              }}/>
                
            
      }
    />
  );
};

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      
      <Route path="/login"component= {Login} />
      <Route path="/forgotpassword" component={ForgotPassword} /> 
      <Route exact path="/resetpassword/:token" component={ResetPassword} />
      <PrivateRoute path="/admin" component={Admin} />
      <PrivateRoute exact path="/account/:username" component={UpdateProfile} />  

      <PrivateRoute path = "/edit/:_id"  component = {Update}/>
      <PrivateRoute path = "/delete/:_id"  component = {Delete}/>
      <PrivateRoute path = "/view/:_id"    component = {View}/>
      <PrivateRoute path = "/salesreps"    component = {SalesRepTable}/>
      <Redirect from="/" to="/admin/dashboard" /> 

    </Switch>
  </Router>,

  document.getElementById("root")
);
