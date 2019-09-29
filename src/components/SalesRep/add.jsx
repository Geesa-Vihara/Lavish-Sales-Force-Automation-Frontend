import React from 'react';
import Axios from 'axios';
//material ui
import { Card,CardContent,CardActions,CardHeader } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from '@material-ui/core';
import Modal from "@material-ui/core/Modal";




const useStyles = theme => ({
    
    
    textField: {
        marginLeft:theme.spacing(1),
      //  width:'50%',
       // alignItems: 'center',
        //justifyContent: 'center'
        
    },
    button:{
        margin:theme.spacing(1),
        color: "#018786"
        
    },
     //modal styles
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalCard: {
        width: '90%',
        maxWidth: 700,
    },
    modalCardContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    marginTop: {
        marginTop: 2 * theme.spacing.unit,
    },


});

class Add extends React.Component{
    
    constructor(props){

        super(props);
        this.state = {
            userName:'',
            fullName:'',
            area:'',
            address:'',
            phoneNo:'',
            nic:'',
            email:'',
            password:'',
            confirmPassword:'',
            open:'false'

        };
        
        this.onChange   = this.onChange.bind(this);
        this.onSubmit   = this.onSubmit.bind(this);
        this.openModal  = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    onChange = (e) => {         // TODO manage all satates using one function 
        this.setState({[e.target.id] : e.target.value});
    }

    onSubmit =(e) => {

        e.preventDefault();
        const salesrep = {

            userName : this.state.userName,
            fullName : this.state.fullName,
            area     : this.state.area,
            address  : this.state.address,
            phoneNo  : this.state.phoneNo,
            nic      : this.state.nic,
            email    : this.state.email,
            password : this.state.password,
            confirmPassword : this.state.confirmPassword
        };

        Axios
            .post('http://localhost:8000/salesReps/add',salesrep)
            .then(res => {
                console.log(res.data);
                this.setState({open:'false'});
                this.props.history.push("/");
        
             })
            .catch(err => {
                console.log("Error when submiting data");
             })
    }

    openModal = () =>{
        this.setState({open:true});
    }

    closeModal = () =>{
        this.setState({open:false});
        this.props.history.push("/");
    }

    render(){

        const { classes } = this.props;
        const { userName,fullName,area,address,phoneNo,nic,email,password,confirmPassword,open } = this.state;
        return (
            <div>
            
            <Modal 
                className={classes.modal}
                onClose={this.closeModal}
                open={open}  
                    
            >
                <Card className={classes.modalCard}>
                    <CardHeader>Add Salesresp</CardHeader>
                    <form >
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
                            <TextField
                                required
                                id="nic"
                                label="NIC"
                                value={nic}
                                type="text"
                                onChange={this.onChange}
                                className={classes.textField}
                                variant="outlined"
                                margin="normal"
                            />
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
                            <CardActions>
                                <Button
                                    type="submit"
                                    variant="outlined"
                                    className={classes.button} 
                                    onSubmit={this.onSubmit} 
                                   // onClick={this.closeModal}
                                >
                                Save
                                </Button>
                                <Button
                                    variant="outlined"
                                    //color="primary"
                                    className={classes.button}  
                                    onClick={this.closeModal}
                                >
                                Close
                                </Button>
                            </CardActions>
                        </CardContent>
                    </form>
                </Card>
            </Modal>
        </div>
                
        );
    }          


    
}
//export default Add;
export default withStyles(useStyles)(Add);
