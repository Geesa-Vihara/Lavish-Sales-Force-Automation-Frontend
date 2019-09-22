import React, {Component} from "react";
import avatar from "assets/img/faces/marc.jpg";
import "css/UpdateProfile.css";
import Footer from "components/Footer/Footer";
import axios from "axios";
import { Link } from "react-router-dom";

class UpdateProfile extends Component{

    constructor() {
        super();
        this.state = {        
          username:localStorage.getItem('UserName'),
          firstname:"",
          lastname:"",
          nic:"",
          email:"",
          telno:"",
          address:"",
          errors: {},
         
        };        
      }
      componentDidMount() {
        axios.get('/retrieve', {
            params: {
                username: this.state.username
          }}
          )
            .then(response => {
                this.setState({                     
                    firstname:response.data.firstname,
                    lastname:response.data.lastname,
                    nic:response.data.nic,
                    email:response.data.email,
                    telno:response.data.telno,
                    address:response.data.address,
                 });
            })
            .catch(function (error){
                console.log(error);
            })
    }
         
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const userData = {  
            username:this.state.username,          
            firstname:this.state.firstname,
            lastname:this.state.lastname,
            nic:this.state.nic,
            email:this.state.email,
            telno:this.state.telno,
            address:this.state.address
        };
        
        axios.put('/update',userData).then(res => {
            if(res.status===200){                                
                this.props.history.push("/admin/dashboard");
            } else {
                const error = new Error(res.error);
                throw error;
            }
        })
        .catch(err => {
            this.setState({errors:err.response.data}) ; 
            
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
                        <Link to="/admin/dashboard" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i><b style={{color: "#2bbbad" }}> Back to Dashboard</b>
                        </Link> 
                        </div> 
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="row" >
                                </div>
                                <div className="row" >
                                    <div className="input-field col s4">
                                        <div>
                                            <label htmlFor="firstname">First Name</label>
                                        </div>
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.firstname}
                                            error={errors.firstname}
                                            id="firstname"
                                            type="text"
                                        />
                                        <span className="red-text">
                                            {errors.firstname}                                        
                                        </span>
                                    </div>
                                    <div className="input-field col s6">
                                        <div>
                                            <label htmlFor="lastname">Last Name</label>
                                        </div>
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.lastname}
                                            error={errors.lastname}
                                            id="lastname"
                                            type="text"
                                        />
                                        <span className="red-text">
                                            {errors.lastname}                                        
                                        </span>
                                    </div>
                                    
                                </div>                                
                                <div className="row" >
                                    <div className="input-field col s4">
                                        <div>
                                            <label htmlFor="email">Email</label>
                                        </div>
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.email}
                                            error={errors.email}
                                            id="email"
                                            type="email"
                                        />
                                        <span className="red-text">
                                            {errors.email}                                        
                                        </span>
                                    </div>
                                        <div className="input-field col s3">
                                            <div>
                                                <label htmlFor="telno">Telephone No</label>
                                            </div>
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.telno}
                                                error={errors.telno}
                                                id="telno"
                                                type="tel"
                                            />
                                            <span className="red-text">
                                                {errors.telno}                                        
                                            </span>
                                        </div>
                                        <div className="input-field col s3">
                                            <div>
                                                <label htmlFor="nic">NIC</label>
                                            </div>
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.nic}
                                                error={errors.nic}
                                                id="nic"
                                                type="text"
                                            />  
                                            <span className="red-text">
                                                {errors.nic}                                        
                                            </span>                                              
                                        </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s10">
                                        <div>
                                            <label htmlFor="address">Address</label>
                                        </div>
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.address}
                                            error={errors.address}
                                            id="address"
                                            type="text"
                                        />
                                        <span className="red-text">
                                            {errors.address}                                        
                                        </span>
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