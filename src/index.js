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


import Update from "components/SalesRep/Update";
import SalesRepTable from "components/SalesRep/SalesRepTable";
import View from "components/SalesRep/View";
import Add from "components/SalesRep/Add";
import Delete from "components/SalesRep/Delete";

const hist = createBrowserHistory();

const PrivateRoute = ({ component: Component, ...props }) => {
  return (
    <Route
      {...props}
      render={innerProps =>
        localStorage.getItem('UserName')!==null ? 
            <Component {...innerProps} />
            :
            <Redirect to="/login" />
      }
    />
  );
};

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      
      <Route path="/login"component= {Login} />
      <Route path="/forgotpassword" component={ForgotPassword} /> 
      <PrivateRoute path="/admin" component={Admin} />
      <PrivateRoute exact path="/account/:username" component={UpdateProfile} />        
      
      <PrivateRoute path = "/salesreps/add" component = {Add}/>
      <PrivateRoute path = "/edit/:_id"  component = {Update}/>
      <PrivateRoute path = "/delete/:_id"  component = {Delete}/>
      <PrivateRoute path = "/view/:_id"    component = {View}/>
      <PrivateRoute path = "/salesreps"    component = {SalesRepTable}/>
      <Redirect from="/" to="/admin/dashboard" /> 

    </Switch>
  </Router>,

  document.getElementById("root")
);
