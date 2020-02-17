import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Card,CardContent,CardActions } from '@material-ui/core';
import Button from "@material-ui/core/Button";
//import Notifier,{openNotifier} from '../Notifier/Notifier';
import TextField from "@material-ui/core/TextField";
import { withStyles } from '@material-ui/core';
import Modal from "@material-ui/core/Modal";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
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
        height:'100%',
        overflow:'auto'
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
    formControl: {
        marginLeft:theme.spacing(8),
        width:'80%',
        marginBottom:theme.spacing(4),
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
            statusError:''
        }
    }

    onChange = (e) => {        
        this.setState({[e.target.id] : e.target.value});
    }
    handleChange = (e) =>{
        e.preventDefault();
        this.setState({area:e.target.value});
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
                  // openNotifier({msg:"sucess"});                              
                   this.setState({open:false});
                   this.props.history.push("/admin/customers");
                }
                else {
                    if(res.status === 404){
                        this.setState({statusError:"shop Name exists"})
                      //  openNotifier({msg:"Error Already Exists"});
                     }
                     else if(res.status ===400){
                        this.setState({statusError:"Network Error"})
                         //openNotifier({msg:"Error"});
                     }
                    const error = new Error(res.error);
                    throw error;
                }
             })
            .catch(err => {
                //openNotifier({msg:"Error"});
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
        const areaDetails = ["Matara","Galle","Colombo","Jaffna","Kandy","Gampaha","Hambanthota","Wellawaya","Badulla","Pitigala","Ambalangoda","Kaluthara","Horana","Diwulapitiya","Chilwa","Piththalam","Anuradhapura","Polonaruwa","Kuliyapitiya","Kurunagala","Mathale","Kegalle","Awissawella","Rathnapura","Negambo","Homgama"];
            const { classes } = this.props;
            const { shop,type,area,address,phoneNo,name,email,route,open,isExpire,errors,statusError } = this.state;
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
                                    <FormHelperText id="component-error-text" className={classes.textfielderror}> {statusError}</FormHelperText>
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
                                    {/* <TextField
                                        required
                                        id="area"
                                        label="Area"
                                        value={area}
                                        type="text"
                                        onChange={this.onChange}
                                        className={classes.textField}
                                        variant="outlined"
                                        margin="normal"       
                                    /> */}
                                     <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="age-simple" >Select Area</InputLabel>
                                        <Select
                                            value={area}
                                            onChange={this.handleChange}   
                                            style={{textAlign:"left"}}                
                                        >
                                            {areaDetails.map((Area,i)=>
                                                <MenuItem key={i} value={Area}>{Area}</MenuItem> 
                                            )}
                                        
                                        </Select>
                                    </FormControl>  
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
                                        {/* <Notifier/> */}
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