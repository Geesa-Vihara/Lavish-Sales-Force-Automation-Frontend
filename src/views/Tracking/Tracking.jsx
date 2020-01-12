import React,{Component} from "react";
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles,createMuiTheme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Axios from 'axios';
import { Link,Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/styles';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
  
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import axios from "axios";

const body = createMuiTheme({
  palette: {
      primary: {500:"#1b5e20"},
  },
  });
const useStyles = theme => ({
    
    formControl: {
      marginTop: theme.spacing(2),
      minWidth: "100%",
      

    },
    container:{
        textAlign:"center",
        marginBottom:10,
        
    },
    button:{
        width: "100%",
        height:45,
        borderRadius: "3px",
        letterSpacing: "1.5px",
        marginTop: "1rem" ,      
        color:"black"
      },
  });
const CustomSkinMap = withScriptjs(       
        withGoogleMap(props => (      
          <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: 7.8731, lng: 80.7718}}
            defaultOptions={{
              scrollwheel: false,
              zoomControl: true,
              styles: [
                {
                  featureType: "water",
                  stylers: [
                    { saturation: 43 },
                    { lightness: -11 },
                    { hue: "#0088ff" }
                  ]
                },
                {
                  featureType: "road",
                  elementType: "geometry.fill",
                  stylers: [
                    { hue: "#ff0000" },
                    { saturation: -100 },
                    { lightness: 99 }
                  ]
                },
                {
                  featureType: "road",
                  elementType: "geometry.stroke",
                  stylers: [{ color: "#808080" }, { lightness: 54 }]
                },
                {
                  featureType: "landscape.man_made",
                  elementType: "geometry.fill",
                  stylers: [{ color: "#ece2d9" }]
                },
                {
                  featureType: "poi.park",
                  elementType: "geometry.fill",
                  stylers: [{ color: "#ccdca1" }]
                },
                {
                  featureType: "road",
                  elementType: "labels.text.fill",
                  stylers: [{ color: "#767676" }]
                },
                {
                  featureType: "road",
                  elementType: "labels.text.stroke",
                  stylers: [{ color: "#ffffff" }]
                },
                { featureType: "poi", stylers: [{ visibility: "off" }] },
                {
                  featureType: "landscape.natural",
                  elementType: "geometry.fill",
                  stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
                },
                { featureType: "poi.park", stylers: [{ visibility: "on" }] },
                {
                  featureType: "poi.sports_complex",
                  stylers: [{ visibility: "on" }]
                },
                { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
                {
                  featureType: "poi.business",
                  stylers: [{ visibility: "simplified" }]
                }
              ]
            }}
          >
            
            {props.myordersarray.map((order,i)=>
              <Marker position={{ lat: Number(order.lat), lng: Number(order.lng) }} key={i} >                   
              {<InfoWindow>
                  <small>
                      Order-ID: <Link to="/admin/stock">{order.orderId}</Link><br/>
                      Date: {order.date}<br/>
                      Time: {order.hour===24?`12:00 AM`:order.hour===12 && order.minutes===0?`12:00 PM`:order.hour>12 ?`${order.hour-12}: ${order.minutes} PM`:`${order.hour}:${order.minutes} AM`}<br/>
                      Sales rep: {order.salesrep}<br/>
                      Customer: {order.customer}<br/>
                      
                  </small>
            </InfoWindow>}
            </Marker>
            )}
            
           
          </GoogleMap>
        ))
      );
class Tracking extends Component {
    constructor (props){
        super(props);
        this.state={
        selectedDateFrom:Date.now()-1000*60*60*24,
        selectedDateTo:Date.now(),
        salesreps:[],
        selectsalesrep:"All",
        YOUR_KEY:"",
        isexpire:false,
        orders:[],
          
        };
      }
    
    componentDidMount(){
    
    var token = localStorage.getItem('jwtToken');
    Axios
        .get('/salesReps',{
        headers:{
            'Authorization':token
        }
        })
        .then(res => {
        this.setState({
            salesreps : res.data
        });
        })
        .catch(err => {
        if(err.tokenmessage){
            this.setState({isexpire:true});
        }
        })   
    const userData={
      salesRep:this.state.selectsalesrep,
      dateFrom:this.state.selectedDateFrom,
      dateTo:this.state.selectedDateTo,
    };
        axios.post('/tracking/getmarkers',userData,{
          headers:{
            "Authorization": token 
            }
        })
          .then(res=>{
            if(res.data.length!==0){
            this.setState({
                orders:res.data
          
          })
        }
      else{
        this.setState({
          orders:[]
    
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
    handleDateChangeFrom = (date)=> {
        this.setState({ selectedDateFrom:date});
    };
    handleDateChangeTo = (date)=> {
        this.setState({ selectedDateTo:date});
    };
    handleChange = (e) => {
        e.preventDefault();
        this.setState({ selectsalesrep:e.target.value});
    };  
    onSubmit= e =>{
        e.preventDefault();
        var token = localStorage.getItem('jwtToken');
        const userData={
          salesRep:this.state.selectsalesrep,
          dateFrom:this.state.selectedDateFrom,
          dateTo:this.state.selectedDateTo,
        };
        axios.post('/tracking/getmarkers',userData,{
          headers:{
            "Authorization": token 
            }
        })
          .then(res=>{
            if(res.data.length!==0){
            this.setState({
                orders:res.data
          
          })
        }else{
          this.setState({
            orders:[]
      
      })
        }}               
          )
          .catch(err=>{
                
                if(err.tokenmessage){
                    this.setState({isexpire:true}) ; 
                }
            })
    }
    
    render(){

    const {classes} = this.props;
    const {selectedDateTo,selectedDateFrom,salesreps,selectsalesrep,isexpire,YOUR_KEY}=this.state; 
    
    if(!isexpire){
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <Grid container className={classes.container}   >
                    <ThemeProvider theme={body}>  
                        <Grid item xs={4}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-simple" >Select sales representative</InputLabel>
                            <Select
                                value={selectsalesrep}
                                onChange={this.handleChange}   
                                style={{textAlign:"left"}}                
                            >
                                <MenuItem value={"All"}>Default-All</MenuItem> 
                                {salesreps.map(salesrep=>
                                    <MenuItem key={salesrep._id} value={salesrep.fullName}>{salesrep.fullName}</MenuItem> 
                                )}
                            
                            </Select>
                        </FormControl> 
                        </Grid>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} > 
                            <Grid item xs={3}>
                                <KeyboardDatePicker
                                    variant="inline"
                                    format="MM-dd-yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Select Date from"
                                    value={selectedDateFrom}
                                    onChange={this.handleDateChangeFrom}
                                    KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                    }}
                                    
                                />
                            </Grid>                            
                        </MuiPickersUtilsProvider>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}> 
                            <Grid item xs={3}>
                                <KeyboardDatePicker
                                    variant="inline"
                                    format="MM-dd-yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Select Date to"
                                    value={selectedDateTo}
                                    onChange={this.handleDateChangeTo}
                                    KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                    }}
                                    
                                />
                            </Grid>                            
                        </MuiPickersUtilsProvider>
                        </ThemeProvider>
                        <Grid item xs={2}>                          
                                <Button
                                    variant="contained"
                                    type="submit"
                                    className={classes.button}
                                    >
                                    SUBMIT
                                </Button> 
                        </Grid>
                    </Grid>
                </form>
                
                <CustomSkinMap
                    googleMapURL= {`https://maps.googleapis.com/maps/api/js?key=${YOUR_KEY}`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100vh` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    myordersarray={this.state.orders}
                    />
                
            </div>
        );
}else{
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

export default withStyles(useStyles)(Tracking);
