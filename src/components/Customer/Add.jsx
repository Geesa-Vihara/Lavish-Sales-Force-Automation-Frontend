import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Card,CardContent,CardActions } from '@material-ui/core';
import Button from "@material-ui/core/Button";
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
            shop:'',
            type:'',
            name:'',
            area:'',
            address:'',
            phoneNo:'',
            email:'',
            route:'',
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
        const customer = {
            shop : this.state.shop,
            type : this.state.type,
            area : this.state.area,
            route:this.state.route,
            address : this.state.address,
            phoneNo : this.state.phoneNo,
            name : this.state.name,
            email : this.state.email,
        };        
        Axios
            .post('/customers/add',customer,{
                headers:{
                    'Authorization':token
                }
            })
            .then(res => {
                if(res.status===200){                                
                   this.setState({open:false});
                   this.props.history.push("/admin/customers");
                }
                else {
                    const error = new Error(res.error);
                    throw error;
                }
             })
            .catch(err => {
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
        this.props.history.push("/admin/customers");
    }

    render(){
      
            const { classes } = this.props;
            const { shop,type,area,address,phoneNo,name,email,route,open,isExpire,errors } = this.state;
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
                                        id="shop"
                                        label="Shop Name"
                                        value={shop}
                                        onChange={this.onChange}
                                        className={classes.textField}
                                        variant="outlined"
                                        margin="normal"
                                        type="text"
                                    />
                                    <FormHelperText id="component-error-text" className={classes.textfielderror}> {errors.shop}</FormHelperText>
                                    <TextField
                                        required
                                        id="type"
                                        label="Type"
                                        value={type}
                                        type="text"
                                        onChange={this.onChange}
                                        className={classes.textField}
                                        variant="outlined"
                                        margin="normal"
                                    />
                                     <FormHelperText id="component-error-text" className={classes.textfielderror}> {errors.type}</FormHelperText>
                                    <TextField
                                        required
                                        id="name"
                                        label="name"
                                        value={name}
                                        type="text"
                                        onChange={this.onChange}
                                        className={classes.textField}
                                        variant="outlined"
                                        margin="normal"
                                    />
                                    <FormHelperText id="component-error-text" className={classes.textfielderror}> {errors.name}</FormHelperText>
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
                                        id="route"
                                        label="Route"
                                        value={route}
                                        type="text"
                                        onChange={this.onChange}
                                        className={classes.textField}
                                        variant="outlined"
                                        margin="normal"       
                                    />
                                    <FormHelperText id="component-error-text" className={classes.textfielderror}> {errors.route}</FormHelperText>
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