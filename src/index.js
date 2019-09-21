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
      
      <Route path="/login"component= {Login} />} />
      <Route path="/forgotpassword" component={ForgotPassword} /> 
      <PrivateRoute path="/admin" component={Admin} />
      <PrivateRoute exact path="/updateprofile/:username" component={UpdateProfile} /> 
      <Redirect from="/" to="/admin/dashboard" />          
            
    </Switch>
  </Router>,
  document.getElementById("root")
);
