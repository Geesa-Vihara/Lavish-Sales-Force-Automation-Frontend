import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Card,CardContent,CardActions } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import Notifier,{openNotifier} from '../Notifier/Notifier';
import TextField from "@material-ui/core/TextField";
import { withStyles } from '@material-ui/core';
import Modal from "@material-ui/core/Modal";

const useStyles = theme => ({
    
    textField: { 
        marginLeft:theme.spacing(8),
        width:'80%',
        marginTop:theme.spacing(1),
     
    },
    actionbuttons:{
        marginLeft:theme.spacing(7),
        marginRight:theme.spacing(8),
    },
    buttonsave:{
        color:theme.palette.common.white,
        backgroundColor:"#1b5e20",
        '&:hover':{
        backgroundColor:"#8EB69B",
        },
        width:'100%'
    },
    buttonclose:{          
        width:'100%'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalCard: {
        width: '90%',
        maxWidth: 700,
      //  height:'100%',
       // overflow:'auto'
    },
    modalCardContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    marginTop: {
        marginTop: theme.spacing(1),
    },
    textfielderror: {
        marginLeft: theme.spacing(8), 
        marginTop:theme.spacing(0) ,    
        color:"red"
    },
});

class Add extends React.Component{

    constructor(){
        super()
        this.state={
            userName:'',
            fullName:'',
            area:'',
            address:'',
            phoneNo:'',
            email:'',
            warehouse:'',
            password:'',
            confirmPassword:'',
            open:true,
            isExpire:false,
            errors:{},
        }
    }

    onChange = (e) => {        
        this.setState({[e.target.id] : e.target.value});
    }

    onSubmit =(e) => {
        e.preventDefault();
        var token = localStorage.getItem('jwtToken')
        const distributor = {
            userName : this.state.userName,
            fullName : this.state.fullName,
            area     : this.state.area,
            address  : this.state.address,
            phoneNo  : this.state.phoneNo,
            warehouse  : this.state.warehouse,
            email    : this.state.email,
            password : this.state.password,
            confirmPassword : this.state.confirmPassword
        };        
        Axios
            .post('/distributors/add',distributor,{
                headers:{
                    'Authorization':token
                }
            })
            .then(res => {
                if(res.status===200){                                
                    openNotifier({msg:"sucess"});
                   this.setState({open:false});
                   this.props.history.push("/admin/distributors");
                }
                else {
                    if(res.status === 404){
                        openNotifier({msg:"Error Already Exists"});
                     }
                     else if(res.status ===400){
                         openNotifier({msg:"Error"});
                     }
                    const error = new Error(res.error);
                    throw error;
                }
             })
            .catch(err => {
                openNotifier({msg:"Error"});
                this.setState({errors:err.response.data}) ; 
               // console.log(err.response.data)
                if(err.tokenmessage){
                    console.log(err.tokenmessage);
                    this.setState({isExpire:true}) ; 
                }
             })
    }

    openModal = () =>{
        this.setState({open:true});
    }

    closeModal = () =>{
        this.setState({open:false});
        this.props.history.push("/admin/distributors");
    }

    render(){
      
            const { classes } = this.props;
            const { userName,fullName,area,address,phoneNo,warehouse,email,password,confirmPassword,open,isExpire,errors } = this.state;
            if(!isExpire){
                return ( 
                    <Modal 
                        className={classes.modal}
                        onClose={this.closeModal}
                        open={open}           
                    >
                        <Card className={classes.modalCard}>
                            <form noValidate onSubmit={this.onSubmit} >
                                <CardContent className={classes.modalCardContent}>
                                    <TextField
                                        required
                                        autoFocus
                                        id="userName"
                                        label="User Name"
                                        value={userName}
                                        onChange={this.onChange}
                                        className={classes.textField}
                                        variant="outlined"
                                        margin="normal"
                                        type="text"
                                    />
                                    <FormHelperText id="component-error-text" className={classes.textfielderror}> {errors.userName}</FormHelperText>
                                    <TextField
                                        required
                                        id="fullName"
                                        label="Full Name"
                                        value={fullName}
                                        type="text"
                                        onChange={this.onChange}
                                        className={classes.textField}
                                        variant="outlined"
                                        margin="normal"
                                    />
                                    <FormHelperText id="component-error-text" className={classes.textfielderror}> {errors.fullName}</FormHelperText>
                                    <TextField
                                        required
                                        id="address"
                                        label="Address"
                                        value={address}
                                        type="text"
                                        onChange={this.onChange}
                                        className={classes.textField}
                                        variant="outlined"
                                        margin="normal"  
                                    />
                                    <FormHelperText id="component-error-text" className={classes.textfielderror}>{errors.address}</FormHelperText>
                                    <TextField
                                        required
                                        id="area"
                                        label="Area"
                                        value={area}
                                        type="text"
                                        onChange={this.onChange}
                                        className={classes.textField}
                                        variant="outlined"
                                        margin="normal"       
                                    />
                                    <FormHelperText id="component-error-text" className={classes.textfielderror}> {errors.area}</FormHelperText>
                                    <TextField
                                        required
                                        id="phoneNo"
                                        label="Phone Number"
                                        value={phoneNo}
                                        type="text"
                                        onChange={this.onChange}
                                        className={classes.textField}
                                        variant="outlined"
                                        margin="normal"
                                    />
                                    <FormHelperText id="component-error-text" className={classes.textfielderror}> {errors.phoneNo}</FormHelperText>
                                    <TextField
                                        id="email"
                                        label="Email"
                                        value={email}
                                        onChange={this.onChange}
                                        className={classes.textField}
                                        variant="outlined"
                                        margin="normal"
                                        type="email"
                                    />
                                    <FormHelperText id="component-error-text" className={classes.textfielderror}> {errors.email}</FormHelperText>
                                    <TextField
                                        required
                                        id="warehouse"
                                        label="Warehouse"
                                        value={warehouse}
                                        type="text"
                                        onChange={this.onChange}
                                        className={classes.textField}
                                        variant="outlined"
                                        margin="normal"
                                    />
                                    <FormHelperText id="component-error-text" className={classes.textfielderror}> {errors.nic}</FormHelperText>
                                    <TextField
                                        required
                                        id="password"
                                        label="Password"
                                        value={password}
                                        onChange={this.onChange}
                                        className={classes.textField}
                                        variant="outlined"
                                        margin="normal"
                                        type="password"
                                    />
                                    <FormHelperText id="component-error-text" className={classes.textfielderror}> {errors.password}</FormHelperText>
                                    <TextField
                                        required
                                        id="confirmPassword"
                                        label="Confirm Password"
                                        value={confirmPassword}
                                        onChange={this.onChange}
                                        className={classes.textField}
                                        variant="outlined"
                                        margin="normal"
                                        type="password"
                                    />
                                    <FormHelperText id="component-error-text" className={classes.textfielderror}> {errors.confirmPassword}</FormHelperText>
                                    <CardActions className={classes.actionbuttons}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            className={classes.buttonsave} 
                                        >
                                        Save
                                        </Button>
                                        <Button
                                            variant="contained"
                                            className={classes.buttonclose}  
                                            onClick={this.closeModal}
                                        >
                                        Close
                                        </Button>
                                        <Notifier/>
                                    </CardActions>
                                </CardContent>
                            </form>
                        </Card>
                    </Modal>     
                );
            }
            else{
                return(
                  <small>                
                      <Redirect to={{
                          pathname:"/login",
                          state:{expire:"Session expired please login again"}
                          }}/>
                      
                  </small>
                )
              }
        }
}
export default withStyles(useStyles)(Add)