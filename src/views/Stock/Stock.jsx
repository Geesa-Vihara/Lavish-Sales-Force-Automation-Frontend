import React,{Component} from "react";
import  { Link,Route,Redirect}  from 'react-router-dom';
import { CSVLink } from 'react-csv';
import StockView from "views/Stock/StockView.jsx";
import { Table,TableBody,TableCell,TableHead,TableRow }  from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import GetAppIcon from '@material-ui/icons/GetApp';
import Button from '@material-ui/core/Button';
import Assignment from "@material-ui/icons/Assignment";
import axios from "axios"; 
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles,createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';

const body = createMuiTheme({
  palette: {
      primary: {500:"rgb(30, 45, 12)"},
  },
  });

const useStyles =theme => ({   
 
    fab: {
      margin: theme.spacing(2),
      color:theme.palette.common.black,
      backgroundColor:"transparent",
      // '&:hover':{
      //   backgroundColor:"#8EB69B",
      // },
    },
    extendedIcon: {
      marginRight: theme.spacing(2),
    },
    icon:{
      color:"black",
      // '&:hover':{
      //   color:"#8EB69B"
      // }                    
    },
    table: {
      marginBottom: "0",
      width: "100%",
      maxWidth: "100%",
      borderCollapse: "collapse"
    },
    tableHeadCell: {
     color: "inherit",
     fontSize: "1.1em"
    },
    root: {
      textAlign:"center",
      marginBottom:10,
    },
    formControl: {
      marginTop: theme.spacing(2),
      minWidth: "100%",
      

    },buttonFilter:{
      width: "100%",
      height:45,
      borderRadius: "3px",
      letterSpacing: "1.5px",
      marginTop: "1rem" ,      
      color:"black"
    },
    
  });

class Stock extends Component{
  
    state={
        isexpire:false,
        date: new Date().toLocaleDateString(),
        isExpire:false,
        stocks:[],
        selectedDateFrom:Date.now()-1000*60*60*24,
        selectedDateTo:Date.now(),
        salesreps:[],
        selectsalesrep:"All",
        
      }
    getFileName(){
        return 'stocks '+ this.state.date ;
      }
    componentDidMount(){
      var token=localStorage.getItem("jwtToken");
      axios
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
      axios.post('/stock',userData,{
        headers:{
          "Authorization": token 
          }
      })
        .then(res=>{
          if(res.data.length!==0){
          this.setState({
              stocks:res.data
        
        })
      }else{
        this.setState({
          stocks:[]
    
    })
      }}               
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
      axios.post('/stock',userData,{
        headers:{
          "Authorization": token 
          }
      })
        .then(res=>{
          if(res.data.length!==0){
          this.setState({
              stocks:res.data
        
        })
      }else{
        this.setState({
          stocks:[]
    
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
    const{selectedDateTo,selectedDateFrom,salesreps,selectsalesrep}=this.state;
    const { classes } = this.props;
    if(!this.state.isExpire){
    return(
      <div>
        <form onSubmit={this.onSubmit}>
        <div className={classes.root}>        
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
                                    className={classes.buttonFilter}
                                    >
                                    FILTER
                                </Button> 
                        </Grid>
                    </Grid>
                
        </div>
        </form>
        <Paper>            
            
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeadCell}>
                     Stock Order no
                  </TableCell>
                  <TableCell className={classes.tableHeadCell}>
                    Distributor
                  </TableCell>
                  <TableCell className={classes.tableHeadCell}>
                    Sales Representative
                  </TableCell>
                  <TableCell className={classes.tableHeadCell}>
                    Area
                  </TableCell>
                  <TableCell className={classes.tableHeadCell}>
                    Date
                  </TableCell>
                  <TableCell className={classes.tableHeadCell}>
                    Time
                  </TableCell>
                  <TableCell className={classes.tableHeadCell}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.stocks.map((stock,i) => {
                  return(
                  <TableRow key={i} hover>
                    <TableCell>{stock.stockno}</TableCell>
                    <TableCell>{stock.distname}</TableCell>
                    <TableCell>{stock.repname}</TableCell>
                    <TableCell>{stock.area}</TableCell>
                    <TableCell>{stock.dateandtime}</TableCell>
                    <TableCell>{stock.time}</TableCell>
                    <TableCell>
                      <Link to={`/admin/stock/view/${stock._id}`}>  
                      <Button
                        variant="contained"
                        className={classes.button}
                        startIcon={<Assignment />}   
                        onClick={this.getSingleStock}                     
                      >
                        View report
                      </Button>
                      </Link>                                        
                  </TableCell>
                </TableRow>);
              })}
              <Route exact path='/admin/stock/view/:id' component={StockView} />    
              </TableBody>
          </Table>
          <CSVLink data={this.state.stocks} filename={this.getFileName()}>
          <Fab variant="extended" size="medium"  aria-label="export"  className={classes.fab}>       
            <GetAppIcon className={classes.extendedIcon}/>
            Export
          </Fab> 
          </CSVLink>
        </Paper>
      </div>
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
export default withStyles(useStyles)(Stock);