import React, {Component} from "react";
import avatar from "assets/img/faces/lavish.jpg";
import "css/Login.css";
import Footer from "components/Footer/Footer";
import { Link } from "react-router-dom";
import axios from "axios"
//import "../../components/Helpers/AuthHelper";

class Login extends Component{

    constructor() {
        super();
        this.state = {
          username: "",
          password: "",
          errors: {}
        };        
      }
    onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            username: this.state.username,
            password: this.state.password
        };
        console.log(userData);
        axios.post('/login',userData).then(res => {
            if(res.status===200){                                
                this.props.history.push("/admin/dashboard");
            } else {
                const error = new Error(res.error);
                throw error;
            }
        })
        .catch(err => {
            console.error(err);
            
        }); 
              
    };

    render(){
        const { errors } = this.state;
        return(
            <div style={{ marginTop: "8rem" }}>
                <div className="container">
                    <div className="row">
                        <div className="logo" >                    
                            <img id="logoimg" src={avatar} alt="img" />                    
                        </div>                
                    <h6 className="userlogin"><b>User Log In</b></h6>
                        <div className="col s8 offset-s2" >                
                            <div className="col s12" style={{ textAlign: "center" }}>
                                <label >Welcome to Lavish Tea Pvt LTD<br />
                                <small >Sales Force Automation System</small>
                                </label>                
                            </div>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="input-field col s12">
                                    <input
                                    onChange={this.onChange}
                                    value={this.state.username}
                                    error={errors.username}
                                    id="username"
                                    type="text"
                                    />
                                    <label htmlFor="username">Username</label>
                                </div>
                                <div className="input-field col s12">
                                    <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    />
                                    <label htmlFor="password">Password</label>
                                </div>
                                
                                <div className="col s12" >                                    
                                    <button
                                        style={{
                                        width: "100%",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"                                        
                                        }}
                                        type="submit"
                                        className="btn btn-large waves-effect waves-light hoverable info accent-3"
                                        >
                                        Login
                                    </button>
                                    <div className="col s12" style={{ textAlign: "center" }}>
                                        <label><small >Forgot your password? <Link to="/forgotpassword">Get help</Link></small></label>                     
                                    </div>  
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <Footer />
                </div>
            </div>
         
        )
    }

}

export default Login;