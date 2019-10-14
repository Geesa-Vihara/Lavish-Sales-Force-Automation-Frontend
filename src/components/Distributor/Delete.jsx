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
        this.deleteDistributor = this.deleteDistributor.bind(this);
    }

    openDialog = () => {
        this.setState({open:true});
    }

    closeDialog = () => {
        this.setState({open:false});
        this.props.history.push("/admin/distributors");
    }

    deleteDistributor = (e) => {

        e.preventDefault();
        const {match:{params}} =this.props;
        var token = localStorage.getItem('jwtToken');
        Axios
            .delete(`/distributors/delete/${params.id}`,{
                headers:{
                    'Authorization':token
                }
            })
            .then(res => {
                console.log('distributor deleted');
                this.setState({open:false});
                this.props.history.push('/admin/distributors');
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
                    <DialogTitle style={{color:"red"}} >{'Are you sure you want to delete the distributor?'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            This action will permanantly delete all data about the distributor. 
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
                            onClick={this.deleteDistributor}
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
