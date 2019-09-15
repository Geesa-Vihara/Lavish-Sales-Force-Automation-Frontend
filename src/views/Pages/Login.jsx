import React, {Component} from "react";
import avatar from "assets/img/faces/lavish.jpg";
import "css/Login.css";
import Footer from "components/Footer/Footer";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import { Link } from "react-router-dom";

class Login extends Component{
    
    render(){
        
        return(
            <div>
            <div className="login">
                <div className="logo">                    
                    <img id="logoimg" src={avatar} alt="img" />                    
                </div>                
                <h6 className="userlogin"><b>User Log In</b></h6>
               
                <GridContainer justify="center">
                    <div id="logintitle">
                        <label >Welcome to Lavish Tea Pvt LTD<br />
                        <small >Sales Force Automation System</small></label>
                    </div>
                    <GridItem xs={8} sm={8} md={8}>
                        <CustomInput
                            labelText="Username"
                            id="username"
                            formControlProps={{
                            fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={8} sm={8} md={8}>
                        <CustomInput
                            color="info"
                            labelText="Password"
                            id="password"
                            formControlProps={{
                            fullWidth: true
                            }}
                            inputProps={{
                                type: "password",
                                required: true,
                                
                            }}
                        />
                    </GridItem>
                    <GridItem xs={8} sm={8} md={8}>                   
                        <label id="remember"><input type="checkbox"/> Keep me signed in</label>
                    </GridItem>
                
                    <GridItem xs={8} sm={8} md={8} >
                        <Button id="login" color="info">LOGIN</Button> 
                        <div id="logintitle">
                            <label id="forgot"><small >Forgot your password? <Link to="/forgotpassword">Get help</Link></small></label>                     
                        </div>  
                    </GridItem>
                    
                </GridContainer>
                
            </div>
            
            <div className="bottom">
                <Footer />
            </div>
            </div>
         
        )
    }

}

export default Login;