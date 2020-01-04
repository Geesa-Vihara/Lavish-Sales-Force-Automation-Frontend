import React,{Component} from "react";
import  { Link,Route,Redirect}  from 'react-router-dom';
import { CSVLink } from 'react-csv';
import StockView from "views/Stock/StockView.jsx";
import { withStyles} from '@material-ui/core/styles';
import { Table,TableBody,TableCell,TableHead,TableRow,TextField }  from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import InputAdornment from "@material-ui/core/InputAdornment";
import Fab from '@material-ui/core/Fab';
import GetAppIcon from '@material-ui/icons/GetApp';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Assignment from "@material-ui/icons/Assignment";
import axios from "axios"; 

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
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
  });

class Stock extends Component{
  
    state={
        isexpire:false,
        date: new Date().toLocaleDateString(),
        isExpire:false,
        filterText:"",
        filteredData:[],
        stocks:[],
        
      }
    getFileName(){
        return 'stocks '+ this.state.date ;
      }
    componentDidMount(){
      var token=localStorage.getItem("jwtToken");
      axios.get('/stock', {
        headers:{
          "Authorization": token 
        }
      }
        )
          .then(response => {
              this.setState({
                stocks:response.data,
                filteredData:response.data
              });
               
          })
          .catch(err=>{
              
              if(err.tokenmessage){
                  this.setState({isexpire:true}) ; 
              }
          })
    }   
    onChange = (e) => {
      const filterText=e.target.value;
      this.setState(prevState => {
        const filteredData = prevState.stocks.filter(e => {
          return e.stockno.includes(filterText);
        });
        return {
          filterText,
          filteredData
        };
      });
    }
    render(){
    const { classes } = this.props;
    if(!this.state.isExpire){
    return(
      <div>
        <div className={classes.root}>
          <TextField
            style={{left:'140%'}}
            autoFocus
            id='filter'
            type='text'
            placeholder='Search by Stock Order No'
            value={this.state.filterText}
            onChange={this.onChange}
            margin='normal'
            className={classes.textField}
            InputProps={{
            startAdornment: (
              <InputAdornment position="start">
               <SearchIcon className={classes.icon} />
              </InputAdornment>
            ),
            }}
          />
        </div>
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
                {this.state.filteredData.map((stock,i) => {
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