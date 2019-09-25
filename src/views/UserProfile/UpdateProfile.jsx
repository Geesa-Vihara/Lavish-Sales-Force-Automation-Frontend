import React, {Component} from "react";
import avatar from "assets/img/faces/marc.jpg";
import avatar1 from "assets/img/faces/lavish.jpg";
import newuser from "assets/img/faces/newuser.png";
import "css/UpdateProfile.css";
import Footer from "components/Footer/Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = theme => ({
    root: {
      width: '100%',
      marginTop:'1%',
            
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
      color:" #2bbbad"
    },
    
  });
 
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
          userprofile:{},
          newusernameerrors:{},
          passworderrors:{},
          newusername:"",
          currentpassword:"",
          newpassword:"",
          confirmpassword:"",
          open:false,
          newuserusername:"",
          newuserfirstname:"",
          newuserlastname:"",
          newusernic:"",
          newuseremail:"",
          newusertelno:"",
          newuseraddress:"",
          newuserpassword:"",
          newuserpassword2:"",
          registererrors:{}
         
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
                    username:response.data.username,                   
                    firstname:response.data.firstname,
                    lastname:response.data.lastname,
                    nic:response.data.nic,
                    email:response.data.email,
                    telno:response.data.telno,
                    address:response.data.address,
                    userprofile:response.data,
                    
                 });
                 
                
                 
            })
            .catch(function (error){
                console.log(error);
            })
    }
         
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    profilesubmit = e => {
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
                window.location.reload();
            } else {
                const error = new Error(res.error);
                throw error;
            }
        })
        .catch(err => {
            this.setState({errors:err.response.data}) ; 
            
        }); 
              
    };

    usernamesubmit = e => {
        e.preventDefault();
        const userData = {  
            username:this.state.username,
            newusername:this.state.newusername,  

             };                    
        axios.put('/updateusername',userData).then(res => {
            
            if(res.status===200){                                
                this.props.history.push({
                    pathname: '/login'
                  })           
            } else {                
                const error = new Error(res.error);
                throw error;
            }
        })
        .catch(err => {
            this.setState({newusernameerrors:err.response.data}) ; 
            
        }); 
              
    };

    passwordsubmit = e => {
        e.preventDefault();
        const userData = {  
            username:this.state.username,  
            currentpassword:this.state.currentpassword,
            newpassword:this.state.newpassword,
            confirmpassword:this.state.confirmpassword

             };                    
        axios.put('/updatepassword',userData).then(res => {
            
            if(res.status===200){                                
                this.props.history.push({
                    pathname: '/login'
                  })    
            } else {                
                const error = new Error(res.error);
                throw error;
            }
        })
        .catch(err => {
            this.setState({passworderrors:err.response.data}) ; 
            
        }); 
              
    };

    uploadpicture = e => {
        e.preventDefault();
        const userData = {  
            newusername:this.state.newusername,  

             };                    
        axios.put('/updatepicture',userData).then(res => {
            
            if(res.status===200){                                
               window.location.reload();
            } else {                
                const error = new Error(res.error);
                throw error;
            }
        })
        .catch(err => {
            this.setState({newusernameerrors:err.response.data}) ; 
            
        }); 
              
    };
    newusersubmit = e => {
        e.preventDefault();
        const userData = {  
            username:this.state.newuserusername,          
            firstname:this.state.newuserfirstname,
            lastname:this.state.newuserlastname,
            nic:this.state.newusernic,
            email:this.state.newuseremail,
            telno:this.state.newusertelno,
            address:this.state.newuseraddress,
            password:this.state.newuserpassword,
            password2:this.state.newuserpassword2,
        };
        
        axios.post('/register',userData).then(res => {
            if(res.status===200){                                
                window.location.reload();
            } else {
                const error = new Error(res.error);
                throw error;
            }
        })
        .catch(err => {
            this.setState({registererrors:err.response.data}) ; 
            
        }); 
              
    };
    deleteaccount = e => {
        e.preventDefault(); 
        this.setState({open:false});
        axios.delete('/deleteaccount',{
            params: {
                username: this.state.username
          }}).then(res => {
            
            if(res.status===200){                                                
                this.props.history.push({
                    pathname: '/login'
                  })    
            } else {                
                const error = new Error(res.error);
                throw error;
            }
        })
        .catch(err => {
            alert(err); 
            
        }); 
              
    };
    handleClose = () => {
        this.setState({open:false});
        
      };
    handleClickOpen = () => {
        this.setState({open:true});
        
      };
    render(){
        const { errors,newusernameerrors,userprofile,passworderrors,open,registererrors} = this.state;                
        const { classes } = this.props;
        return(
            <div style={{ marginTop: "5rem" }}>
                <div className="logo1">                    
                    <img id="logoimg1" src={avatar1} alt="img" />                                                       
                </div> 
                <div className="col s12" style={{ textAlign: "center" ,marginTop:"10px"}}>
                    <label >Welcome to Lavish Tea Pvt LTD<br />
                        <small >Sales Force Automation System</small><br/>
                    </label>  
                    <h6 style={{color: "#2bbbad"}}><b>Account Settings</b></h6>              
                </div>
                <div className="row">
                    <Link to="/admin/dashboard" className="btn-flat waves-effect">
                        <i className="material-icons left">keyboard_backspace</i><b style={{color: "#2bbbad" }}> Back to Dashboard</b>
                    </Link> 
                </div>  
                               
                <ExpansionPanel className={classes.root}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <i className="material-icons" >edit</i>
                        <Typography className={classes.heading}>User Profile</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{backgroundColor:"white"}}>                        
                      <div className="row" >       
                            <div className="col s8">
                                <form noValidate onSubmit={this.profilesubmit}>
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
                                    <div className="input-field col s8">
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
                                    <div className="input-field col s4">
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
                                    <div className="input-field col s4">
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
                                    <div className="input-field col s12">
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
                                    <div className="input-field col s12">                                  
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
                                <div className="col s4 offset s2" style={{marginTop:"3%"}}>
                                    <div className="logo1">                    
                                        <img id="logoimg1" src={avatar} alt="img" />                                                       
                                    </div> 
                                    <h6 className="userlogin1"><b>User Profile</b></h6>
                                    <div style={{textAlign:"center"}}>
                                        <Typography ><b>Username:</b><label>{userprofile.username}</label></Typography >
                                        <Typography ><b>First Name:</b><label>{userprofile.firstname}</label></Typography >
                                        <Typography ><b>Last Name:</b><label>{userprofile.lastname}</label></Typography >
                                        <Typography ><b>Email:</b><label>{userprofile.email}</label></Typography >
                                        <Typography ><b>Telephone no:</b><label>{userprofile.telno}</label></Typography >
                                        <Typography ><b>NIC:</b><label>{userprofile.nic}</label></Typography >
                                        <Typography ><b>Address:</b><label>{userprofile.address}</label></Typography >
                                        
                                    </div>
                                </div>
                            </div>
               
                    </ExpansionPanelDetails>
                </ExpansionPanel>               
                <ExpansionPanel className={classes.root}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <i className="material-icons" >person</i>
                        <Typography className={classes.heading}>Change Username</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{backgroundColor:"white"}}>
                         <div className="row">                                                                      
                            <form noValidate onSubmit={this.usernamesubmit}>                             
                                <div className="input-field col s7 ">
                                    <div>
                                        <label htmlFor="newusername">Username</label>
                                    </div>
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.newusername}
                                        error={newusernameerrors.newusername}
                                        id="newusername"
                                        type="text"
                                    />
                                    <span className="red-text">
                                        {newusernameerrors.newusername}                                        
                                    </span>
                                </div>
                                
                                
                                <div className="input-field col s5 ">                                  
                                    <button
                                        style={{
                                        width: "100%",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem",                                        
                                        }}
                                        type="submit"
                                        className="btn btn-large waves-effect waves-light hoverable info accent-3"
                                        
                                        >
                                        Update
                                    </button>
                                </div>
                               
                            </form>
                            
                         </div> 
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel className={classes.root}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <i className="material-icons" >visibility_off</i>
                        <Typography className={classes.heading}>Change Password</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{backgroundColor:"white"}}>
                        <div className="row">
                            <form noValidate onSubmit={this.passwordsubmit}>
                                <div className="input-field col s3 ">
                                    <div>
                                        <label htmlFor="currentpassword">Current Password</label>
                                    </div>
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.currentpassword}
                                        error={passworderrors.currentpassword}
                                        id="currentpassword"
                                        type="password"
                                    />
                                    <span className="red-text">
                                        {passworderrors.currentpassword}                                        
                                    </span>
                                </div>
                                <div className="input-field col s3">                            
                                    <div>
                                        <label htmlFor="newpassword">New Password</label>
                                    </div>
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.newpassword}
                                        error={passworderrors.newpassword}
                                        id="newpassword"
                                        type="password"
                                    />
                                    <span className="red-text">
                                        {passworderrors.newpassword}                                        
                                    </span>
                                </div>
                                <div className="input-field col s3">
                                    <div>
                                        <label htmlFor="confirmpassword">Confirm Password</label>
                                    </div>
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.confirmpassword}
                                        error={passworderrors.confirmpassword}
                                        id="confirmpassword"
                                        type="password"
                                    />
                                    <span className="red-text">
                                        {passworderrors.confirmpassword}                                        
                                    </span>
                                </div>
                                <div className="input-field col s3">                                  
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
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel className={classes.root}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <i className="material-icons" >add_photo_alternate</i>
                        <Typography className={classes.heading}>Change Profile Picture</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{backgroundColor:"white"}}>
                        <div className="row">
                            <form noValidate onSubmit={this.uploadpicture}>                                                                                  
                            <div className="file-field input-field">
                                <div className="btn  teal lighten-3">                                    
                                    <i className="material-icons">file_upload</i>Browse...
                                    <input type="file" multiple/>
                                </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" placeholder="Upload a picture"/>
                            </div>
                            </div>
                                <button style={{
                                        width: "100%",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"                                        
                                        }}
                                        type="submit"
                                        className="btn btn-large waves-effect waves-light hoverable info accent-3">
                                        Upload
                                </button>
                            </form>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel className={classes.root}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <i className="material-icons" >people</i>
                        <Typography className={classes.heading}>Add new user</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{backgroundColor:"white"}}>
                        <div className="row"style={{marginTop:"3%"}}>
                            <form noValidate onSubmit={this.newusersubmit}> 
                                <div className="row">
                                    <div className="col s12" > 
                                        <div className="logo2">                    
                                            <img id="logoimg1" src={newuser} alt="img" />                                                       
                                        </div>
                                    </div>
                                    <div className="col s12"> 
                                        <div className="col s6 offset-s6 " >
                                            <div >  
                                                <input type="file" multiple/>
                                            </div>
                                        </div>
                                    </div>
                                </div>    
                                <div className="row" >
                                    <div className="input-field col s4">
                                        <div>
                                            <label htmlFor="newusername">Username</label>
                                        </div>
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.newuserusername}
                                            error={registererrors.username}
                                            id="newuserusername"
                                            type="text"
                                        />
                                        {<small className="red-text">
                                            {registererrors.username}                                        
                                        </small>}
                                    </div>
                                    <div className="input-field col s4">
                                        <div>
                                            <label htmlFor="newuserpassword">Password</label>
                                        </div>
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.newuserpassword}
                                            error={registererrors.password}
                                            id="newuserpassword"
                                            type="password"
                                        />
                                        <small className="red-text">
                                            {registererrors.password}                                        
                                        </small>
                                    </div>
                                    <div className="input-field col s4">
                                        <div>
                                            <label htmlFor="newuserpassword2">Confirm Password</label>
                                        </div>
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.newuserpassword2}
                                            error={registererrors.password2}
                                            id="newuserpassword2"
                                            type="password"
                                        />
                                        <small className="red-text">
                                            {registererrors.password2}                                        
                                        </small>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s4">
                                        <div>
                                            <label htmlFor="newuserfirstname">First Name</label>
                                        </div>
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.newuserfirstname}
                                            error={registererrors.firstname}
                                            id="newuserfirstname"
                                            type="text"
                                        />
                                        <small className="red-text">
                                            {registererrors.firstname}                                        
                                        </small>
                                    </div>
                                    <div className="input-field col s8">
                                        <div>
                                            <label htmlFor="newuserlastname">Last Name</label>
                                        </div>
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.newuserlastname}
                                            error={registererrors.lastname}
                                            id="newuserlastname"
                                            type="text"
                                        />
                                        <small className="red-text">
                                            {registererrors.lastname}                                        
                                        </small>
                                    </div>
                                </div> 
                                <div className="row">
                                    <div className="input-field col s4">
                                        <div>
                                            <label htmlFor="newuseremail">Email</label>
                                        </div>
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.newuseremail}
                                            error={registererrors.email}
                                            id="newuseremail"
                                            type="email"
                                        />
                                        <small className="red-text">
                                            {registererrors.email}                                        
                                        </small>
                                    </div>
                                    <div className="input-field col s4">
                                        <div>
                                            <label htmlFor="newusertelno">Telephone No</label>
                                        </div>
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.newusertelno}
                                            error={registererrors.telno}
                                            id="newusertelno"
                                            type="tel"
                                        />
                                        <small className="red-text">
                                            {registererrors.telno}                                        
                                        </small>
                                    </div>
                                    <div className="input-field col s4">
                                        <div>
                                            <label htmlFor="newusernic">NIC</label>
                                        </div>
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.newusernic}
                                            error={registererrors.nic}
                                            id="newusernic"
                                            type="text"
                                        />  
                                        <small className="red-text">
                                            {registererrors.nic}                                        
                                        </small>                                              
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <div>
                                            <label htmlFor="newuseraddress">Address</label>
                                        </div>
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.newuseraddress}
                                            error={registererrors.address}
                                            id="newuseraddress"
                                            type="text"
                                        />
                                        <small className="red-text">
                                            {registererrors.address}                                        
                                        </small>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">                                  
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
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel className={classes.root}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <i className="material-icons" >delete_forever</i>
                        <Typography className={classes.heading}>Delete my account</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{backgroundColor:"white"}}>
                        <div className="row">
                                                                                                           
                                <button style={{
                                        width: "100%",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"                                        
                                        }}
                                        type="submit"
                                        className="btn btn-large waves-effect waves-light hoverable red"
                                        onClick={this.handleClickOpen}
                                        >
                                        <i className="material-icons">delete_forever</i>
                                        Delete Account
                                </button>
                            
                            <Dialog
                                open={open}
                                onClose={this.handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title " style={{color:"red"}}>{"Are you sure you want to delete your account?"}</DialogTitle>
                                <DialogContent>
                                <DialogContentText id="alert-dialog-description" >
                                    Deleting your account is permanent and will remove all 
                                    content including comments, avatars and profile settings. 
                                    Are you really sure you want to delete your account?
                                </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                <button 
                                    style={{
                                        width: "100%",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"                                        
                                        }}
                                        type="submit"
                                        className="btn btn-large waves-effect waves-light hoverable green"
                                        onClick={this.handleClose}>
                                    Disagree
                                </button>
                                <button 
                                style={{
                                    width: "100%",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"                                        
                                    }}
                                    type="submit"
                                    className="btn btn-large waves-effect waves-light hoverable red"
                                    onClick={this.deleteaccount}
                                    autoFocus>
                                    Agree
                                </button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <div className="bottom">
                    <Footer />
                </div>
                 
                 </div>
         
        )
    }

}
UpdateProfile.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(useStyles)(UpdateProfile);