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
        this.deleteSalesrep = this.deleteSalesrep.bind(this);
    }

    openDialog = () => {
        this.setState({open:true});
    }

    closeDialog = () => {
        this.setState({open:false});
        this.props.history.push("/admin/salesreps");
    }

    deleteSalesrep = (e) => {

        e.preventDefault();
        const {match:{params}} =this.props;
        var token = localStorage.getItem('jwtToken');
       // this.setState({status:"inactive"})
        const salesrep = {
            status:"inactive"
        };
        Axios
            .put(`/salesreps/delete/${params.id}`,salesrep,{
                headers:{
                    'Authorization':token
                }
            })
            .then(res => {
                if(res.status===200){
                    console.log(res.data);
                    this.setState({open:false});
                    this.props.history.push('/admin/salesreps');
                }
                else{
                    const error = new Error(res.error);
                    throw error;
                }
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
                    <DialogTitle style={{color:"red"}} >{'Are you sure you want to delete the salesrep?'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            This action will permanantly delete all data about the salesrep. 
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
                            onClick={this.deleteSalesrep}
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
