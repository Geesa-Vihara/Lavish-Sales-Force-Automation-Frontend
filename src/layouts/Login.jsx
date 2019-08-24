import React, {Component} from "react";
import avatar from "assets/img/faces/lavish.jpg";
import "css/Login.css";
import Footer from "components/Footer/Footer";
class Login extends Component{
    render(){
        return(
            <div>
            <div className="login">
                <div className="logo">                    
                    <img id="logoimg" src={avatar} alt="img" />                    
                </div>
                <h6>Hello Login</h6>
            </div>
            <div className="bottom">
            <Footer />
            </div>
            </div>
         
        )
    }

}
export default Login;