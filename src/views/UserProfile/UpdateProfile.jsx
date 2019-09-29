import React, {Component} from "react";
import avatar1 from "assets/img/faces/lavish.jpg";
import newuser from "assets/img/faces/newuser.png";
import "css/UpdateProfile.css";
import Footer from "components/Footer/Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import { withStyles,createMuiTheme } from '@material-ui/core/styles';
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
import ArrowBack from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';
import { ThemeProvider } from '@material-ui/styles';
import { teal} from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = theme => ({
    root: {
      width: '100%',
      marginTop:'1%',
            
    },
    container:{
        display: 'flex',
        flexWrap: 'wrap',
       
    },
    textcontainer: {
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom:30
      },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),        
        width: "99%",
    },
    textfielderror: {
        marginLeft: theme.spacing(1),        
        color:"red"
      },
    logo:{
        margin: "-50px auto 0",
        overflow: "hidden",
        maxWidth: "180px",
        boxShadow: "0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
        maxHeight: "180px",
        borderRadius: "50%"
    },
    logoimg:{
        width: "100%",
        height: "100%"
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
      color:" #2bbbad"
    },
    accountheading:{
        textAlign:"center",
        marginBottom:10
      },
    userlogin:{
        fontSize:17,
        color: "#2bbbad"
    },
    icon:{
        color:"black",
    },
    button:{
        width: "100%",
        height:45,
        borderRadius: "3px",
        letterSpacing: "1.5px",
        marginTop: "1rem"     
      },
    
  });

const theme = createMuiTheme({
palette: {
    primary: teal,
},
});

class UpdateProfile extends Component{

    constructor() {
        super();
        this.state = {        
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
          registererrors:{},
          picerrors:{},          
          newprofilepic:null,
                   
        };        
      }
      
      componentDidMount() {
        var token=localStorage.getItem("jwtToken");
        axios.get('/retrieve', {
          headers:{
            "Authorization": token 
          }
        }
          )
            .then(response => {
                this.setState({  
                    firstname:response.data.firstname,
                    lastname:response.data.lastname,
                    nic:response.data.nic,
                    email:response.data.email,
                    telno:response.data.telno,
                    address:response.data.address,
                    userprofile:response.data,
                 });
                 
            })
            .catch(err=>{
                console.log(err);
            })
            
            
    }
         
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    profilesubmit = e => {
        e.preventDefault();
        var token=localStorage.getItem("jwtToken");
        const userData = {  
            firstname:this.state.firstname,
            lastname:this.state.lastname,
            nic:this.state.nic,
            email:this.state.email,
            telno:this.state.telno,
            address:this.state.address
        };
        
        axios.put('/update',userData,{
            headers:{
                "Authorization": token 
              }
        }).then(res => {
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
        var token=localStorage.getItem("jwtToken");
        const userData = {              
            newusername:this.state.newusername,  

             };                    
        axios.put('/updateusername',userData,{
            headers:{
                "Authorization": token 
              }
        }).then(res => {
            
            if(res.status===200){   
                localStorage.removeItem('jwtToken');                             
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
        var token=localStorage.getItem("jwtToken");
        const userData = {  
            currentpassword:this.state.currentpassword,
            newpassword:this.state.newpassword,
            confirmpassword:this.state.confirmpassword

             };                    
        axios.put('/updatepassword',userData,{
            headers:{
                "Authorization": token 
              }
        }).then(res => {
            
            if(res.status===200){    
                localStorage.removeItem('jwtToken');                            
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

    storeimage = e => {
        e.preventDefault();  
        var token=localStorage.getItem("jwtToken");  
        const data = new FormData();
        data.append('myImage', this.state.newprofilepic);
        
        const config = { 
            headers: {
             'content-type': 'multipart/form-data' ,
             'Authorization':token
            
            } 
            };       
        axios.post('/storeimage',data,config).then(res => {
            
            if(res.status===200){                                
               window.location.reload();
            } else {                
                const error = new Error(res.error);
                throw error;
            }
        })
        .catch(err => {
            this.setState({picerrors:err.response.data}); 
            
        }); 
              
    };
    newusersubmit = e => {
        e.preventDefault();
        var token=localStorage.getItem("jwtToken");
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
        
        axios.post('/register',userData,{
            headers:{
                "Authorization": token 
              }
        }).then(res => {
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
        var token=localStorage.getItem("jwtToken");
        this.setState({open:false});
        axios.delete('/deleteaccount',{
            headers:{
                "Authorization": token 
              }
        
        }).then(res => {
            
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
    
    changeprofilepic = e => {
        e.preventDefault();
        this.setState({
            newprofilepic:e.target.files[0],
            
        });
    }
    
    render(){
        const { errors,newusernameerrors,userprofile,passworderrors,open,registererrors,picerrors} = this.state;                
        const { classes } = this.props;
        return(
            <div style={{ marginTop: "5rem" }}>
                <div className={classes.logo}>                    
                    <img className={classes.logoimg} src={avatar1} alt="img" />                                                       
                </div> 
                <div className={classes.accountheading}>             
                        <p className={classes.userlogin}><b>ACCOUNT SETTINGS</b></p>
                        <label >Welcome to Lavish Tea Pvt LTD<br />
                            <small >Sales Force Automation System</small>
                        </label>  
                </div> 
                <Link to="/admin/dashboard">
                    <ArrowBack className={classes.icon}/>
                    <b style={{color: "#2bbbad" }}> Back to Dashboard</b>
                </Link>        
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
                        <Grid container >
                            <Grid item xs={8} > 
                                <form noValidate onSubmit={this.profilesubmit} className={classes.container}> 
                                    <Grid item xs={4} > 
                                        <div className={classes.textcontainer}>    
                                            <TextField
                                                label="Firstname"
                                                onChange={this.onChange}
                                                value={this.state.firstname}                                            
                                                id="firstname"
                                                type="text"
                                                className={classes.textField}
                                                margin="normal"
                                            />
                                            <span className={classes.textfielderror}>
                                                {errors.firstname}                                        
                                            </span>
                                        </div>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <div className={classes.textcontainer}>  
                                            <TextField
                                                label="Lastname"
                                                onChange={this.onChange}
                                                value={this.state.lastname}
                                                id="lastname"
                                                type="text"
                                                className={classes.textField}
                                                margin="normal"
                                            />
                                            <span className={classes.textfielderror}>
                                                {errors.lastname}                                        
                                            </span>
                                        </div>
                                    </Grid>
                                    <Grid item xs={4} > 
                                        <div className={classes.textcontainer}> 
                                            <TextField
                                                label="Email"
                                                onChange={this.onChange}
                                                value={this.state.email}
                                                id="email"
                                                type="email"
                                                className={classes.textField}
                                                margin="normal"
                                            />
                                            <span className={classes.textfielderror}>
                                                {errors.email}                                        
                                            </span>
                                        </div>
                                    </Grid>
                                    <Grid item xs={4}  >
                                        <div className={classes.textcontainer}>  
                                            <TextField
                                                label="Telephone No"
                                                onChange={this.onChange}
                                                value={this.state.telno}
                                                id="telno"
                                                type="tel"
                                                className={classes.textField}
                                                margin="normal"
                                            />
                                            <span className={classes.textfielderror}>
                                                {errors.telno}                                        
                                            </span>
                                        </div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className={classes.textcontainer}>  
                                            <TextField
                                                label="NIC"
                                                onChange={this.onChange}
                                                value={this.state.nic}
                                                id="nic"
                                                type="text"
                                                className={classes.textField}
                                                margin="normal"
                                            />  
                                            <span className={classes.textfielderror}>
                                                {errors.nic}                                        
                                            </span> 
                                        </div> 
                                    </Grid>
                                    <Grid item xs={12}> 
                                        <div className={classes.textcontainer}>
                                            <TextField
                                                label="Address"
                                                onChange={this.onChange}
                                                value={this.state.address}
                                                id="address"
                                                type="text"
                                                className={classes.textField}
                                                margin="normal"
                                            />
                                            <span className={classes.textfielderror}>
                                                {errors.address}                                        
                                            </span>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>                                      
                                        <ThemeProvider theme={theme}>                           
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                className={classes.button}
                                                >
                                                UPDATE
                                            </Button>
                                        </ThemeProvider> 
                                    </Grid>      
                                </form>
                            </Grid>
                            <Grid item xs={4} style={{marginTop:"45px"}}> 
                                <div className="logo1">                    
                                    <img id="logoimg1" src={`/getimage/${localStorage.getItem("jwtToken")}`}alt="img"/> 
                                </div> 
                                <div style={{textAlign:"center"}}>
                                    <p className={classes.userlogin}><b>USER PROFILE</b></p>
                                    <Typography ><b>Username:</b><label>{userprofile.username}</label></Typography >
                                    <Typography ><b>First Name:</b><label>{userprofile.firstname}</label></Typography >
                                    <Typography ><b>Last Name:</b><label>{userprofile.lastname}</label></Typography >
                                    <Typography ><b>Email:</b><label>{userprofile.email}</label></Typography >
                                    <Typography ><b>Telephone no:</b><label>{userprofile.telno}</label></Typography >
                                    <Typography ><b>NIC:</b><label>{userprofile.nic}</label></Typography >
                                    <Typography ><b>Address:</b><label>{userprofile.address}</label></Typography >
                                </div>
                            </Grid>
                        </Grid>
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
                               
                                    <div>
                                        <label htmlFor="newusername">Username</label>
                                    </div>
                                    <TextField
                                        onChange={this.onChange}
                                        value={this.state.newusername}
                                        error={newusernameerrors.newusername}
                                        id="newusername"
                                        type="text"
                                    />
                                    <span className="red-text">
                                        {newusernameerrors.newusername}                                        
                                    </span>
                                
                                                              
                                    <ThemeProvider theme={theme}>                           
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            className={classes.button}
                                            >
                                            UPDATE
                                        </Button>
                                    </ThemeProvider>
                               
                               
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
                               
                                    <div>
                                        <label htmlFor="currentpassword">Current Password</label>
                                    </div>
                                    <TextField
                                        onChange={this.onChange}
                                        value={this.state.currentpassword}
                                        error={passworderrors.currentpassword}
                                        id="currentpassword"
                                        type="password"
                                    />
                                    <span className="red-text">
                                        {passworderrors.currentpassword}                                        
                                    </span>
                                                         
                                    <div>
                                        <label htmlFor="newpassword">New Password</label>
                                    </div>
                                    <TextField
                                        onChange={this.onChange}
                                        value={this.state.newpassword}
                                        error={passworderrors.newpassword}
                                        id="newpassword"
                                        type="password"
                                    />
                                    <span className="red-text">
                                        {passworderrors.newpassword}                                        
                                    </span>
                               
                                    <div>
                                        <label htmlFor="confirmpassword">Confirm Password</label>
                                    </div>
                                    <TextField
                                        onChange={this.onChange}
                                        value={this.state.confirmpassword}
                                        error={passworderrors.confirmpassword}
                                        id="confirmpassword"
                                        type="password"
                                    />
                                    <span className="red-text">
                                        {passworderrors.confirmpassword}                                        
                                    </span>
                                                      
                                    <ThemeProvider theme={theme}>                           
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            className={classes.button}
                                            >
                                            UPDATE
                                        </Button>
                                    </ThemeProvider>
                               
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
                            <form noValidate onSubmit={this.storeimage}>                                                                                  
                                <div>
                                    <div>    
                                        <input type="file" onChange={this.changeprofilepic} error={picerrors.picupdate} />
                                    </div>
                                    <span className="red-text">
                                            {picerrors.picupdate}                                        
                                    </span>
                                </div>
                                <ThemeProvider theme={theme}>                           
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            className={classes.button}
                                            >
                                            UPDATE
                                        </Button>
                                    </ThemeProvider>
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
                                        <div className="logo1">                    
                                            <img id="logoimg1" src={newuser} alt="img"  />                                                       
                                        </div>
                                    </div>                                    
                                </div>    
                                <div className="row" >
                                   
                                        <div>
                                            <label htmlFor="newusername">Username</label>
                                        </div>
                                        <TextField
                                            onChange={this.onChange}
                                            value={this.state.newuserusername}
                                            error={registererrors.username}
                                            id="newuserusername"
                                            type="text"
                                        />
                                        {<small className="red-text">
                                            {registererrors.username}                                        
                                        </small>}
                                   
                                        <div>
                                            <label htmlFor="newuserpassword">Password</label>
                                        </div>
                                        <TextField
                                            onChange={this.onChange}
                                            value={this.state.newuserpassword}
                                            error={registererrors.password}
                                            id="newuserpassword"
                                            type="password"
                                        />
                                        <small className="red-text">
                                            {registererrors.password}                                        
                                        </small>
                                    
                                        <div>
                                            <label htmlFor="newuserpassword2">Confirm Password</label>
                                        </div>
                                        <TextField
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
                               
                                <div className="row">
                                   
                                        <div>
                                            <label htmlFor="newuserfirstname">First Name</label>
                                        </div>
                                        <TextField
                                            onChange={this.onChange}
                                            value={this.state.newuserfirstname}
                                            error={registererrors.firstname}
                                            id="newuserfirstname"
                                            type="text"
                                        />
                                        <small className="red-text">
                                            {registererrors.firstname}                                        
                                        </small>
                                    
                                        <div>
                                            <label htmlFor="newuserlastname">Last Name</label>
                                        </div>
                                        <TextField
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
                                
                                <div className="row">
                                   
                                        <div>
                                            <label htmlFor="newuseremail">Email</label>
                                        </div>
                                        <TextField
                                            onChange={this.onChange}
                                            value={this.state.newuseremail}
                                            error={registererrors.email}
                                            id="newuseremail"
                                            type="email"
                                        />
                                        <small className="red-text">
                                            {registererrors.email}                                        
                                        </small>
                                    
                                   
                                        <div>
                                            <label htmlFor="newusertelno">Telephone No</label>
                                        </div>
                                        <TextField
                                            onChange={this.onChange}
                                            value={this.state.newusertelno}
                                            error={registererrors.telno}
                                            id="newusertelno"
                                            type="tel"
                                        />
                                        <small className="red-text">
                                            {registererrors.telno}                                        
                                        </small>
                                    
                                        <div>
                                            <label htmlFor="newusernic">NIC</label>
                                        </div>
                                        <TextField
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
                                <div className="row">
                                    
                                        <div>
                                            <label htmlFor="newuseraddress">Address</label>
                                        </div>
                                        <TextField
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
                                
                                <div className="row">
                                <ThemeProvider theme={theme}>                           
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            className={classes.button}
                                            >
                                            SUBMIT
                                        </Button>
                                    </ThemeProvider>
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
                                <ThemeProvider theme={theme}>                           
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        type="submit"
                                        className={classes.button}
                                        onClick={this.handleClickOpen}
                                        >
                                        <i className="material-icons">delete_forever</i>
                                        Delete Account
                                    </Button>
                                </ThemeProvider>                                                                          
                                                           
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
                                <ThemeProvider theme={theme}>                           
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        type="submit"
                                        className={classes.button}
                                        onClick={this.handleClose}
                                        >
                                        Disagree
                                    </Button>
                                </ThemeProvider> 
                                <ThemeProvider theme={theme}>                           
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        type="submit"
                                        className={classes.button}
                                        onClick={this.deleteaccount}
                                        autoFocus
                                        >
                                        Agree
                                    </Button>
                                </ThemeProvider> 
                                
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