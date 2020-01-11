import React from 'react';
import { withStyles} from '@material-ui/core/styles';
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
import ReactFusioncharts from "react-fusioncharts";
import salesrep from "assets/img/faces/salesrep.png";
import yearlysales from "variables/yearlysales.jsx";
import yearlyproducts from "variables/yearlyproducts.jsx";
import progressbetweenyears from "variables/progressbetweenyears.jsx";
import routecoverage from "variables/routecoverage.jsx";
import { KeyboardDatePicker,MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import axios from "axios";

const useStyles = theme => ({ 
  
  avatar: {
    
    backgroundColor: "transparent",
  },
  inline: {
    display: 'inline',
  },

})

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
    this.setState({showcoveragedate:date})
  }
  handleDateChangeProductfrom=(date)=>{
    this.setState({showproductdatefrom:date})
    this.setState({showproductdateto:date})
  }
  handleDateChangeProductto=(date)=>{
    this.setState({showproductdateto:date})
  }
  handleDateChangeSalesfrom=(date)=>{
    this.setState({showsalesdatefrom:date})
    this.setState({showsalesdateto:date})
  }
  handleDateChangeSalesto=(date)=>{
    this.setState({showsalesdateto:date})
  }
  handleDateChangeOutletfrom=(date)=>{
    this.setState({showoutletdatefrom:date})
    this.setState({showoutletdateto:date})
  }
  handleDateChangeOutletto=(date)=>{
    this.setState({showoutletdateto:date})
  }
  render() {
    const {showyear,yearprogress,showcoveragedate,showproductdatefrom,showproductdateto,showsalesdatefrom,showsalesdateto,showoutletdatefrom,showoutletdateto,salesByMonth}=this.state;
    const { classes } = this.props;
    return (
      <div> 
        <Grid container style={{marginTop:"2%"}}>        
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
                dataSource={progressbetweenyears}
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
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={salesrep} />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Brunch this weekend?"
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            Ali Connors
                          </Typography>
                          {" — I'll be in your neighborhood doing errands this…"}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
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
                  </ListItem>                  
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
                dataSource={routecoverage}
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
                  dataSource={yearlyproducts}
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
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={salesrep} />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Brunch this weekend?"
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            Ali Connors
                          </Typography>
                          {" — I'll be in your neighborhood doing errands this…"}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
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
                  </ListItem>                  
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
                    dataSource={yearlysales}
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
                <h6 style={{lineHeight:2, fontSize:9}}><b>
                Kandy: <small style={{fontSize:9,color:lightGreen[600]}}>Cargills food city</small><br/>
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
                Homagama: <small style={{fontSize:9,color:lightGreen[600]}}>Cargills food city</small><br/></b>
                </h6>              
              </CardContent>
            </Card>
          </Grid>
        </Grid>           
      </div>
    );
  }
}



export default withStyles(useStyles)(Analytics);
