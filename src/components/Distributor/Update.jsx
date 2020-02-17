import React from 'react';
import Axios from 'axios';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Redirect } from 'react-router-dom';
import { Card,CardContent,CardActions } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from '@material-ui/core';
import Modal from "@material-ui/core/Modal";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

const useStyles = (theme) => ({

    textField: { 
        marginLeft:theme.spacing(8),
        width:'80%',
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
        height :"100%",
        overflow:'auto',
        maxWidth: 700,
    },
    modalCardContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    marginTop: {
        marginTop: theme.spacing(2),
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

 class Update extends React.Component {

    constructor(props){
        super(props);
        this.state = {

            userName:'',
            fullName:'',
            area:'',
            address:'',
            phoneNo:'',
            warehouse:'',
            email:'',
            salesrep:'',
            open:true,
            isExpire:false,
            errors:{},
            salesreps:[]
        };
        this.onChange   = this.onChange.bind(this);
        this.onSubmit   = this.onSubmit.bind(this);
        this.openModal  = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleChangeArea = this.handleChangeArea.bind(this);
        this.handleChangeSalesrep=this.handleChangeSalesrep.bind(this);
    }

    onChange = (e) => {
        this.setState({[e.target.id] : e.target.value});
    }
    
    handleChangeArea = (e) =>{
        e.preventDefault();
        this.setState({area:e.target.value});
    }
    handleChangeSalesrep = (e) =>{
         e.preventDefault();
         this.setState({salesrep:e.target.value});
     }

    componentDidMount(){
        
        const {match:{params}} =this.props;
        var token=localStorage.getItem("jwtToken");
        Axios
            .get(`/distributors/${params.id}`,{
                headers:{
                    'Authorization':token
                }
            })
            .then(res => {
                this.setState({
                    userName:res.data.userName,
                    fullName:res.data.fullName,
                    area:res.data.area,
                    address:res.data.address,
                    phoneNo:res.data.phoneNo,
                    warehouse:res.data.warehouse,
                    email:res.data.email,
                    salesrep:res.data.salesrep
                });
            })
            .catch(err=>{
                if(err.tokenmessage){
                    console.log(err.tokenmessage);
                    this.setState({isExpire:true}) ; 
                }
            })
        Axios
            .get('/salesreps',{
              headers:{
                'Authorization':token
              }
            })
            .then(res => {
              this.setState({
                salesreps : res.data,
              });
          //    console.log(this.state.salesReps);
            })
            .catch(err => {
              if(err.tokenmessage){
                //console.log(err.tokenmessage);
                this.setState({isExpire:true});
              }
            })
    }

    onSubmit = (e) => {

        e.preventDefault();
        const {match:{params}} =this.props;
        var token = localStorage.getItem('jwtToken')
        const distributor = {

            userName : this.state.userName,
            fullName : this.state.fullName,
            area     : this.state.area,
            address  : this.state.address,
            phoneNo  : this.state.phoneNo,
            warehouse : this.state.warehouse,
            email    : this.state.email,
            salesrep  :this.state.salesrep
        };
       
        Axios
            .put(`/distributors/update/${params.id}`,distributor,{
                headers:{
                    'Authorization':token
                }
            })
            .then(res => {
                if(res.status===200){
                    //console.log(res.data);
                    this.setState({open:false});
                    this.props.history.push("/admin/distributors");   
                }
                else{
                    console.log(res.error);
                    const error = new Error(res.error);
                    throw error;
                }
            })
            .catch(err => {
                this.setState({errors:err.response.data});
                if(err.tokenmessage){
                    console.log(err.tokenmessage);
                    this.setState({isExpire:true}) ; 
                }
            })
    }

    openModal = () => {
        this.setState({open:true});
    }

    closeModal = () => {
        this.setState({open:false});
        this.props.history.push("/admin/distributors");
    }

    render() {
        const areaDetails = ["Matara","Galle","Colombo","Jaffna","Kandy","Gampaha","Hambanthota","Wellawaya","Badulla","Pitigala","Ambalangoda","Kaluthara","Horana","Diwulapitiya","Chilwa","Piththalam","Anuradhapura","Polonaruwa","Kuliyapitiya","Kurunagala","Mathale","Kegalle","Awissawella","Rathnapura","Negambo","Homgama"];
        const { classes } = this.props;
        const { userName,fullName,area,address,phoneNo,warehouse,email,salesrep,salesreps,open,isExpire,errors } = this.state;
        if(!isExpire){
        return (
            <Modal 
                className={classes.modal}
                onClose={this.closeModal}
                open={open}
                BackdropProps={{
                    style: {
                      opacity:'0.5'
                    }
                  }}       
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
                            <FormHelperText id="component-error-text" className={classes.textfielderror}> {errors.address}</FormHelperText>
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
                                    onChange={this.handleChangeArea}   
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
                                label="warehouse"
                                value={warehouse}
                                type="text"
                                onChange={this.onChange}
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                            />
                            <FormHelperText id="component-error-text" className={classes.textfielderror}> {errors.warehouse}</FormHelperText>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-simple" >Select Salesrep</InputLabel>
                                <Select
                                    value={salesrep}
                                    onChange={this.handleChangeSalesrep}   
                                    style={{textAlign:"left"}}                
                                >
                                    <MenuItem value={''}>Default</MenuItem> 
                                    {salesreps.map(rep=>
                                        <MenuItem key={rep._id} value={rep.userName}>{rep.userName}</MenuItem> 
                                    )}
                                
                                </Select>
                            </FormControl>  

                            {/* <TextField
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
                            /> */}
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
export default withStyles(useStyles)(Update);
