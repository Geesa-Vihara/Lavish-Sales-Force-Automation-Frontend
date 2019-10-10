import React from 'react';
import { withStyles } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import ReactFusioncharts from "react-fusioncharts";
// import { Card,CardContent,CardHeader } from '@material-ui/core';
 import Grid from '@material-ui/core/Grid';
 import  salesrepMonthlySales from "variables/salesrepSales.jsx";


const useStyles = theme =>({

    paper:{
        width:'100%',
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
        fontSize:20,
        color: "#1b5e20"
    },
    typography:{
        margin:'5px'
    }

})
 class View extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            salesRep:[],
            isExpire:false,
            value:2,

        };
        
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
                console.log(this.state.salesReps);
            })
            .catch(err => {
                if(err){
                    console.log(err.message);
                    this.setState({isExpire:true});
                }
            })
    }
    
    render() {
        const { classes } = this.props;
        const { salesRep } = this.state;
        if(!this.state.isExpire){
            return (
                 <div>
                    <Paper>
                        <div className={classes.imgshadow}>                    
                            <img className={classes.img} src={`/getimage/${localStorage.getItem("jwtToken")}`}alt="img"/> 
                        </div> 
                        <div style={{textAlign:"center"}}>
                            <p className={classes.user}><b>{salesRep.fullName}</b></p>
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Typography >Rating</Typography>
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
                    {/* </Paper> */}
                        <Grid item xs={24} style={{height:500}}>
                            <ReactFusioncharts
                                type='column2d'
                                width='70%'
                                height='400'
                                dataFormat='JSON'
                                dataSource={salesrepMonthlySales}  
                            />
                        </Grid>
                    </Paper>
                </div>
            )
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
