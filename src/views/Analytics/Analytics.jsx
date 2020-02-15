import React from 'react';
import { withStyles,createMuiTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Icon from "@material-ui/core/Icon";
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import {lightGreen} from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import GridList from '@material-ui/core/GridList';
import salesrep from "assets/img/faces/salesrep.png";
import { KeyboardDatePicker,MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import axios from "axios";
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import FusionCharts from "fusioncharts";
import Widgets from "fusioncharts/fusioncharts.widgets";
import ReactFusioncharts from "react-fusioncharts";
import SriLanka from 'fusionmaps/maps/fusioncharts.srilanka';
import FusionMaps from "fusioncharts/fusioncharts.maps";
import { ThemeProvider } from '@material-ui/styles';

ReactFusioncharts.fcRoot(FusionCharts, FusionMaps,SriLanka,FusionTheme);
ReactFusioncharts.fcRoot(FusionCharts, Widgets, FusionTheme);

const useStyles = theme => ({ 
  
  avatar: {
    
    backgroundColor: "transparent",
  },
  inline: {
    display: 'inline',
  },

})
const body = createMuiTheme({
  palette: {
      primary: {500:"rgb(30, 45, 12)"},
  },
  });
class Analytics extends React.Component {
  state = {
    showyear:(new Date()),
    yearprogress:(new Date()).getFullYear(),
    showcoveragedate:(new Date()),
    showproductdatefrom:(new Date()),
    showproductdateto:(new Date()),
    showsalesdatefrom:(new Date()),
    showsalesdateto:(new Date()),
    showoutletdatefrom:(new Date()),
    showoutletdateto:(new Date()),
    yearlySales:[],
    salesByMonth:{},
    products:[],
    sales:[],
    salesByArea:{},
    route:[],
    routeCoverage:{},
    maxRouteVal:0,
    topBestSalesreps :[],
    topLeastSalesreps : [],
    topOutlets:[]
  };
  componentDidMount(){
    const token=localStorage.getItem("jwtToken");    
    const userData={
      year:this.state.showyear
    };
        axios.post('/analytics/yearlysales',userData,{
          headers:{
            "Authorization": token 
            }
        })
          .then(res=>{
            if(res.data.length!==0){
            this.setState({
                yearlySales:res.data
          
          })
          this.getSalesByMonth();
        }}               
          )
          .catch(err=>{
                
                if(err.tokenmessage){
                    this.setState({isexpire:true}) ; 
                }
            })
            axios.get('/analytics/progress',{
              headers:{
                "Authorization": token 
                }
            })
              .then(res=>{
                if(res.data.length===2){
                  if(res.data[0]._id===new Date().getFullYear()){
                    this.setState({
                      progressSales:res.data[0].sum/(res.data[1].sum+res.data[0].sum)*100
                
                  })
                  }else if(res.data[1]._id===new Date().getFullYear()){
                    this.setState({
                      progressSales:res.data[1].sum/(res.data[1].sum+res.data[0].sum)*100
                
                  })
                  }
                
              
            }else if(res.data.length===1){
              if(res.data[0]._id===new Date().getFullYear()){
                this.setState({
                  progressSales:100
            
              })
              }else {
                this.setState({
                  progressSales:0
            
              })
              }
            }else{
              this.setState({
                progressSales:0
          
            })
            }}               
              )
              .catch(err=>{
                    
                    if(err.tokenmessage){
                        this.setState({isexpire:true}) ; 
                    }
                })
                const Data={
                  dateFrom:this.state.showproductdatefrom,
                  dateTo:this.state.showoutletdateto
                }
                axios.post('/analytics/topproduct',Data,{
                  headers:{
                    "Authorization": token 
                   }
                })
                  .then(res=>{
                    if(res.data.length!==0){
                   this.setState({
                       products:res.data[0]
                  
                  }) 
                 } else{
                  this.setState({
                    products:{}
               
               }) 
                }    
                  }               
                  )
                  .catch(err=>{
                        
                        if(err.tokenmessage){
                            this.setState({isexpire:true}) ; 
                        }
                    })
                    const DataUser={
                      dateFrom:this.state.showsalesdatefrom,
                      dateTo:this.state.showsalesdateto
                    }
                    axios.post('/analytics/salesbyarea',DataUser,{
                      headers:{
                        "Authorization": token 
                        }
                    })
                      .then(res=>{
                        if(res.data.length!==0){
                        this.setState({
                            Sales:res.data
                      
                      })
                      this.getSalesByArea();
            
                    }else{
                      this.setState({
                        salesByArea:{}
                  
                  })
                    }
                  }             
                      )
                      .catch(err=>{
                            
                            if(err.tokenmessage){
                                this.setState({isexpire:true}) ; 
                            }
                        })
                        const dataBody={
                          dateTime:this.state.showcoveragedate,                          
                        }
                        axios.post('/analytics/routecoverage',dataBody,{
                          headers:{
                            "Authorization": token 
                            }
                        })
                          .then(res=>{
                            if(res.data.length!==0){
                            this.setState({
                                route:res.data
                          
                          })
                          this.setState({maxRouteVal:res.data[0].sum})
                          this.getRouteCoverage();
                
                        }else{
                          this.setState({
                            routeCoverage:{}
                      
                      })
                        }
                      }             
                          )
                          .catch(err=>{
                                
                                if(err.tokenmessage){
                                    this.setState({isexpire:true}) ; 
                                }
                            })
            
              axios.get("/analytics/topBestSalesrep",{
                headers:{
                  'Authorization':token
                }
              })
              .then(res => {
                this.setState({topBestSalesreps:res.data})
              })
              .catch(err =>{
                if(err.tokenmessage){
                  this.setState({isexpire:true}) ; 
              }
              });

             axios.get("/analytics/topLeastSalesrep",{
                headers:{
                  'Authorization':token
                }
              })
              .then(res => {
                this.setState({topLeastSalesreps:res.data})
              })
              .catch(err =>{
                if(err.tokenmessage){
                  this.setState({isexpire:true}) ; 
              }
              })

              
  }
  getSalesByArea=()=>{
    var obj={};
    this.state.Sales.map((sales,i)=> {        
      obj[sales._id]=sales.sum;
      return(         
        this.setState({salesByArea:obj})
      )
    });
  }
  getRouteCoverage=()=>{
    var obj={};
    this.state.route.map((r,i)=> {        
      obj[r._id]=r.sum;
      return(         
        this.setState({routeCoverage:obj})
      )
    });
  }
  getSalesByMonth=()=>{
    var obj={};
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.state.yearlySales.map((sales,i)=> {        
      obj[monthNames[sales._id-1]]=sales.sum;
      return(         
        this.setState({salesByMonth:obj})
      )
    });
  }
  handleYearChange=(year)=>{
    this.setState({showyear:year})
    const token=localStorage.getItem("jwtToken");    
    const userData={
      year:year
    };
        axios.post('/analytics/yearlysales',userData,{
          headers:{
            "Authorization": token 
            }
        })
          .then(res=>{
            if(res.data.length!==0){
            this.setState({
                yearlySales:res.data
          
          })
          this.getSalesByMonth();
        }else{
          this.setState({
            salesByMonth:{}
      
      })
        }}               
          )
          .catch(err=>{
                
                if(err.tokenmessage){
                    this.setState({isexpire:true}) ; 
                }
            })
            
  }
  
  handleDateChangeCoverage=(date)=>{
    const token=localStorage.getItem("jwtToken");
    this.setState({showcoveragedate:date});   
    const dataBody={
      dateTime:date,                          
    }
    axios.post('/analytics/routecoverage',dataBody,{
      headers:{
        "Authorization": token 
        }
    })
      .then(res=>{
        if(res.data.length!==0){
        this.setState({
            route:res.data
      
      })
      this.getRouteCoverage();

    }else{
      this.setState({
        routeCoverage:{}
  
  })
    }
  }             
      )
      .catch(err=>{
            
            if(err.tokenmessage){
                this.setState({isexpire:true}) ; 
            }
        })
  }
  handleDateChangeProductfrom=(date)=>{
    const token=localStorage.getItem("jwtToken");  
    this.setState({showproductdatefrom:date})
    this.setState({showproductdateto:date})
    const Data={
      dateFrom:date,
      dateTo:date
    }
    axios.post('/analytics/topproduct',Data,{
      headers:{
        "Authorization": token 
       }
    })
      .then(res=>{
        if(res.data.length!==0){
       this.setState({
           products:res.data[0]
      
      }) 
     }  
      else{
        this.setState({
          products:{}
     
     }) 
      }  
      }               
      )
      .catch(err=>{
            
            if(err.tokenmessage){
                this.setState({isexpire:true}) ; 
            }
        })
  }
  handleDateChangeProductto=(date)=>{
    const token=localStorage.getItem("jwtToken");    
    this.setState({showproductdateto:date})
    const Data={
      dateFrom:this.state.showproductdatefrom,
      dateTo:date
    }
    axios.post('/analytics/topproduct',Data,{
      headers:{
        "Authorization": token 
       }
    })
      .then(res=>{
        if(res.data.length!==0){
       this.setState({
           products:res.data[0]
      
      })  
    }    else{
      this.setState({
        products:{}
   
   }) 
    } 
      }               
      )
      .catch(err=>{
            
            if(err.tokenmessage){
                this.setState({isexpire:true}) ; 
            }
        })
  }
  handleDateChangeSalesfrom=(date)=>{
    const token=localStorage.getItem("jwtToken");    
    this.setState({showsalesdatefrom:date})
    this.setState({showsalesdateto:date})
    const DataUser={
      dateFrom:date,
      dateTo:date
    }
    axios.post('/analytics/salesbyarea',DataUser,{
      headers:{
        "Authorization": token 
        }
    })
      .then(res=>{
        if(res.data.length!==0){
        this.setState({
            Sales:res.data
      
      })
      this.getSalesByArea();

    }else{
      this.setState({
        salesByArea:{}
  
  })
    }
  }             
      )
      .catch(err=>{
            
            if(err.tokenmessage){
                this.setState({isexpire:true}) ; 
            }
        })
  }
  handleDateChangeSalesto=(date)=>{
    const token=localStorage.getItem("jwtToken"); 
    this.setState({showsalesdateto:date})
    const DataUser={
      dateFrom:this.state.showsalesdatefrom,
      dateTo:date
    }
    axios.post('/analytics/salesbyarea',DataUser,{
      headers:{
        "Authorization": token 
        }
    })
      .then(res=>{
        if(res.data.length!==0){
        this.setState({
            Sales:res.data
      
      })
      this.getSalesByArea();

    }else{
      this.setState({
        salesByArea:{}
  
  })
    }
  }             
      )
      .catch(err=>{
            
            if(err.tokenmessage){
                this.setState({isexpire:true}) ; 
            }
        })
  }
  handleDateChangeOutletfrom = (date) => {

    const token=localStorage.getItem("jwtToken"); 
    this.setState({showoutletdatefrom:date})
    //this.setState({showoutletdateto:date})
    const dateData ={
      dateTo:this.state.showoutletdateto,
      dateFrom:date
    }

    axios.post('analytics/topOutlet',dateData,{
      headers:{
        'Authorization':token
      }
    })
    .then(res => {
      this.setState({topOutlets:res.data})
    })
    .catch(err => {
      if(err.tokenmessage){
        this.setState({isexpire:true}) ; 
      }
    });
  }
  handleDateChangeOutletto = (date) => {

    const token=localStorage.getItem("jwtToken");
    this.setState({showoutletdateto:date});
    const dateData ={
      dateTo:date,
      dateFrom:this.state.showoutletdatefrom
    }

    axios.post('analytics/topOutlet',dateData,{
      headers:{
        'Authorization':token
      }
    })
    .then(res => {
      this.setState({topOutlets:res.data})
    })
    .catch(err => {
      if(err.tokenmessage){
        this.setState({isexpire:true}) ; 
      }
    });
  }
  render() {
    const {showyear,yearprogress,showcoveragedate,showproductdatefrom,showproductdateto,showsalesdatefrom,showsalesdateto,showoutletdatefrom,showoutletdateto,salesByMonth,progressSales,products,salesByArea,routeCoverage,topBestSalesreps,topLeastSalesreps,topOutlets}=this.state;
    const { classes } = this.props;
    return (
      <div> 
        <Grid container style={{marginTop:"2%"}}>   
        <ThemeProvider theme={body}>       
          <Grid item xs={8} >
            <Card style={{height:400,marginRight:10}} >
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    <Icon style={{color:"black"}}>monetization_on</Icon>
                  </Avatar>
                }
                title="Lavish Tea Company Sales"
                subheader={<MuiPickersUtilsProvider utils={DateFnsUtils} > 
                <KeyboardDatePicker
                  style={{width:"20%"}}
                  views={["year"]}
                  value={showyear}
                  onChange={this.handleYearChange}
                /> 
              </MuiPickersUtilsProvider>}
                />
                
              <Divider/>
              <CardContent>
              <ReactFusioncharts
                  type="area2d"
                  width="100%"
                  height="300"
                  dataFormat="JSON"
                  dataSource={{
                    chart: {
                      palettecolors:"#dcedc8",    
                      drawAnchors: "1",
                      anchorBorderColor: "#1b5e20",
                      numbersuffix: " Rs",
                      rotatelabels: "1",
                      setadaptiveymin: "1",
                      theme: "fusion"
                    },
                    data: [
                      {
                        label: "January",
                        value: salesByMonth['January']
                      },
                      {
                        label: "February",
                        value: salesByMonth['February']
                      },
                      {
                        label: "March",
                        value: salesByMonth['March']
                      },
                      {
                        label: "April",
                        value: salesByMonth['April']
                      },
                      {
                        label: "May",
                        value: salesByMonth['May']
                      },
                      {
                        label: "June",
                        value: salesByMonth['June']
                      },
                      {
                        label: "July",
                        value: salesByMonth['July']
                      },
                      {
                        label: "August",
                        value: salesByMonth['August']
                      },
                      {
                        label: "September",
                        value: salesByMonth['September']
                      },
                      {
                        label: "October",
                        value: salesByMonth['October']
                      },
                      {
                        label: "November",
                        value: salesByMonth['November']
                      },
                      {
                        label: "December",
                        value: salesByMonth['December']
                      }
                    ]
                }}
                />
              </CardContent>
            </Card>                
          </Grid>
          <Grid item xs={4} >
            <Card style={{height:400,marginRight:10}} > 
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    <Icon style={{color:"black"}}>trending_up</Icon>
                  </Avatar>
                }
                title={`Progress for the year ${yearprogress}`}
                subheader={`Compared with the year ${yearprogress-1}`}
              />             
              <Divider/>
              <CardContent>
              <ReactFusioncharts
                type="angulargauge"
                width="100%"
                height="290"
                dataFormat="JSON"
                dataSource={ {
                  chart: {      
                    lowerlimit: "0",
                    upperlimit: "100",
                    showvalue: "1",
                    numbersuffix: "%",
                    theme: "fusion",
                    showtooltip: "0"
                  },
                  colorrange: {
                    color: [
                      {
                        minvalue: "0",
                        maxvalue: "25",
                        code: "#c5e1a5"
                      },
                      {
                        minvalue: "25",
                        maxvalue: "50",
                        code: "#8bc34a"
                      },
                      {
                        minvalue: "50",
                        maxvalue: "75",
                        code: "#558b2f"
                      },
                      {
                        minvalue: "75",
                        maxvalue: "100",
                        code: "#1b5e20"
                      }
                    ]
                  },
                  dials: {
                    dial: [
                      {
                        value: progressSales
                      }
                    ]
                  }
                }}
              />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3} style={{height:600}} >
            <Card style={{marginTop:10,marginRight:10,height:"100%"}}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}  >
                    <Icon style={{color:"black"}}>people</Icon>
                  </Avatar>
                }
                title="Top 10 best perfoming sales reps"
                
              />
              <Divider/>
              <CardContent >
              <GridList >  
                <List style={{width:"100%",height:500}}>
                  {topBestSalesreps.map((rep,i) =>{
                    return(
                  <ListItem key={i} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt={rep._id} src={salesrep} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={rep._id}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            {rep.area}
                          </Typography>
                          {/* {" — I'll be in your neighborhood doing errands this…"} */}
                        </React.Fragment>
                      }
                    />
                  </ListItem>);
                  }) }                                  
                 
                </List>
              </GridList>
              </CardContent>
            </Card>
          </Grid>              
          <Grid item xs={4} style={{height:600}} >
            <Card style={{marginTop:10,marginRight:10,height:"100%"}}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar} >
                    <Icon style={{color:"black"}}>my_location</Icon>
                  </Avatar>
                }
                title="Route coverage status"
                subheader={<MuiPickersUtilsProvider utils={DateFnsUtils} > 

                <KeyboardDatePicker
                  style={{width:"45%"}}
                  format="yyyy-MM-dd "
                  value={showcoveragedate}
                  onChange={this.handleDateChangeCoverage}
                /> 
              </MuiPickersUtilsProvider>}
              />              
              <Divider/>
              <CardContent >
              <ReactFusioncharts
                type="maps/srilanka"
                width="100%"
                height="500"
                dataFormat="JSON"
                dataSource={ {
                  chart: {
                    legendposition: "BOTTOM",
                    entitytooltext: "$lname: <b>$datavalue </b>sales",
                    entityfillhovercolor: "#f1f8e9",
                    theme: "fusion"
                  },
                  colorrange: {
                    gradient: "0",
                    color: [
                      {
                        maxvalue: this.state.maxRouteVal/4,
                        displayvalue:`Rs 0-${this.state.maxRouteVal/4}`,
                        code: "#dcedc8"
                      },
                      {
                        maxvalue: this.state.maxRouteVal/2,
                        displayvalue: `Rs ${this.state.maxRouteVal/4}-${this.state.maxRouteVal/2}`,
                        code: "#aed581"
                      },
                      {
                        maxvalue: this.state.maxRouteVal/4*3,
                        displayvalue: `Rs ${this.state.maxRouteVal/2}-${this.state.maxRouteVal/4*3}`,
                        code: "#8bc34a"
                      },
                      {
                        maxvalue: this.state.maxRouteVal,
                        displayvalue: `Rs ${this.state.maxRouteVal/4*3}-${this.state.maxRouteVal}`,
                        code: "#1b5e20"
                      },
                      {
                        maxvalue: "0",
                        displayvalue: "N/A",
                        code: "#e0e0e0"
                      }
                    ]
                  },
                  data: [
                    {
                      data: [
                        {
                          id: "LK.KY",
                          value: routeCoverage['Kandy']?routeCoverage['Kandy']:0
                        },
                        {
                          id: "LK.MJ",
                          value: routeCoverage['Wellawaya']?routeCoverage['Wellawaya']:0
                        },
                        {
                          id: "LK.BD",
                          value: routeCoverage['Badulla']?routeCoverage['Badulla']:0
                        },
                        {
                          id: "LK.HB",
                          value: routeCoverage['Hambanthota']?routeCoverage['Hambanthota']:0
                        },
                        {
                          id: "LK.MH",
                          value: routeCoverage['Matara']?routeCoverage['Matara']:0
                        },
                        {
                          id: "LK.GL",
                          value: routeCoverage['Galle']?routeCoverage['Galle']:0+routeCoverage['Ambalangoda']?routeCoverage['Ambalangoda']:0+routeCoverage['Pitigala']?routeCoverage['Pitigala']:0
                        },
                        {
                          id: "LK.KT",
                          value: routeCoverage['Kaluthara']?routeCoverage['Kaluthara']:0
                        },
                        {
                          id: "LK.PX",
                          value: routeCoverage['Pththalam']?routeCoverage['Pththalam']:0+ routeCoverage['Chilaw']?routeCoverage['Chilaw']:0
                        },
                        {
                          id: "LK.AD",
                          value: routeCoverage['Anuradhapura']?routeCoverage['Anuradhapura']:0
                        },
                        {
                          id: "LK.PR",
                          value: routeCoverage['Polonnaruwa']?routeCoverage['Polonnaruwa']:0
                        },
                        {
                          id: "LK.KG",
                          value: routeCoverage['Kurunagala']?routeCoverage['Kurunagala']:0+routeCoverage['Kuliyapitiya']?routeCoverage['Kuliyapitiya']:0
                        },
                        {
                          id: "LK.MT",
                          value: routeCoverage['Mathale']?routeCoverage['Mathale']:0
                        },
                        {
                          id: "LK.KE",
                          value: routeCoverage['Kegalle']?routeCoverage['Kegalle']:0
                        },
                        {
                          id: "LK.RN",
                          value: routeCoverage['Rathnapura']?routeCoverage['Rathnapura']:0
                        },
                        {
                          id: "LK.GQ",
                          value: routeCoverage['Gampaha']?routeCoverage['Gampaha']:0+routeCoverage['Diwulapitiya']?routeCoverage['Diwulapitiya']:0+routeCoverage['Negombo']?routeCoverage['Negombo']:0
                        },
                        {
                          id: "LK.CO",
                          value: routeCoverage['Homagama']? routeCoverage['Homagama']:0+routeCoverage['Horana']?routeCoverage['Horana']:0+routeCoverage['Awissawella']?routeCoverage['Awissawella']:0
                          },
                          {
                            id: "LK.JA",
                            tooltext: "N/A"
                          },
                          {
                            id: "LK.KL",
                            tooltext: "N/A"
                            },
                          {
                            id: "LK.MP",
                            tooltext: "N/A"
                            },
                          {
                            id: "LK.MB",
                            tooltext: "N/A"
                            },
                          {
                            id: "LK.VA",
                            tooltext: "N/A"
                          },
                          {
                              id: "LK.NW",
                              tooltext: "N/A"
                          },
                          {
                            id: "LK.TC",
                            tooltext: "N/A"
                            },
                          {
                            id: "LK.BC",
                            tooltext: "N/A"
                            },
                          {
                            id: "LK.AP",
                            tooltext: "N/A"
                            }
                      
                      ] 
                    }
                  ]
                }}
              />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={5} style={{height:600}} >
            <Card style={{marginTop:10,marginRight:10,height:"100%"}}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}  >
                    <Icon style={{color:"black"}}>stars</Icon>
                  </Avatar>
                }
                title="Top performing products"
                subheader={<MuiPickersUtilsProvider utils={DateFnsUtils} > 
                <KeyboardDatePicker
                  label="Date from"
                  style={{width:"40%"}}
                  format="yyyy-MM-dd "
                  value={showproductdatefrom}
                  onChange={this.handleDateChangeProductfrom}
                /> 
                <KeyboardDatePicker
                  minDate={showproductdatefrom}
                  label="Date to"
                  style={{width:"40%",marginLeft:"20%"}}
                  format="yyyy-MM-dd "
                  value={showproductdateto}
                  onChange={this.handleDateChangeProductto}
                /> 
              </MuiPickersUtilsProvider>}
              />
              <Divider/>
              <CardContent >
                <ReactFusioncharts
                  type="doughnut2d"
                  width="100%"
                  height="480"
                  dataFormat="JSON"
                  dataSource={ {
                    chart: {
                      
                      palettecolors:"#8bc34a,#dcedc8,#aed581,#8bc34a,#689f38,#558b2f",
                      showlegend: "1",  
                      showpercentvalues: "0",
                      aligncaptionwithcanvas: "0",
                      captionpadding: "0",
                      decimals: "1",
                      plottooltext:
                        "<b>$label</b> sold <b>$percentValue</b> amount  ",
                      theme: "fusion"
                    },
                    data: [
                      {
                        label: "Tea pouch",
                        value: products.teapouch_sum
                      },
                      {
                        label: "Tea bag",
                        value: products.teabag_sum
                      },
                      {
                        label: "Tea sachet",
                        value: products.teasachet_sum
                      },
                      {
                        label: "Tea bulk",
                        value: products.teabulk_sum
                      },
                      {
                        label: "Tea bottle",
                        value: products.teabottle_sum
                      },
                      {
                        label: "Tea basket",
                        value: products.teabasket_sum
                      }
                    ]
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3} style={{height:600}} >
            <Card style={{marginTop:20,marginRight:10,height:"100%"}}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}  >
                    <Icon style={{color:"black"}}>people</Icon>
                  </Avatar>
                }
                title="Top 10 least performing sales reps"
              />
              <Divider/>
              <CardContent >
              <GridList>  
                <List style={{width:"100%",height:500}}>
                  {topLeastSalesreps.map((rep,i) => {
                    return(
                  <ListItem key={i} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt={rep._id} src={salesrep} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={rep._id}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                          {rep.area}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>);
                  })}
                  {/* <Divider variant="inset" component="li" /> */}
                  {/* <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Travis Howard" src={salesrep} />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Summer BBQ"
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            to Scott, Alex, Jennifer
                          </Typography>
                          {" — Wish I could come, but I'm out of town this…"}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Cindy Baker" src={salesrep} />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Oui Oui"
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            Sandra Adams
                          </Typography>
                          {' — Do you have Paris recommendations? Have you ever…'}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Cindy Baker" src={salesrep} />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Oui Oui"
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            Sandra Adams
                          </Typography>
                          {' — Do you have Paris recommendations? Have you ever…'}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Cindy Baker" src={salesrep} />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Oui Oui"
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            Sandra Adams
                          </Typography>
                          {' — Do you have Paris recommendations? Have you ever…'}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Cindy Baker" src={salesrep} />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Oui Oui"
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            Sandra Adams
                          </Typography>
                          {' — Do you have Paris recommendations? Have you ever…'}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Cindy Baker" src={salesrep} />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Oui Oui"
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            Sandra Adams
                          </Typography>
                          {' — Do you have Paris recommendations? Have you ever…'}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Cindy Baker" src={salesrep} />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Oui Oui"
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            Sandra Adams
                          </Typography>
                          {' — Do you have Paris recommendations? Have you ever…'}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Cindy Baker" src={salesrep} />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Oui Oui"
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            Sandra Adams
                          </Typography>
                          {' — Do you have Paris recommendations? Have you ever…'}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Cindy Baker" src={salesrep} />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Oui Oui"
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            Sandra Adams
                          </Typography>
                          {' — Do you have Paris recommendations? Have you ever…'}
                        </React.Fragment>
                      }
                    />
                  </ListItem>                   */}
                </List>
              </GridList>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={5} style={{height:600}} >
            <Card style={{marginTop:20,marginRight:10,height:"100%"}}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}  >
                    <Icon style={{color:"black"}}>map</Icon>
                  </Avatar>
                }
                title="Sales according to each area"
                subheader={<MuiPickersUtilsProvider utils={DateFnsUtils} > 
                <KeyboardDatePicker
                  label="Date from"
                  style={{width:"40%"}}
                  format="yyyy-MM-dd "
                  value={showsalesdatefrom}
                  onChange={this.handleDateChangeSalesfrom}
                /> 
                <KeyboardDatePicker
                  minDate={showsalesdatefrom}
                  label="Date to"
                  style={{width:"40%",marginLeft:"20%"}}
                  format="yyyy-MM-dd "
                  value={showsalesdateto}
                  onChange={this.handleDateChangeSalesto}
                /> 
              </MuiPickersUtilsProvider>}
              />
              <Divider/>
              <CardContent >
                <ReactFusioncharts
                    type="bar2d"
                    width="100%"
                    height="480"
                    dataFormat="JSON"
                    dataSource={{
                      chart: {
                        palettecolors:"#1b5e20",    
                        aligncaptionwithcanvas: "0",
                        plottooltext: "Rs <b>$dataValue</b> worth of sales done in $label",
                        theme: "fusion"
                      },
                      
                     data: [
                        {
                          label: "Kandy",
                          value: salesByArea['Kandy']
                        },
                        {
                          label: "Wellawaya",
                          value: salesByArea['Wellawaya']
                        },
                        {
                          label: "Badulla",
                          value: salesByArea['Badulla']
                        },
                        {
                          label: "Hambanthota",
                          value: salesByArea['Hambanthota']
                        },
                        {
                          label: "Pitigala",
                          value: salesByArea['Pitigala']
                        },
                        {
                          label: "Matara",
                          value: salesByArea['Matara']
                        },
                        {
                          label: "Galle",
                          value: salesByArea['Galle']
                        },
                        {
                          label: "Ambalangoda",
                          value: salesByArea['Ambalangoda']
                        },
                        {
                          label: "Kaluthara",
                          value: salesByArea['Kaluthara']
                        },
                        {
                          label: "Horana",
                          value: salesByArea['Horana']
                        },
                        {
                          label: "Diwulapitiya",
                          value: salesByArea['Diwulapitiya']
                        },
                        {
                          label: "Chilaw",
                          value: salesByArea['Chilaw']
                        },
                        {
                          label: "Pththalam",
                          value: salesByArea['Pththalam']
                        },
                        {
                          label: "Anuradhapura",
                          value: salesByArea['Anuradhapura']
                        },
                        {
                          label: "Polonnaruwa",
                          value: salesByArea['Polonnaruwa']
                        },
                        {
                          label: "Kuliyapitiya",
                          value: salesByArea['Kuliyapitiya']
                        },
                        {
                          label: "Kurunagala",
                          value: salesByArea['Kurunagala']
                        },
                        {
                          label: "Mathale",
                          value: salesByArea['Mathale']
                        },
                        {
                          label: "Kegalle",
                          value: salesByArea['Kegalle']
                        },
                        {
                          label: "Awissawella",
                          value: salesByArea['Awissawella']
                        },
                        {
                          label: "Rathnapura",
                          value: salesByArea['Rathnapura']
                        },
                        {
                          label: "Negombo",
                          value: salesByArea['Negombo']
                        },
                        {
                          label: "Gampaha",
                          value: salesByArea['Gampaha']
                        },
                        {
                            label: "Homagama",
                            value: salesByArea['Homagama']
                          }
                      ] 
                    }}
                  />                
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4} style={{height:600}} >
            <Card style={{marginTop:20,marginRight:10,height:"100%"}}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}  >
                    <Icon style={{color:"black"}}>store</Icon>
                  </Avatar>
                }
                title="Top performing outlets"
                subheader={<MuiPickersUtilsProvider utils={DateFnsUtils} > 
                <KeyboardDatePicker
                  label="Date from"
                  style={{width:"45%"}}
                  format="yyyy-MM-dd "
                  value={showoutletdatefrom}
                  onChange={this.handleDateChangeOutletfrom}
                /> 
                <KeyboardDatePicker
                  minDate={showoutletdatefrom}
                  label="Date to"
                  style={{width:"45%",marginLeft:"10%"}}
                  format="yyyy-MM-dd "
                  value={showoutletdateto}
                  onChange={this.handleDateChangeOutletto}
                /> 
              </MuiPickersUtilsProvider>}
              />
              <Divider/>
              <CardContent >
                {topOutlets.map((outlet,i) => {
                    return(
                
                <h6 key={i} style={{lineHeight:2, fontSize:9}}><b>
                  {outlet.area} : <small style={{fontSize:9,color:lightGreen[600]}}>{outlet._id}</small><br/></b>
                {/* Kandy: <small style={{fontSize:9,color:lightGreen[600]}}>Cargills food city</small><br/>
                Wellawaya: <small style={{fontSize:9,color:lightGreen[600]}}>Cargills food city</small><br/>
                Badulla: <small style={{fontSize:9,color:lightGreen[600]}}>Cargills food city</small><br/>
                Hambanthota: <small style={{fontSize:9,color:lightGreen[600]}}>Cargills food city</small><br/>
                Pitigala: <small style={{fontSize:9,color:lightGreen[600]}}>Cargills food city</small><br/>
                Matara: <small style={{fontSize:9,color:lightGreen[600]}}>Cargills food city</small><br/>
                Galle: <small style={{fontSize:9,color:lightGreen[600]}}>Cargills food city</small><br/>
                Ambalangoda: <small style={{fontSize:9,color:lightGreen[600]}}>Cargills food city</small><br/>
                Kaluthara: <small style={{fontSize:9,color:lightGreen[600]}}>Cargills food city</small><br/>
                Horana: <small style={{fontSize:9,color:lightGreen[600]}}>Cargills food city</small><br/>
                Diwulapitiya: <small style={{fontSize:9,color:lightGreen[600]}}>Cargills food city</small><br/>
                Chilaw: <small style={{fontSize:9,color:lightGreen[600]}}>Cargills food city</small><br/>
                Puththalam: <small style={{fontSize:9,color:lightGreen[600]}}>Cargills food city</small><br/>
                Anuradhapura: <small style={{fontSize:9,color:lightGreen[600]}}>Cargills food city</small><br/>
                Polonnaruwa: <small style={{fontSize:9,color:lightGreen[600]}}>Cargills food city</small><br/>
                Kuliyapitiya: <small style={{fontSize:9,color:lightGreen[600]}}>Cargills food city</small><br/>
                Kurunagala: <small style={{fontSize:9,color:lightGreen[600]}}>Cargills food city</small><br/>
                Mathale: <small style={{fontSize:9,color:lightGreen[600]}}>Cargills food city</small><br/>
                Kegalle: <small style={{fontSize:9,color:lightGreen[600]}}>Cargills food city</small><br/>
                Awissawella: <small style={{fontSize:9,color:lightGreen[600]}}>Cargills food city</small><br/>
                Rathnapura: <small style={{fontSize:9,color:lightGreen[600]}}>Cargills food city</small><br/>
                Negombo: <small style={{fontSize:9,color:lightGreen[600]}}>Cargills food city</small><br/>
                Gampaha: <small style={{fontSize:9,color:lightGreen[600]}}>Cargills food city</small><br/>
                Homagama: <small style={{fontSize:9,color:lightGreen[600]}}>Cargills food city</small><br/></b> */}
                </h6>  );
                })}            
              </CardContent>
            </Card>
          </Grid>
          </ThemeProvider>
        </Grid>           
      </div>
    );
  }
}



export default withStyles(useStyles)(Analytics);
