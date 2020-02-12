import React from 'react';
import  { Link,Route,Redirect}  from 'react-router-dom';
import { CSVLink } from 'react-csv';
import Axios from 'axios';
import View from "components/Invoices/View";

import 'date-fns';
//import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
//import InputAdornment from "@material-ui/core/InputAdornment";

import { withStyles,createMuiTheme} from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Table,TableCell,TableHead,TableBody,TableRow} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import IconButton from "@material-ui/core/IconButton";
//import SearchIcon from '@material-ui/icons/Search';
import GetAppIcon from '@material-ui/icons/GetApp';
import ViewIcon from "@material-ui/icons/Visibility";
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker,
  } from '@material-ui/pickers';

const body = createMuiTheme({
  palette: {
    primary: {500:"#1b5e20"},
  },
  });
const useStyles =theme => ({   
 
    fab: {
      margin: theme.spacing(2),
      color:theme.palette.common.black,
      backgroundColor:"transparent",
    },
    extendedIcon: {
      marginRight: theme.spacing(2),
    },
    icon:{
      color:"black",                  
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
      pViewing: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    formControl: {
        margin: '19px',
        minWidth: "20%",
       // marginBottom:theme.spacing(4),
        
  
      },
  });

class InvoiceTable extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            invoices:[],
            date: new Date().toLocaleDateString(),
            filteredInvoices:[],
            isExpire:false,
            selectsalesrep:'0',
            selectedDateFrom:Date.now()-1000*60*60*24,
            selectedDateTo:Date.now()
        };
    }
    // componentWillReceiveProps(){

    //     var token = localStorage.getItem('jwtToken');
    //     Axios
    //       .get('/invoices',{
    //         headers:{
    //           'Authorization':token
    //         }
    //       })
    //       .then(res => {
    //         this.setState({
    //           invoices: res.data
    //         });
    //         console.log(this.state.invoices);
    //       })
    //       .catch(err => {
    //         if(err.tokenmessage){
    //           console.log(err.tokenmessage);
    //           this.setState({isExpire:true});
    //         }
    //         console.log(err);
    //       });
    //   }
    
    componentDidMount(){
        // const filterData = {
        //     dateFrom:this.state.selectedDateFrom,
        //     dateTo:this.state.selectedDateTo
        // }
        var token = localStorage.getItem('jwtToken');
        Axios
            .get('/invoices',{
                headers:{
                    'Authorization':token
                }
            })
            .then(res=>{
                this.setState({
                    invoices:res.data,
                    filteredInvoices:res.data
                });
                //console.log(this.state.invoices);

            })
            .catch(err=>{
                if(err.tokenmessage){
                    console.log(err.tokenmessage);
                    this.setState({isExpire:true});
                }
            });
    }
    // visit = (obj, fn) => {
    //     const values = Object.values(obj)
    
    //     values.forEach(val => 
    //         val && typeof val === "object" ? visit(val, fn) : fn(val))
    // }
    // print = (val) => console.log(val)
    

    getFileName(){
        return 'Invoices '+ this.state.date ;
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({ selectsalesrep:e.target.value});
       // const selectsalesrep = e.target.value;
        if(this.state.selectsalesrep != "ALL"){
           // this.setState(prevState => {
            const filteredInvoices = this.state.invoices.filter(e =>  e.salesrepName = this.state.selectsalesrep );
            return {
              //  selectsalesrep,
                filteredInvoices
            };
        //});
    }
    };
    handleDateChangeFrom = (date)=> {
        this.setState({ selectedDateFrom:date});
    };
    handleDateChangeTo = (date)=> {
        this.setState({ selectedDateTo:date});
    };
    render(){
        const { classes } = this.props; 
        const { isExpire,invoices,selectedDateFrom,selectedDateTo,selectsalesrep,filteredInvoices } = this.state;
        if(!isExpire){
            return(
                <div>
                    <ThemeProvider theme={body}> 
                     <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-simple" >Select sales representative</InputLabel>
                            <Select
                                value={selectsalesrep}
                                onChange={this.handleChange}   
                                style={{textAlign:"left"}}                
                            >
                                <MenuItem value={0}>Default-All</MenuItem> 
                                {invoices.map(invoice=>
                                    <MenuItem key={invoice.Invoiceno} value={invoice.Invoiceno}>{invoice.salesrepName}</MenuItem> 
                                )}
                            
                            </Select>
                        </FormControl> 
                        <MuiPickersUtilsProvider utils={DateFnsUtils} > 
                                <KeyboardDateTimePicker
                                    style={{margin:'19px'}}
                                    variant="inline"
                                    format="MM-dd-yyyy hh:mm"
                                  //  margin="normal"
                                    id="date-picker-inline"
                                    label="Select Date from"
                                    value={selectedDateFrom}
                                    onChange={this.handleDateChangeFrom}
                                    KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                    }}    
                                />                           
                        </MuiPickersUtilsProvider>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}> 
                                <KeyboardDateTimePicker
                                    style={{margin:'19px'}}
                                    variant="inline"
                                    format="MM-dd-yyyy hh:mm"
                                   // margin="21px"
                                    id="date-picker-inline"
                                    label="Select Date to"
                                    value={selectedDateTo}
                                    onChange={this.handleDateChangeTo}
                                    KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                    }}     
                                />                          
                        </MuiPickersUtilsProvider>
                    </ThemeProvider>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{fontSize:'1.1em'}}>
                                        Invoice Id
                                    </TableCell>
                                    <TableCell style={{fontSize:'1.1em'}}>
                                        Customer
                                    </TableCell>
                                    <TableCell style={{fontSize:'1.1em'}}>
                                        Created By
                                    </TableCell>
                                    <TableCell style={{fontSize:'1.1em'}}>
                                        Invoice Date
                                    </TableCell>
                                    {/* <TableCell style={{fontSize:'1.1em'}}>
                                        Invoice Time
                                    </TableCell>
                                    <TableCell style={{fontSize:'1.1em'}}>
                                        Supplier
                                    </TableCell> */}
                                    <TableCell style={{fontSize:'1.1em'}}>
                                        Total 
                                    </TableCell>
                                    <TableCell style={{fontSize:'1.1em'}}>
                                        Actions 
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {filteredInvoices.map((invoice,i) => {
                                return(
                                    <TableRow key={i} hover>
                                        <TableCell>{invoice.Invoiceno}</TableCell>
                                        <TableCell>{invoice.customerName}</TableCell>
                                        <TableCell>{invoice.salesrepName}</TableCell>
                                        <TableCell>{invoice.orderDate}</TableCell>
                                        {/* <TableCell>{invoice.time}</TableCell>
                                        <TableCell>{invoice.distributor}</TableCell> */}
                                        <TableCell>{invoice.totalValue}</TableCell>  
                                        <TableCell>
                                            <Link to={`/admin/invoices/view/${invoice._id}`}>      
                                                <IconButton  aria-label="view" >
                                                    <ViewIcon className={classes.icon} />
                                                </IconButton>
                                            </Link>
                                            <Route exact path='/admin/invoices/view/:id' component={View} />
                                        </TableCell>
                                </TableRow>);
                            })}
                        </TableBody>
                        </Table>
                        <CSVLink data={invoices} filename={this.getFileName()}>
                        <Fab variant="extended" size="medium"  aria-label="export"  className={classes.fab}>       
                            <GetAppIcon className={classes.extendedIcon}/>
                                Export
                        </Fab> 
                    </CSVLink>
                    </Paper> 
                </div>

            )
        }
        else{
            return(
                <small>                
                    <Redirect to={{
                        pathname:"/login",
                        state:{expire:"Session expired please login again"}
                        }}/>
                    
                </small>
              )
        }
    }   


}
export default withStyles(useStyles)(InvoiceTable); 