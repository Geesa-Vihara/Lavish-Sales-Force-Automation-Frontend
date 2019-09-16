import React, {Component} from "react";
import avatar from "assets/img/faces/marc.jpg";
import "css/UpdateProfile.css";
import Footer from "components/Footer/Footer";
import axios from "axios"
//import "../../components/Helpers/AuthHelper";

class UpdateProfile extends Component{

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
            <div style={{ marginTop: "5rem" }}>
                <div className="container">
                    <div className="row">
                       <div className="logo" >                    
                            <img id="logoimg" src={avatar} alt="img" />                    
                        </div>              
                    <h6 className="userlogin"><b>Update Profile</b></h6>
                        <div className="col s12 " >                
                           
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="row">
                                    <div className="input-field col s4">
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.username}
                                            error={errors.username}
                                            id="username"
                                            type="text"
                                        />
                                        <label htmlFor="username">Username</label>
                                        </div>

                                        <div className="input-field col s6">
                                            <input
                                            //onChange={this.onChange}
                                            //value={this.state.username}
                                            //error={errors.username}
                                            id="fullname"
                                            type="text"
                                        />
                                        <label htmlFor="username">Full Name</label>
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="input-field col s5">
                                        <input
                                            //onChange={this.onChange}
                                            //value={this.state.username}
                                            //error={errors.username}
                                            id="email"
                                            type="text"
                                        />
                                        <label htmlFor="username">Email</label>
                                        </div>
                                        <div className="input-field col s5">
                                        <input
                                            /* onChange={this.onChange}
                                            value={this.state.username}
                                            error={errors.username} */
                                            id="telno"
                                            type="text"
                                        />
                                        <label htmlFor="username">Telephone No</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s10">
                                        <input
                                    /*  onChange={this.onChange}
                                        value={this.state.username}
                                        error={errors.username} */
                                        id="address"
                                        type="text"
                                        />
                                        <label htmlFor="username">Address</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s10">
                                        <input
                                        onChange={this.onChange}
                                        value={this.state.password}
                                        error={errors.password}
                                        id="password"
                                        type="password"
                                        />
                                        <label htmlFor="password">Password</label>
                                    </div>
                                </div>
                                <div className="row" >                                    
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