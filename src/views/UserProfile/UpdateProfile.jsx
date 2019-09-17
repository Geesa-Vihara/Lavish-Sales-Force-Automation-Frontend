import React, {Component} from "react";
import avatar from "assets/img/faces/marc.jpg";
import "css/UpdateProfile.css";
import Footer from "components/Footer/Footer";
import axios from "axios"
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom";


class UpdateProfile extends Component{

    constructor() {
        super();
        this.state = {
          showPassword: false,
          username: "",
          password: "",
          firstname:"",
          lastname:"",
          nic:"",
          email:"",
          telno:"",
          address:"",
          errors: {}
        };        
      }
     handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
        
      };
    
     handleMouseDownPassword = event => {
        event.preventDefault();
      };
    
    onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            username: this.state.username,
            password: this.state.password,
            firstname:this.state.firstname,
            lastname:this.state.lastname,
            nic:this.state.nic,
            email:this.state.email,
            telno:this.state.telno,
            address:this.state.address
        };
        console.log(userData);
        axios.post('/update',userData).then(res => {
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
            <div style={{ marginTop: "5rem" }}>
                
                <div>
                
                    <div className="row">
                    
                       <div className="logo1" >                    
                            <img id="logoimg1" src={avatar} alt="img" />                    
                        </div>                                   
                        <h6 className="userlogin1"><b>Update Profile</b></h6>
                        <div className="col s10 offset-s2 " >                
                        <div className="row">
                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i><b style={{color: "#2bbbad" }}> Back to Dashboard</b>
                        </Link> 
                        </div>  
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="row" >
                                    <div className="input-field col s3">
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.username}
                                            error={errors.username}
                                            id="username"
                                            type="text"
                                        />
                                        <label htmlFor="username">Userame</label>
                                    </div>                                    
                                    
                                        <div className="input-field col s3">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.password}
                                                error={errors.password}
                                                id="password"                                                
                                                type={this.state.showPassword ? 'text' : 'password'}     
                                            />
                                            <label htmlFor="password">Password</label>
                                        </div>
                                       
                                        <div className="col s1">
                                            <IconButton                                                
                                                aria-label="toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                                onMouseDown={this.handleMouseDownPassword}
                                                >
                                                {this.state.showPassword ? (<Visibility /> ): <VisibilityOff />}
                                                
                                            </IconButton>
                                        </div>
                                        <div className="input-field col s3">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.nic}
                                                error={errors.nic}
                                                id="nic"
                                                type="text"
                                            />
                                            <label htmlFor="nic">NIC</label>
                                        </div>
                                        
                                </div>
                                <div className="row" >
                                    <div className="input-field col s4">
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.firstname}
                                            error={errors.firstname}
                                            id="firstname"
                                            type="text"
                                        />
                                        <label htmlFor="firstname">First Name</label>
                                    </div>
                                    <div className="input-field col s6">
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.lastname}
                                            error={errors.lastname}
                                            id="lastname"
                                            type="text"
                                        />
                                        <label htmlFor="lastname">Last Name</label>
                                    </div>
                                    
                                </div>
                                
                                <div className="row" >
                                    <div className="input-field col s5">
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.email}
                                            error={errors.email}
                                            id="email"
                                            type="email"
                                        />
                                        <label htmlFor="email">Email</label>
                                        </div>
                                        <div className="input-field col s5">
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.telno}
                                            error={errors.telno}
                                            id="telno"
                                            type="tel"
                                        />
                                        <label htmlFor="telno">Telephone No</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s10">
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.address}
                                            error={errors.address}
                                            id="address"
                                            type="text"
                                        />
                                        <label htmlFor="address">Address</label>
                                    </div>
                                </div>
                                
                                <div className="row" >  
                                    <div className="input-field col s10">                                  
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
                                        Update
                                    </button>
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

export default UpdateProfile;