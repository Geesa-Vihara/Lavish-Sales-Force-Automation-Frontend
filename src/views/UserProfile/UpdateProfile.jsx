import React, {Component} from "react";
import avatar1 from "assets/img/faces/lavish.jpg";
import newuser from "assets/img/faces/newuser.png";
import Footer from "components/Footer/Footer";
import axios from "axios";
import { Link,Redirect } from "react-router-dom";
import { withStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
/*
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
*/
import ArrowBack from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';
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
      color:"black"
    },
    accountheading:{
        textAlign:"center",
        marginBottom:10
      },
    userlogin:{
        fontSize:17,
        color: "black"
    },
    icon:{
        color:"black",
    },
    button:{
        //backgroundColor:"#1b5e20",
        /* '&:hover':{
        backgroundColor:"#8EB69B",
        }, */
        color:"black",
        width: "100%",
        height:45,
        borderRadius: "3px",
        letterSpacing: "1.5px",
        marginTop: "1rem"     
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
          isexpire:false
                   
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
                
                if(err.tokenmessage){
                    this.setState({isexpire:true}) ; 
                }
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
            if(err.tokenmessage){
                this.setState({isexpire:true}) ; 
            }
            
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
            if(err.tokenmessage){
                this.setState({isexpire:true}) ; 
            }
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
            if(err.tokenmessage){
                this.setState({isexpire:true}) ; 
            }
            
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
            if(err.tokenmessage){
                this.setState({isexpire:true}) ; 
            }
            
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
            if(err.tokenmessage){
                this.setState({isexpire:true}) ; 
            }
        }); 
        
        
              
    };
    /*
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
            if(err.tokenmessage){
                this.setState({isexpire:true}) ; 
            }
            
        }); 
              
    };
    
    handleClose = () => {
        this.setState({open:false});
        
      };
    handleClickOpen = () => {
        this.setState({open:true});
        
      };
    */
    changeprofilepic = e => {
        e.preventDefault();
        this.setState({
            newprofilepic:e.target.files[0],
            
        });
    }
    
    render(){
        const { errors,newusernameerrors,userprofile,passworderrors/*,open*/,registererrors,picerrors,isexpire} = this.state;                
        const { classes } = this.props;
        if(!isexpire){
            
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
                        <b style={{color: "black" }}> Back to Dashboard</b>
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
                                                <small className={classes.textfielderror}>
                                                    {errors.firstname}                                        
                                                </small>
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
                                                <small className={classes.textfielderror}>
                                                    {errors.lastname}                                        
                                                </small>
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
                                                <small className={classes.textfielderror}>
                                                    {errors.email}                                        
                                                </small>
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
                                                <small className={classes.textfielderror}>
                                                    {errors.telno}                                        
                                                </small>
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
                                                <small className={classes.textfielderror}>
                                                    {errors.nic}                                        
                                                </small> 
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
                                                <small className={classes.textfielderror}>
                                                    {errors.address}                                        
                                                </small>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} >                           
                                                <Button
                                                    variant="contained"
                                                    type="submit"
                                                    className={classes.button}
                                                    style={{width:"20%",float:"right"}}
                                                    >
                                                    UPDATE
                                                </Button>
                                        </Grid>      
                                    </form>
                                </Grid>
                                <Grid item xs={4} style={{marginTop:"45px"}}> 
                                    <div className={classes.logo}>                    
                                        <img className={classes.logoimg} src={`/getimage/${localStorage.getItem("jwtToken")}`}alt="img"/> 
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
                            <Grid container style={{justifyContent:"center",marginLeft:"40%",marginRight:"40%"}}>  
                                <Grid item xs={12}>                                               
                                    <form noValidate onSubmit={this.usernamesubmit} className={classes.container}> 
                                        <Grid item xs={12}>   
                                            <div className={classes.textcontainer}>                                    
                                                <TextField
                                                    label="Username"
                                                    onChange={this.onChange}
                                                    value={this.state.newusername}
                                                    id="newusername"
                                                    type="text"
                                                    className={classes.textField}
                                                />
                                                <small className={classes.textfielderror}>
                                                    {newusernameerrors.newusername}                                        
                                                </small>
                                            </div>
                                        </Grid>  
                                        <Grid item xs={12}>                          
                                                <Button
                                                    variant="contained"
                                                    type="submit"
                                                    className={classes.button}
                                                    >
                                                    UPDATE
                                                </Button>
                                        </Grid>
                                    </form>
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
                            <i className="material-icons" >visibility_off</i>
                            <Typography className={classes.heading}>Change Password</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{backgroundColor:"white"}}>
                            <Grid container style={{justifyContent:"center",marginLeft:"25%",marginRight:"25%"}}>
                                <Grid item xs={12}>
                                    <form noValidate onSubmit={this.passwordsubmit} className={classes.container}>
                                        <Grid item xs={3}>
                                            <div className={classes.textcontainer}>  
                                            <TextField
                                                label="Current Password"
                                                onChange={this.onChange}
                                                value={this.state.currentpassword}
                                                id="currentpassword"
                                                type="password"
                                                className={classes.textField}
                                            />
                                            <small className={classes.textfielderror}>
                                                {passworderrors.currentpassword}                                        
                                            </small>
                                            </div>
                                        </Grid>
                                        <Grid item xs={3}>    
                                            <div className={classes.textcontainer}>   
                                            <TextField
                                                label="New Password"
                                                onChange={this.onChange}
                                                value={this.state.newpassword}
                                                id="newpassword"
                                                type="password"
                                                className={classes.textField}
                                            />
                                            <small className={classes.textfielderror}>
                                                {passworderrors.newpassword}                                        
                                            </small>
                                            </div>
                                        </Grid>
                                        <Grid item xs={3}> 
                                            <div className={classes.textcontainer}>  
                                            <TextField
                                                label="Confirm Password"
                                                onChange={this.onChange}
                                                value={this.state.confirmpassword}
                                                id="confirmpassword"
                                                type="password"
                                                className={classes.textField}
                                            />
                                            <small className={classes.textfielderror}>
                                                {passworderrors.confirmpassword}                                        
                                            </small>
                                            </div>
                                        </Grid>
                                        <Grid item xs={3}>                         
                                                <Button
                                                    variant="contained"
                                                    type="submit"
                                                    className={classes.button}
                                                    >
                                                    UPDATE
                                                </Button>
                                        </Grid>
                                    </form> 
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
                            <i className="material-icons" >add_photo_alternate</i>
                            <Typography className={classes.heading}>Change Profile Picture</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{backgroundColor:"white"}}>
                            <Grid container style={{justifyContent:"center",marginLeft:"40%",marginRight:"40%"}}>
                                <Grid item xs={12} >
                                    <form noValidate onSubmit={this.storeimage} className={classes.container}>
                                        <Grid item xs={12}>  
                                            <div className={classes.textcontainer}> 
                                                    <input type="file" onChange={this.changeprofilepic} />
                                                <small className={classes.textfielderror}>
                                                    {picerrors.picupdate}                                        
                                                </small>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                                <Button
                                                    variant="contained"
                                                    type="submit"
                                                    className={classes.button}
                                                    >
                                                    UPDATE
                                                </Button>
                                        </Grid>
                                    </form>
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
                            <i className="material-icons" >people</i>
                            <Typography className={classes.heading}>Add new user</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{backgroundColor:"white"}}>
                            <Grid container style={{justifyContent:"center",marginTop:"3%",marginLeft:"25%",marginRight:"25%"}}>
                                <Grid item xs={12}>
                                    <form noValidate onSubmit={this.newusersubmit} className={classes.container}> 
                                        <Grid item xs={12} style={{marginBottom:"3%",textAlign:"center"}}>
                                            <div className={classes.logo}>                    
                                                <img className={classes.logoimg} src={newuser} alt="img"  />  
                                            </div>  
                                            <p className={classes.userlogin}><b>REGISTER USER</b></p>
                                        </Grid>  
                                        <Grid item xs={4}>
                                            <div className={classes.textcontainer}>  
                                                <div>
                                                    <label htmlFor="newusername">Username</label>
                                                </div>
                                                <TextField
                                                    onChange={this.onChange}
                                                    value={this.state.newuserusername}
                                                    id="newuserusername"
                                                    type="text"
                                                    className={classes.textField}
                                                />
                                                {<small className={classes.textfielderror}>
                                                    {registererrors.username}                                        
                                                </small>}
                                            </div>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <div className={classes.textcontainer}>  
                                                <div>
                                                    <label htmlFor="newuserpassword">Password</label>
                                                </div>
                                                <TextField
                                                    onChange={this.onChange}
                                                    value={this.state.newuserpassword}
                                                    id="newuserpassword"
                                                    type="password"
                                                    className={classes.textField}
                                                />
                                                <small className={classes.textfielderror}>
                                                    {registererrors.password}                                        
                                                </small>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <div className={classes.textcontainer}>  
                                                <div>
                                                    <label htmlFor="newuserpassword2">Confirm Password</label>
                                                </div>
                                                <TextField
                                                    onChange={this.onChange}
                                                    value={this.state.newuserpassword2}
                                                    id="newuserpassword2"
                                                    type="password"
                                                    className={classes.textField}
                                                />
                                                <small className={classes.textfielderror}>
                                                    {registererrors.password2}                                        
                                                </small>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <div className={classes.textcontainer}>  
                                                <div>
                                                    <label htmlFor="newuserfirstname">First Name</label>
                                                </div>
                                                <TextField
                                                    onChange={this.onChange}
                                                    value={this.state.newuserfirstname}
                                                    id="newuserfirstname"
                                                    type="text"
                                                    className={classes.textField}
                                                />
                                                <small className={classes.textfielderror}>
                                                    {registererrors.firstname}                                        
                                                </small>
                                            </div>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <div className={classes.textcontainer}>  
                                                <div>
                                                    <label htmlFor="newuserlastname">Last Name</label>
                                                </div>
                                                <TextField
                                                    onChange={this.onChange}
                                                    value={this.state.newuserlastname}
                                                    id="newuserlastname"
                                                    type="text"
                                                    className={classes.textField}
                                                />
                                                <small className={classes.textfielderror}>
                                                    {registererrors.lastname}                                        
                                                </small>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <div className={classes.textcontainer}>                                     
                                                <div>
                                                    <label htmlFor="newuseremail">Email</label>
                                                </div>
                                                <TextField
                                                    onChange={this.onChange}
                                                    value={this.state.newuseremail}
                                                    id="newuseremail"
                                                    type="email"
                                                    className={classes.textField}
                                                />
                                                <small className={classes.textfielderror}>
                                                    {registererrors.email}                                        
                                                </small>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <div className={classes.textcontainer}>  
                                                <div>
                                                    <label htmlFor="newusertelno">Telephone No</label>
                                                </div>
                                                <TextField
                                                    onChange={this.onChange}
                                                    value={this.state.newusertelno}
                                                    id="newusertelno"
                                                    type="tel"
                                                    className={classes.textField}
                                                />
                                                <small className={classes.textfielderror}>
                                                    {registererrors.telno}                                        
                                                </small>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <div className={classes.textcontainer}>  
                                                <div>
                                                    <label htmlFor="newusernic">NIC</label>
                                                </div>
                                                <TextField
                                                    onChange={this.onChange}
                                                    value={this.state.newusernic}
                                                    id="newusernic"
                                                    type="text"
                                                    className={classes.textField}
                                                />  
                                                <small className={classes.textfielderror}>
                                                    {registererrors.nic}                                        
                                                </small> 
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div className={classes.textcontainer}>  
                                                <div>
                                                    <label htmlFor="newuseraddress">Address</label>
                                                </div>
                                                <TextField
                                                    onChange={this.onChange}
                                                    value={this.state.newuseraddress}
                                                    id="newuseraddress"
                                                    type="text"
                                                    className={classes.textField}
                                                />
                                                <small className={classes.textfielderror}>
                                                    {registererrors.address}                                        
                                                </small>
                                                </div>
                                        </Grid>
                                        <Grid item xs={12}>                          
                                                <Button
                                                    variant="contained"
                                                    type="submit"
                                                    className={classes.button}
                                                    style={{width:"25%",float:"right"}}
                                                    >
                                                    SUBMIT
                                                </Button>
                                        </Grid>
                                    </form> 
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    {/*
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
                            <Grid container style={{justifyContent:"center",marginLeft:"25%",marginRight:"25%"}}>
                                <Grid item xs={3}>                         
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            color="secondary"                                            
                                            onClick={this.handleClickOpen}
                                            >
                                            <i className="material-icons">delete_forever</i>
                                            Delete Account
                                        </Button>                                                                       
                                                            
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
                                        content including avatars and profile settings. 
                                        Are you really sure you want to delete your account?
                                    </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>                          
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            onClick={this.handleClose}
                                            >
                                            Disagree
                                        </Button>                         
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            type="submit"
                                            onClick={this.deleteaccount}
                                            autoFocus
                                            >
                                            Agree
                                        </Button>
                                    
                                    </DialogActions>
                                </Dialog>
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    */}
                    <div className="bottom">
                        <Footer />
                    </div>
                    
                    </div>
            
            );
        
    }else{
        return(
            <div>                
                <Redirect to={{
                    pathname:"/login",
                    state:{expire:"Session expired please login again"}
                    }}/>
                
            </div>
        )
    }

    }

}
UpdateProfile.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(useStyles)(UpdateProfile);