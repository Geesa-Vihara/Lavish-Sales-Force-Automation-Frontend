import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import Modal from "@material-ui/core/Modal";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import { Card,CardContent,CardActions } from '@material-ui/core';

charts(FusionCharts);
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
        fontSize:20,
        color: "#1b5e20",
        //marginLeft:"50px"
    },
    typography:{
        margin:'3px'
    },
    card:{
      //  minWidth: 80,
        //minHeight: 60,
        marginBottom:15,

    }

})


 class View extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            salesRep:[],
            monthlySales:[],
            salesByMonth:{},
            isExpire:false,
            rateValue:0,
            open:true,
            monthlyRate:[]
           
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
                this.setState({salesRep : res.data  });
                // this.setState({
                //     rateValue :(this.state.totalOrders/this.state.totalCustomers)
                // });
               // console.log(res.data);
            })
            .catch(err => {
                if(err.tokenmessage){
                    console.log(err.tokenmessage);
                    this.setState({isExpire:true});
                }
                console.log(err);
            })
        Axios
            .get(`/salesreps/monthlySales/${params.id}`,{
                headers :{
                    'Authorization':token
                }
            })
            .then(res => {
                if(res.data.length!==0){
                    this.setState({ monthlySales:res.data });
                  //  console.log("monthly=");
                  //  console.log(this.state.monthlySales);
                    this.getChartData();
                }
                else{
                    this.setState({monthlySales:{}})
                }
            })
            .catch(err => {
                if(err.tokenmessage){
                    console.log(err.tokenmessage);
                    this.setState({isExpire:true});
                }
                console.log(err);
            });
        Axios
            .get(`/salesreps/rating/${params.id}`,{
                headers:{
                    "Authorization":token
                }
            })
            .then(res =>{
                if(res.data.length!==0){
                    this.setState({monthlyRate:res.data[0]});
                    this.getRating();
                   // console.log("rating =");
                    //console.log(this.state.monthlyRate);
                }
                else{
                    this.setState({monthlyRate:{}})
                }
            })
            .catch(err => {
                if(err.tokenmessage){
                    console.log(err.tokenmessage);
                    this.setState({isExpire:true});
                    }
                console.log(err);
            });

    }
    getChartData = () =>{
        var obj={};
        var month=['jan','feb','mar','Apr','may','jun','jul','aug','sept','nov','dec'];
        this.state.monthlySales.map((sales,i) => {
            obj[month[sales._id-1]] = sales.totalSum;
            return(
                this.setState({salesByMonth:obj})
            )
        })
    }
    getRating = () =>{
        const totalRevenue = this.state.monthlyRate.totalSum;
        var rate = 0;
        if(totalRevenue>25000){
            rate = 5;
        }
        else if(totalRevenue>20000){
            rate = 4.5;
        }
        else if(totalRevenue>15000){
            rate = 4;
        }
        else if(totalRevenue>10000){
            rate = 3;
        }
        else if(totalRevenue>5000){
            rate = 2;
        }
        else if(totalRevenue>500){
            rate = 1;
        }
        else{
            rate = 0;
        }
       // console.log(rate);
        this.setState({rateValue:rate});

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
        const { salesRep,salesByMonth,monthlyRate } = this.state;
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
                            <div style={{textAlign:"center",marginBottom:'20px'}}>
                                <p className={classes.user}><b>{salesRep.fullName}</b></p>
                                <Box component="fieldset" mb={0} borderColor="transparent">
                                    <Rating value={this.state.rateValue} size="large" readOnly />
                                </Box>
                                <Grid container spacing={3} direction="row-reverse" alignItems="center" justify="center">
                                    <Grid item xs={3}  >
                                        <Card  variant="outlined" >
                                            <CardContent>
                                                <Typography styles={{fontSize:'17'}} color="textSecondary">Completed Orders</Typography>
                                                <Typography variant="h5">{monthlyRate.totalOrders}</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={3}  >
                                        <Card  variant="outlined" >
                                            <CardContent>
                                                <Typography styles={{fontSize:'17'}} color="textSecondary">Total Revenue</Typography>
                                                <Typography variant="h5">{monthlyRate.totalSum}</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={3} >
                                        <Card  variant="outlined">
                                            <CardContent>
                                                <Typography styles={{fontSize:'17'}} color="textSecondary"> Total Customers</Typography>
                                                <Typography variant="h5">{salesRep.totalCustomers}</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid> 
                                <Typography className={classes.typography}><b>User Name:</b><label style={{fontSize:"16px"}}>{salesRep.userName}</label></Typography>
                                <Typography className={classes.typography} ><b>Area:</b><label style={{fontSize:"16px"}}>{salesRep.area}</label></Typography >
                                <Typography className={classes.typography} ><b>Email:</b><label style={{fontSize:"16px"}}>{salesRep.email}</label></Typography >
                                <Typography className={classes.typography}><b>Phone no:</b><label style={{fontSize:"16px"}}>{salesRep.phoneNo}</label></Typography >
                                <Typography className={classes.typography}><b>NIC:</b><label style={{fontSize:"16px"}}>{salesRep.nic}</label></Typography >
                                <Typography className={classes.typography}><b>Address:</b><label style={{fontSize:"16px"}}>{salesRep.address}</label></Typography >
                                {/* <Typography className={classes.typography}><b>Distributor:</b><label style={{fontSize:"16px"}}>Namal perera</label></Typography > */}
                            </div> 
                                       
                            <ReactFusioncharts
                                type='line'
                                width='700'
                                height='500'
                                dataFormat='JSON'
                                dataSource={{
                                    chart: {
                                        caption:"Monthly Average sales",
                                        subcaption:this.state.monthlySales.salesYear,
                                      //  xAxisName:"Month",
                                        yaxisname:"sales",
                                        numbersuffix:'%',
                                        showhovereffect: "1",
                                        drawcrossline: "1",
                                        rotatelabels: "1",
                                        setadaptiveymin: "1",
                                        theme:'fusion',
                                      },
                                      data: [
                                        {
                                          label: "January",
                                          value:salesByMonth['jan']
                                        },
                                        {
                                          label: "February",
                                          value:salesByMonth['feb']
                                        },
                                        {
                                          label: "March",
                                          value:salesByMonth['mar']
                                        },
                                        {
                                          label: "April",
                                          value:salesByMonth['apr']
                                        },
                                        {
                                          label: "May",
                                          value:salesByMonth['may']
                                        },
                                        {
                                          label: "June",
                                          value:salesByMonth['jun']
                                        },
                                        {
                                          label: "July",
                                          value:salesByMonth['jul']
                                        },
                                        {
                                          label: "August",
                                          value:salesByMonth['aug']
                                        },
                                        {
                                          label: "September",
                                          value:salesByMonth['sep']
                                        },
                                        {
                                          label: "October",
                                          value:salesByMonth['oct']
                                        },
                                        {
                                          label: "November",
                                          value:salesByMonth['nov']
                                        },
                                        {
                                          label: "December",
                                          value:salesByMonth['dec']
                                        }
                                      ]
                                  }}
                                
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