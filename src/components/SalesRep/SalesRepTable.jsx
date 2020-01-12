import React from "react";
import  { Link,Route,Redirect}  from 'react-router-dom';
import { CSVLink } from 'react-csv';
import Axios from 'axios';
import Add from "components/SalesRep/Add";
import Delete from "components/SalesRep/Delete";
import Update from "components/SalesRep/Update";
import View from "components/SalesRep/View";
// @material-ui/core components
import { withStyles} from '@material-ui/core/styles';
import { Table,TableBody,TableCell,TableHead,TableRow,TextField }  from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import InputAdornment from "@material-ui/core/InputAdornment";
//buttons
import Fab from '@material-ui/core/Fab';
import IconButton from "@material-ui/core/IconButton";
//icons
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from "@material-ui/icons/Delete";       
import EditIcon from "@material-ui/icons/Edit";
import ViewIcon from "@material-ui/icons/Visibility";
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';

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

class  SalesRepTable extends React.Component{

  constructor (props){
    super(props);
    this.state={
      salesReps:[],
      date: new Date().toLocaleDateString(),
      isExpire:false,
      filterText:"",
      filteredData:[]    
    };
    this.onChange=this.onChange.bind(this);
  }

  componentWillReceiveProps(){

    var token = localStorage.getItem('jwtToken');
    Axios
      .get('/salesreps',{
        headers:{
          'Authorization':token
        }
      })
      .then(res => {
        this.setState({
          salesReps : res.data,
          filteredData : res.data
        });
       // console.log(this.state.salesReps);
      })
      .catch(err => {
        if(err.tokenmessage){
         // console.log(err.tokenmessage);
          this.setState({isExpire:true});
        }
        console.log(err);
      })
  }

  componentDidMount(){

    var token = localStorage.getItem('jwtToken');
    Axios
      .get('/salesreps',{
        headers:{
          'Authorization':token
        }
      })
      .then(res => {
        this.setState({
          salesReps : res.data,
          filteredData : res.data
        });
    //    console.log(this.state.salesReps);
      })
      .catch(err => {
        if(err.tokenmessage){
          //console.log(err.tokenmessage);
          this.setState({isExpire:true});
        }
      })
  }

  onChange = (e) => {
    const filterText=e.target.value;
    this.setState(prevState => {
      const filteredData = prevState.salesReps.filter(e => {
        return e.userName.toLowerCase().includes(filterText.toLowerCase());
      });
      return {
        filterText,
        filteredData
      };
    });
  }

  getFileName(){
    return 'salesreps '+ this.state.date ;
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
            placeholder='Search Salesreps'
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
            <Link to='/admin/salesreps/add'>
              <Fab aria-label="add" className={classes.fab}  >      
                <AddIcon />
              </Fab>  
            </Link>
            <Route exact path="/admin/salesreps/add" component={Add} />
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeadCell}>
                     User Name
                  </TableCell>
                  <TableCell className={classes.tableHeadCell}>
                    Name
                  </TableCell>
                  <TableCell className={classes.tableHeadCell}>
                    Area
                  </TableCell>
                  <TableCell className={classes.tableHeadCell}>
                    Address
                  </TableCell>
                  <TableCell className={classes.tableHeadCell}>
                    Phone Number
                  </TableCell>
                  <TableCell className={classes.tableHeadCell}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.filteredData.map((salesrep,i) => {
                  return(
                  <TableRow key={i} hover>
                    <TableCell>{salesrep.userName}</TableCell>
                    <TableCell>{salesrep.fullName}</TableCell>
                    <TableCell>{salesrep.area}</TableCell>
                    <TableCell>{salesrep.address}</TableCell>
                    <TableCell>{salesrep.phoneNo}</TableCell>
                    <TableCell>
                      <Link to={`/admin/salesreps/view/${salesrep._id}`}>  
                        <IconButton  aria-label="view"  >
                            <ViewIcon className={classes.icon}/>
                        </IconButton> 
                      </Link>
                      <Route exact path='/admin/salesreps/view/:id' component={View} />
                      <Link to={`/admin/salesreps/update/${salesrep._id}`}>      
                        <IconButton  aria-label="edit" >
                            <EditIcon className={classes.icon} />
                        </IconButton>
                      </Link>
                       <Route exact path='/admin/salesreps/update/:id' component={Update} />
                      <Link to={`/admin/salesreps/delete/${salesrep._id}`}>
                        <IconButton  aria-label="delete">
                            <DeleteIcon className={classes.icon}/>
                        </IconButton>
                      </Link>
                      <Route exact path='/admin/salesreps/delete/:id' component={Delete} />
                  </TableCell>
                </TableRow>);
              })}
              </TableBody>
          </Table>
          <CSVLink data={this.state.salesReps} filename={this.getFileName()}>
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


export default withStyles(useStyles)(SalesRepTable); 
