import React,{Component}  from 'react';
import { withStyles,createMuiTheme } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import { Paper,Card, CardContent } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Axios from 'axios';
import { Table,TableBody,TableCell,TableHead,TableRow }  from "@material-ui/core";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import Assignment from "@material-ui/icons/Assignment";
import axios from 'axios';
import  { Link,Route}  from 'react-router-dom';
import SalesReport from '../Reports/salesreport.jsx';
import StockBalance from '../Reports/stockbalance';
  
const useStyles = theme => ({
  table:{
    textAlign:"center"
  },
  tableHeadCell:{
    textAlign:"center"
  },
  tableContent:{
    textAlign:"center"
  },
  root: {
    width: '90%',
    marginTop:"2%"
  },  
  buttonprint:{
    backgroundColor:"#DCDCDC",
    marginBottom:10,
    float:"right"
},
  modal:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    height:'100%',
    maxWidth: 900,
    maxHeight: 1000,
    overflow:'auto'
},
  cardcontainer: {
      display: 'flex',
      flexDirection: 'column',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  nextfinish:{
    marginRight: theme.spacing(1),
    color:"black"
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  
});

const stepper = createMuiTheme({
    palette: {
        primary: {500:"#000000"},
    },
    });
const body = createMuiTheme({
    palette: {
        primary: {500:"#000000"},
    },
    });

class Reports extends Component {
  constructor(props){
  super(props);
  this.state={
    activeStep:0,
    report:"0",
    selectedDate:new Date(), 
    distributors:[],
    dist:"0",
    selectdist:"0",
    checkStatus:0,
    sales:[],
  }
  
  this.handleNext=this.handleNext.bind(this);
  this.updateStatus=this.updateStatus.bind(this);
}
  componentDidMount(){
    var token = localStorage.getItem('jwtToken');
    Axios
        .get('/distributors',{
        headers:{
            'Authorization':token
        }
        })
        .then(res => {
        this.setState({
          distributors : res.data
        });
        })
        .catch(err => {
        if(err.tokenmessage){
            this.setState({isexpire:true});
        }
        })  
  }
  handleNext() {  
    this.setState({activeStep:this.state.activeStep + 1});
    if(this.state.activeStep === this.getSteps().length - 1 ){
        this.updateStatus()
    }
  };

  handleBack = () => {
    this.setState({activeStep:this.state.activeStep - 1});
  };

  getSteps=() =>{
    return ['Select a report type', 'Select Date','Select distributor'];
    } 

  handleReset = () => {
    this.setState({activeStep:0});
    this.setState({report:"0"});
    this.setState({selectedDate:Date.now()});
    this.setState({dist:"0"});
    this.setState({selectdist:"0"});
    this.setState({checkStatus:0});
    this.setState({sales:[]});

  };
  handleChange=(e)=>{
    this.setState({report:e.target.value})
  }
  handleChangeselectdist=(e)=>{
    this.setState({selectdist:e.target.value})
  }
  handleDistChange=(e)=>{
    this.setState({dist:e.target.value})
  }
  handleDateChange=(date)=>{
    this.setState({selectedDate:date})

  }
updateStatus(){
  var token = localStorage.getItem('jwtToken');
        
  const userData={
      distributor:this.state.dist==="0"?"All":this.state.distributors[this.state.selectdist].userName,
      date:this.state.selectedDate,
      type:this.state.report==="0"?"sales":"stock",

    };
    axios.post('/reports/generateRep',userData,{
      headers:{
        "Authorization": token 
        }
    })
      .then(res=>{
        if(res.data.length!==0){
        this.setState({
            checkStatus:1,
            sales:res.data
      
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
  getStepContent=(step)=>{
    switch (step) {
      case 0:
        return (
            <ThemeProvider theme={body}>  
                <FormControl component="fieldset">
                    <RadioGroup aria-label="report" name="reports" value={this.state.report} onChange={this.handleChange}>
                        <FormControlLabel value="0" control={<Radio color="primary" />} label="Sales Report" />
                        <FormControlLabel value="1" control={<Radio color="primary" />} label="Distributor Balance Stock Report" />
                    </RadioGroup>
                </FormControl>
            </ThemeProvider>
        );
      case 1:
          return (
            <ThemeProvider theme={body}>  
                <MuiPickersUtilsProvider utils={DateFnsUtils} >             
                        <KeyboardDatePicker
                            variant="inline"
                            format="MM-dd-yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Select Date from"
                            value={this.state.selectedDate}
                            onChange={this.handleDateChange}
                            KeyboardButtonProps={{
                            'aria-label': 'change date',
                            }}
                            
                        />                                    
                </MuiPickersUtilsProvider>
            </ThemeProvider>
        );
      case 2:
        return (
        <ThemeProvider theme={body}>
            <FormControl component="fieldset" >
              {}
                <RadioGroup aria-label="distributor" name="distributors" value={this.state.dist} onChange={this.handleDistChange}>
                    <FormControlLabel value="0" control={<Radio color="primary" />} label="All" />
                    <FormControlLabel value="1" control={<Radio color="primary" />} label="Choose" />
                    {this.state.dist==="1"?
                        <FormControl style={{width:200,marginLeft:20}}>
                            <InputLabel htmlFor="dist" >Select distributor</InputLabel>
                            <Select
                                value={this.state.selectdist}
                                onChange={this.handleChangeselectdist}   
                                style={{textAlign:"left"}}                
                            >
                                {this.state.distributors.map((distributors,i)=>
                                    <MenuItem key={distributors._id} value={i}>{distributors.fullName}</MenuItem> 
                                )}
                            </Select>
                        </FormControl> :""
                    }       
                </RadioGroup>
            </FormControl>
            
        </ThemeProvider>
        
        
      );
      case 3:
        return (<b>All steps completed. Click 'Generate report' to view the report</b>);
      default:
        return 'Unknown step';
    }
  }
 
  render(){
    const {classes} = this.props;
    const {activeStep,sales} = this.state;
    const steps=this.getSteps();
  return (
    <div className={classes.root}>
        <ThemeProvider theme={stepper}>  
            <Stepper activeStep={activeStep} >
                {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};                 
                return (
                                            
                    <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                    
                );
                })}
            </Stepper>
        </ThemeProvider>
     <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
            <b>Click 'View Report' to view the report and print or Click 'Reset' to start again</b>
            </Typography>
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
            <Card className={classes.card}>
                <CardContent className={classes.cardcontainer}> 
                {this.state.report==="0"?(
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.tableHeadCell}>
                          Report No
                        </TableCell>
                        <TableCell className={classes.tableHeadCell}>
                          Distributor Username
                        </TableCell>
                        <TableCell className={classes.tableHeadCell}>
                          Salesrep Fullname
                        </TableCell>
                        <TableCell className={classes.tableHeadCell}>
                          Report
                        </TableCell> 
                      </TableRow>
                    </TableHead>
                    {this.state.checkStatus===1?                   
                    <TableBody>                             
                    {Object.keys(sales).map((_,i) => {  
                      return(                                     
                      <TableRow key={i} hover>
                        <TableCell className={classes.tableContent}>{i}</TableCell>
                        <TableCell className={classes.tableContent}>{sales[i]._id.distUsername}</TableCell>
                        <TableCell className={classes.tableContent}>{sales[i]._id.repName}</TableCell>
                        <TableCell className={classes.tableContent}>
                        <Link to={`/admin/reports/sales/${sales[i]._id.distUsername}`}>  
                          <Button
                            variant="contained"
                            className={classes.button}
                            startIcon={<Assignment />}                    
                          >
                            View report
                          </Button>  
                          </Link>                                     
                      </TableCell>
                    </TableRow>
                    
                  )})} 
                         
              </TableBody>:
              <TableBody>
                 <TableRow hover>
                        <TableCell className={classes.tableContent} colSpan="4">No data to display</TableCell>                        
                    </TableRow>
              </TableBody>}
              </Table>
                ):(
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.tableHeadCell}>
                          Stock No
                        </TableCell>
                        <TableCell className={classes.tableHeadCell}>
                          Distributor Username
                        </TableCell>
                        <TableCell className={classes.tableHeadCell}>
                          Salesrep Fullname
                        </TableCell>
                        <TableCell className={classes.tableHeadCell}>
                          Date
                        </TableCell> 
                        <TableCell className={classes.tableHeadCell}>
                          Time
                        </TableCell> 
                        <TableCell className={classes.tableHeadCell}>
                          Report
                        </TableCell> 
                      </TableRow>
                    </TableHead>
                    {this.state.checkStatus===1?                   
                    <TableBody>                             
                    {Object.keys(sales).map((_,i) => {  
                      return(                                     
                      <TableRow key={i} hover>
                        <TableCell className={classes.tableContent}>{sales[i].stockno}</TableCell>
                        <TableCell className={classes.tableContent}>{sales[i]._id.distname}</TableCell>
                        <TableCell className={classes.tableContent}>{sales[i].repname}</TableCell>
                        <TableCell className={classes.tableContent}>{sales[i].currdate}</TableCell>
                        <TableCell className={classes.tableContent}>{sales[i].hour===24?`12:00 AM`:sales[i].hour===12 && sales[i].minutes===0?`12:00 PM`:sales[i].hour>12 ?`${sales[i].hour-12}: ${sales[i].minutes} PM`:`${sales[i].hour}:${sales[i].minutes} AM`}</TableCell>
                        <TableCell className={classes.tableContent}>
                        <Link to={`/admin/reports/stock/${sales[i]._id.distname}`}>  
                          <Button
                            variant="contained"
                            className={classes.button}
                            startIcon={<Assignment />}                    
                          >
                            View report
                          </Button>  
                          </Link>                                     
                      </TableCell>
                    </TableRow>
                    
                  )})} 
                         
              </TableBody>:
              <TableBody>
                 <TableRow hover>
                        <TableCell className={classes.tableContent} colSpan="4">No data to display</TableCell>                        
                    </TableRow>
              </TableBody>}
              </Table>
                )
                
                }
                </CardContent>
              </Card>
          </div>
        ) : (
          <div>
            <Paper style={{height:500,paddingLeft:50,paddingTop:20,marginTop:10}}>
            {this.getStepContent(activeStep)}
            </Paper>
            <div>
              <Button disabled={activeStep === 0} onClick={this.handleBack} className={classes.button} >
                Back
              </Button>                            
              <Button
                variant="contained"
                onClick={this.handleNext}
                className={classes.nextfinish}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
              
            </div>
            
          </div>
        )}
      </div>
      <Route exact path='/admin/reports/sales/:id2' render={(props) => (
                <SalesReport {...props} date={this.state.selectedDate} /> )}  /> 
      <Route exact path='/admin/reports/stock/:id2' render={(props) => (
      <StockBalance {...props} date={this.state.selectedDate} /> )}  /> 
    </div>
    
  );
}
}
export default withStyles(useStyles)(Reports);