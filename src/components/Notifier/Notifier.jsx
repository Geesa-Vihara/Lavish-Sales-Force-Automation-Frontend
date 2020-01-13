import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

let openSnackbarFun;
class  Notifier extends React.Component{
     
    
    state = {
        isOpen : false,
        msg:'',
    };

    componentDidMount(){
        openSnackbarFun = this.openNotifier;
    }

    openNotifier = ({msg}) => {
        this.setState({
            isOpen:true,
            msg
        });
    }
    handleClose = ()=> {
        this.setState({
            isOpen:false,
            msg:''
        });
    }
    render(){

        return(
            <div>
                <Snackbar
                    style={{color:'white'}}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={this.state.isOpen}
                    autoHideDuration={5000}
                    onClose ={this.handleClose}
                >
                    <SnackbarContent
                        style={{backgroundColor:'#1b5e20',justifyContent:"center",fontSize:'17px',}}
                        message={this.state.msg}
                    />
                </Snackbar>
            </div>
        );
    }
} 
export function openNotifier({ msg }) {
    openSnackbarFun({ msg });
  }

  export default Notifier;