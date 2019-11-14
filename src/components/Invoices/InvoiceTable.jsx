import React from 'react';
import  { Link,Route,Redirect}  from 'react-router-dom';
import { CSVLink } from 'react-csv';
import Axios from 'axios';
import View from "components/Invoices/View";

import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from "@material-ui/core/InputAdornment";

import { withStyles,createMuiTheme} from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Table,TableCell,TableHead,TableBody,TableRow,TextField} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@material-ui/icons/Search';
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
            invoices:[

                {orderId:'2345',salesrep:"Kasun Perera",customer:"Cargills",distributor:'kamal gamage',date:"10-02-2019",time:"02:34 PM",total:'Rs.10000'},
                {orderId:'2347',salesrep:"Saman Perera",customer:"Family Super",distributor:'gamini perera',date:"10-02-2019",time:"02:34 PM",total:'Rs.23090'},
                {orderId:'2348',salesrep:"Nimantha Silva",customer:"Keells",distributor:'piyal gamage',date:"10-02-2019",time:"02:34 PM",total:'Rs.13000'},
                {orderId:'2349',salesrep:"Chamara Sampath",customer:"Food City",distributor:'ranil silva',date:"10-02-2019",time:"02:34 PM",total:'Rs.3000'},
                {orderId:'2350',salesrep:"Nuwan Madushka",customer:"City Center ",distributor:'sajith gamage',date:"10-02-2019",time:"02:34 PM",total:'Rs.5000'},
    
            ],
            date: new Date().toLocaleDateString(),
            isExpire:false,
            selectsalesrep:'0',
            selectedDateFrom:Date.now()-1000*60*60*24,
            selectedDateTo:Date.now(),
           // filterText:"",
           // filteredData:[]    

        }
    }
    getFileName(){
        return 'Invoices '+ this.state.date ;
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({ selectsalesrep:e.target.value});
    };
    handleDateChangeFrom = (date)=> {
        this.setState({ selectedDateFrom:date});
    };
    handleDateChangeTo = (date)=> {
        this.setState({ selectedDateTo:date});
    };
    render(){
        const { classes } = this.props; 
        const { isExpire,invoices,selectedDateFrom,selectedDateTo,selectsalesrep } = this.state;
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
                                    <MenuItem key={invoice.orderId} value={invoice.orderId}>{invoice.salesrep}</MenuItem> 
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
                                        Order Id
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
                                    <TableCell style={{fontSize:'1.1em'}}>
                                        Invoice Time
                                    </TableCell>
                                    <TableCell style={{fontSize:'1.1em'}}>
                                        Supplier
                                    </TableCell>
                                    <TableCell style={{fontSize:'1.1em'}}>
                                        Total 
                                    </TableCell>
                                    <TableCell style={{fontSize:'1.1em'}}>
                                        Actions 
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {this.state.invoices.map((invoice,i) => {
                                return(
                                    <TableRow key={i} hover>
                                        <TableCell>{invoice.orderId}</TableCell>
                                        <TableCell>{invoice.customer}</TableCell>
                                        <TableCell>{invoice.salesrep}</TableCell>
                                        <TableCell>{invoice.date}</TableCell>
                                        <TableCell>{invoice.time}</TableCell>
                                        <TableCell>{invoice.distributor}</TableCell>
                                        <TableCell>{invoice.total}</TableCell>  
                                        <TableCell>
                                            <Link to={`/admin/invoices/view/${invoice.orderId}`}>      
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
                        <CSVLink data={this.state.invoices} filename={this.getFileName()}>
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