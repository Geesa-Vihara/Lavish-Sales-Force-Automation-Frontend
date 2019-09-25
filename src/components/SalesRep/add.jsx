import React from 'react';
//import Modal from 'react-modal';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles(theme => ({

    textField: {
        marginLeft:theme.spacing(1)
    },
    button:{
        margin:theme.spacing(1)
    }

}));

class Add extends React.Component{

    
    constructor(){

        super();
        this.state = {
            userName:'',
            fullName:'',
            area:'',
            address:'',
            phoneNo:'',
            nic:'',
            email:'',
            password:'',
            confirmPassword:''

        };
    }

    onChange = (e) => {         // TODO manage all satates using one function 
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);

    }

    onSubmit =(e) =>{
        e.preventDefault();
        const {userName,fullName,area,address,phoneNo,nic,email,password,confirmPassword} = this.state;

        console.log(userName);
        console.log(fullName);
        console.log(area);
    }

    render(){
        const classes = useStyles();
        const {userName,fullName,area,address,phoneNo,nic,email,password,confirmPassword} = this.state;
        return(

            <form>
                <TextField
                    id="userName"
                    label="User Name"
                    value={userName}
                    onChange={this.onChange}
                    className={classes.textField}
                    variant="outlined"
                    margin="normal"
                
            
                />
                <TextField
                    id="fullName"
                    label="Full Name"
                    value={fullName}
                    onChange={this.onChange}
                    className={classes.textField}
                    variant="outlined"
                    margin="normal"
                />
                <TextField
                    id="address"
                    label="Address"
                    value={address}
                    onChange={this.onChange}
                    className={classes.textField}
                    variant="outlined"
                    margin="normal"
                />
                <TextField
                    id="area"
                    label="Area"
                    value={area}
                    onChange={this.onChange}
                    className={classes.textField}
                    variant="outlined"
                    margin="normal"
                
                />
                <TextField
                    id="phoneNo"
                    label="Phone Number"
                    value={phoneNo}
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
                
                />
                <TextField
                    id="nic"
                    label="NIC"
                    value={nic}
                    onChange={this.onChange}
                    className={classes.textField}
                    variant="outlined"
                    margin="normal"
                
                />
                <TextField
                    id="password"
                    label="Password"
                    value={password}
                    onChange={this.onChange}
                    className={classes.textField}
                    variant="outlined"
                    margin="normal"
                
                />
                <TextField
                    id="confirmPassword"
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={this.onChange}
                    className={classes.textField}
                    variant="outlined"
                    margin="normal"
                
                />
                <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    className={classes.button}  
                >
                Submit
                </Button>
            </form>
                
        );
    }          // TODO add form using madao or otherwise


    
}
export default Add;
