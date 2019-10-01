import React, {Component} from "react";
import avatar from "assets/img/faces/lavish.jpg";
import Footer from "components/Footer/Footer";
import axios from "axios"
import Button from '@material-ui/core/Button';
import { withStyles,createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ThemeProvider } from '@material-ui/styles';
import { teal} from '@material-ui/core/colors';
import  { Link}  from 'react-router-dom';

const useStyles = theme => ({
    container:{
        margin: " -50px auto 0",
        color: "rgba(0, 0, 0, 0.87)",
        backgroundColor: "rgb(255, 255, 255)",
        width: "450px",
        height: "600px",
        borderRadius: "6px",
        boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)"
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
    textcontainer: {
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom:30
      },
    textField: {
        marginLeft: theme.spacing(10),        
        width: 300,     
    },
    textfielderror: {
        marginLeft: theme.spacing(10),        
        color:"red"
    },
    heading:{
        textAlign:"center",
        marginBottom:20
    },
    headingsuccess:{
        textAlign:"center",
        marginBottom:10,
        color:"green"
},
    headingerror:{
        textAlign:"center",
        marginBottom:10,
        color:"red"
},
    userlogin:{
        fontSize:17,
        color: "#2bbbad"
    },
    button:{
        marginLeft: theme.spacing(10),
        width: 300,
        height:45,
        borderRadius: "3px",
        letterSpacing: "1.5px",
        marginTop: "1rem"     
    },
    forgot:{
        textAlign: "center",
        marginLeft: theme.spacing(10),
        marginRight: theme.spacing(10),
        marginBottom:theme.spacing(3)
    }, 
         
  });
  const theme = createMuiTheme({
    palette: {
      primary: teal,
    },
  });

class ResetPassword extends Component{

    constructor() {
        super();
        this.state = {
          password: "",          
          errors: {},
          success:{}
        };        
      }
    onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            password: this.state.password, 
            token: this.props.match.params.token          
        };
        
        axios.post('/resetpassword',userData).then(res => { 
            
            if(res.status===200){                                             
                this.setState({success:res.data})                        
                }else{
                    const error = new Error(res.error);
                    throw error;
                }          
            
        })
        .catch(err => {          
           this.setState({errors:err.response.data}) ;                   
          
        }); 
        
    };

    render(){
        const { errors,success } = this.state;
        const { classes } = this.props;
        return(
            <div style={{ marginTop: "8rem"}}>
                <div className={classes.container}>
                    <div className={classes.logo}>                    
                        <img className={classes.logoimg} src={avatar} alt="img" />                    
                    </div> 
                    <div className={classes.heading}>             
                        <p className={classes.userlogin}><b>RESET YOUR PASSWORD</b></p>
                        <label >Welcome to Lavish Tea Pvt LTD<br />
                            <small >Sales Force Automation System</small><br/>
                        </label> 
                    </div> 
                    <form noValidate onSubmit={this.onSubmit}>
                        <div className={classes.headingsuccess}> 
                            <span>
                              <b>  {success.correct}</b>                                     
                            </span>
                        </div>
                        <div className={classes.headingerror}> 
                            <span>
                                {errors.incorrect}                                     
                            </span>
                        </div>
                        <div className={classes.heading}>    
                        </div>
                        <div className={classes.textcontainer}>     
                            <b className={classes.forgot}>Enter new password before the link recieved expires.</b>                    
                            <TextField
                                id="password"
                                label="Change Password"
                                onChange={this.onChange}
                                value={this.state.password}                              
                                type="password"
                                className={classes.textField}                                
                            />
                            <span className={classes.textfielderror}>
                                {errors.password}                                        
                            </span> 
                        </div>
                        <ThemeProvider theme={theme}>                           
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                className={classes.button}
                                >
                                CHANGE PASSWORD
                            </Button>
                        </ThemeProvider>
                        <div className={classes.forgot}>
                            <Link to="/login"><small><i className="material-icons" >keyboard_backspace</i><b>Back to Login</b></small> </Link>                    
                        </div> 
                    </form>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
         
        )
        
            
        
    }

}

export default withStyles(useStyles)(ResetPassword);