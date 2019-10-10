import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import Modal from "@material-ui/core/Modal";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import ReactFusioncharts from "react-fusioncharts";
import { Card,CardContent,CardActions } from '@material-ui/core';
import  salesrepMonthlySales from "variables/salesrepSales.jsx";

 const useStyles = theme =>({

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
        maxWidth: 800,
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


 class View extends React.Component {

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

    componentDidMount(){

        const {match:{params}} = this.props;
        var token = localStorage.getItem('jwtToken');
        Axios
            .get(`/salesreps/${params.id}`,{
                headers:{
                    'Authorization':token
                }
            })
            .then(res => {
                this.setState({
                    salesRep : res.data    
                });
                console.log(res.data);
            })
            .catch(err => {
                if(err.tokenmessage){
                    console.log(err.tokenmessage);
                    this.setState({isExpire:true});
                }
                console.log(err);
            })
    }

    openModal = () => {
        this.setState({open:true});
    }

    closeModal = () => {
        this.setState({open:false});
        this.props.history.push("/admin/salesreps");
    }

    render(){
        const { classes } = this.props;
        const { salesRep } = this.state;
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
                            <div className={classes.imgshadow}>                    
                                <img className={classes.img} src={`/getimage/${localStorage.getItem("jwtToken")}`}alt="img"/> 
                            </div> 
                            <div style={{textAlign:"center"}}>
                                <p className={classes.user}><b>{salesRep.fullName}</b></p>
                                <Box component="fieldset" mb={0} borderColor="transparent">
                                    {/* <Typography >Rating</Typography> */}
                                    <Rating value={this.state.value} readOnly />
                                </Box>
                                <Typography ><b>User Name:</b><label>{salesRep.userName}</label></Typography >
                                {/* <Typography ><b>Full Name:</b><label>{salesRep.fullName}</label></Typography > */}
                                <Typography className={classes.typography} ><b>Area:</b><label>{salesRep.area}</label></Typography >
                                <Typography className={classes.typography} ><b>Email:</b><label>{salesRep.email}</label></Typography >
                                <Typography className={classes.typography}><b>Phone no:</b><label>{salesRep.phoneNo}</label></Typography >
                                <Typography className={classes.typography}><b>NIC:</b><label>{salesRep.nic}</label></Typography >
                                <Typography className={classes.typography}><b>Address:</b><label>{salesRep.address}</label></Typography >
                                <Typography className={classes.typography}><b>Distributor:</b><label>Namal perera</label></Typography >
                            </div>
                            <ReactFusioncharts
                                        type='column2d'
                                        width='85%'
                                        height='500'
                                        dataFormat='JSON'
                                        dataSource={salesrepMonthlySales}  
                            
                                    />  
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
export default withStyles(useStyles)(View);