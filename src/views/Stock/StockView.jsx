import React from 'react';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import Modal from "@material-ui/core/Modal";
import Button from '@material-ui/core/Button';
import { Card,CardContent,CardActions } from '@material-ui/core';
import StockTable from './StockTable';
import { Icon } from "@material-ui/core";
 const useStyles = theme =>({
    buttonprint:{
        backgroundColor:"#DCDCDC",
        float:"right",
        marginBottom:10
    },
    button:{
      //  color:theme.palette.common.white,
        // backgroundColor:"#1b5e20",
        // '&:hover':{
        // backgroundColor:"#8EB69B",
        // },
        width:'20%',
        marginRight:theme.spacing(2)
       
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalCard: {
        width: '100%',
        height:'100%',
        maxWidth: 900,
        overflow:'auto'
    },
    modalCardContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    imgshadow:{
        margin: "10px auto 0",
        overflow: "hidden",
        maxWidth: "180px",
        boxShadow: "0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
        maxHeight: "180px",
        borderRadius: "50%"
    },
    img:{
        width: "100%",
        height: "100%"
    },
    user:{
        fontSize:19,
        color: "#1b5e20"
    },
    typography:{
        margin:'3px'
    }

})


 class StockView extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            salesRep:[],
            isExpire:false,
            value:2,
            open:true,
           
        };  
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);   
    }

    openModal = () => {
        this.setState({open:true});
    }

    closeModal = () => {
        this.setState({open:false});
        this.props.history.push("/admin/stock");
    }
    printreport=()=>{
        const content = document.getElementById('reporttoprint').innerHTML;   
        const orderHtml = ' <html><head><title></title><style>table {line-height:1;}</style></head><body>' + content + '</body></html>';
        document.body.innerHTML = orderHtml;        
        window.location.reload();
        window.print();  
    }
    render(){
        const { classes } = this.props;
        if(!this.state.isExpire){
            return(
                <Modal
                    className={classes.modal}
                    open={this.state.open}
                    onClose={this.closeModal}
                    BackdropProps={{
                        style: {
                          opacity:'0.5'
                        }
                    }}
                >
                    <Card className={classes.modalCard}>
                        <CardContent className={classes.modalCardContent}>  
                        <div>
                            <Button className={classes.buttonprint} onClick={this.printreport} ><Icon style={{fontSize:40}}>printer</Icon>Print</Button>
                        </div>                            
                            <StockTable/>
                           
                        </CardContent>
                        <CardActions  style={{justifyContent:'right'}}>
                            <Button 
                                className={classes.button}
                                onClick={this.closeModal} 
                                variant='contained'
                            >
                                Close
                            </Button>
                        </CardActions>
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
export default withStyles(useStyles)(StockView);