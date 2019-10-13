import React,{Component}  from 'react';
import { withStyles,createMuiTheme } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import { Paper,Card, Modal, CardContent } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import SalesReport from '../Reports/salesreport.jsx';
import StockBalance from '../Reports/stockbalance.jsx';
import DistOutstanding from '../Reports/distoutstanding.jsx';
import { Icon } from "@material-ui/core";

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';


  
const useStyles = theme => ({
  root: {
    width: '90%',
    marginTop:"2%"
  },  
  buttonprint:{
    backgroundColor:"#DCDCDC",
    float:"right",
    marginBottom:10
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

    backgroundColor:"#1b5e20",
    '&:hover':{
      backgroundColor:"#8EB69B",
    },
    color:"white"
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
        primary: {500:"#1b5e20"},
    },
    });

class Reports extends Component {
  state={
    activeStep:0,
    report:"0",
    selectedDate:Date.now(),
    selectedDatefrom:Date.now(),
    selectedDateto:Date.now()+1000*60*60*24*31,
    dist:"0",
    selectdist:"0",
    open:false
  }

  handleNext = () => {  
    this.setState({activeStep:this.state.activeStep + 1});
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
    this.setState({selectedDatefrom:Date.now()});
    this.setState({selectedDateto:Date.now()+1000*60*60*24*31});
    this.setState({selectedDate:Date.now()});
    this.setState({dist:"0"});
    this.setState({selectdist:"0"});



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
  handleDateChangefrom=(date)=>{
    this.setState({selectedDatefrom:date});
    this.setState({selectedDateto:date})

  }
  handleDateChangeto=(date)=>{
    this.setState({selectedDateto:date})

  }
  enablemodel=()=>{
      this.setState({open:true})
  }
  disablemodel=()=>{
    this.setState({open:false})
}
generateReport=(report)=>{
  switch (report){
    case "0":
      return(        
        <SalesReport/>
      );
    case "1":
      return(
        <StockBalance/>
      );
    case "2":
      return(
        <DistOutstanding/>
      );
    default :
        return "Could not generate report"; 
  }
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
                        <FormControlLabel value="2" control={<Radio color="primary"/>} label="Distributor Market Outstanding Report" />                    
                    </RadioGroup>
                </FormControl>
            </ThemeProvider>
        );
      case 1:
        if(this.state.report==="1"){
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
        }else{
            return (
                <ThemeProvider theme={body}>  
                    <MuiPickersUtilsProvider utils={DateFnsUtils} >             
                            <KeyboardDatePicker
                                style={{marginRight:"10%"}}
                                variant="inline"
                                format="MM-dd-yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Select Date from"
                                value={this.state.selectedDatefrom}
                                onChange={this.handleDateChangefrom}
                                KeyboardButtonProps={{
                                'aria-label': 'change date',
                                }}
                                
                            /> 
                            <KeyboardDatePicker
                                minDate={this.state.selectedDatefrom}
                                variant="inline"
                                format="MM-dd-yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Select Date to"
                                value={this.state.selectedDateto}
                                onChange={this.handleDateChangeto}
                                KeyboardButtonProps={{
                                'aria-label': 'change date',
                                }}
                                
                            />                                       
                    </MuiPickersUtilsProvider>
                </ThemeProvider>
                );
        }
      case 2:
        return (
        <ThemeProvider theme={body}>
            <FormControl component="fieldset" >
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
                                <MenuItem value={0}>Kamal perera</MenuItem> 
                                <MenuItem value={1}>Nuwan chamara</MenuItem> 
                                <MenuItem value={2}>Lasantha dilshan</MenuItem> 
                                <MenuItem value={3}>Hashan senanayake</MenuItem> 
                                <MenuItem value={4}>Gayan sampath</MenuItem> 
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
  printreport=()=>{
    const content = document.getElementById('reporttoprint').innerHTML;
    const orderHtml = '<html><head><title></title></head><body>' + content + '</body></html>'
    document.body.innerHTML = orderHtml;        
    window.location.reload();
    window.print();  
}
  render(){
    const {classes} = this.props;
    const {activeStep,report} = this.state;
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
            <b>All steps completed. Click 'Generate report' to view the report</b>
            </Typography>
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
            <Button className={classes.nextfinish} onClick={this.enablemodel}>
              Generate report
            </Button>
             <Modal className={classes.modal} onClose={this.disablemodel}open={this.state.open}>
              <Card className={classes.card}>
                <CardContent className={classes.cardcontainer}>
                    <div>
                      <Button className={classes.buttonprint} onClick={this.printreport} ><Icon style={{fontSize:40}}>printer</Icon>Print</Button>
                    </div> 
                  {this.generateReport(report)} 
                </CardContent>
              </Card>       
            </Modal> 
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
    </div>
  );
}
}
export default withStyles(useStyles)(Reports);