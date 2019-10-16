import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle } from '@material-ui/core';

 class Delete extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            open:true,
            isExpire:false
        };
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.deletecustomer = this.deletecustomer.bind(this);
    }

    openDialog = () => {
        this.setState({open:true});
    }

    closeDialog = () => {
        this.setState({open:false});
        this.props.history.push("/admin/customers");
    }

    deleteCustomer = (e) => {

        e.preventDefault();
        const {match:{params}} =this.props;
        var token = localStorage.getItem('jwtToken');
        Axios
            .delete(`/customers/delete/${params.id}`,{
                headers:{
                    'Authorization':token
                }
            })
            .then(res => {
                console.log('customer deleted');
                this.setState({open:false});
                this.props.history.push('/admin/customers');
            })
            .catch(err => {
                if(err.tokenmessage){
                    console.log(err.tokenmessage);
                    this.setState({isExpire:true}) ; 
                }
            });
    }

    render() {
        if(!this.state.isExpire){
            return (
                <Dialog
                    open={this.state.open}
                    onClose={this.closeDialog}
                    BackdropProps={{
                        style: {
                          opacity:'0.5'
                        }
                      }}
                >
                    <DialogTitle style={{color:"red"}} >{'Are you sure you want to delete the customer?'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            This action will permanantly delete all data about the customer. 
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            onClick={this.closeDialog} 
                            variant='contained'
                            type='submit'
                        >
                            Disagree
                        </Button>
                        <Button 
                            onClick={this.deletecustomer}
                            color="secondary"
                            variant='contained'
                            type='submit'
                        >
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
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
export default Delete;
