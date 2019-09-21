import React from "react";
import { Route} from "react-router-dom";

//import Admin from "layouts/Admin";
import UpdateProfile from "./UpdateProfile";

const userRoutes = (    
    //<Route path="admin" component={Admin}>
      <Route path="/updateprofile/:username" component={UpdateProfile} />  
    //</Route>  
  )
   
  export default userRoutes
  