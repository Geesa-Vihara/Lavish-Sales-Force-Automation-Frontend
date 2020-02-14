import React from 'react';
import  { Link,Route,Redirect}  from 'react-router-dom';
import { CSVLink } from 'react-csv';
import Axios from 'axios';
import Add from "components/Distributor/Add";
import Delete from "components/Distributor/Delete";
import Update from "components/Distributor/Update";

//material ui
import InputAdornment from "@material-ui/core/InputAdornment";
import { withStyles} from '@material-ui/core/styles';
import { Table,TableCell,TableHead,TableBody,TableRow,TextField} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
//buttons
import Fab from '@material-ui/core/Fab';
import IconButton from "@material-ui/core/IconButton";
//icons
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from "@material-ui/icons/Delete";       
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';

const useStyles =theme => ({   
 
    fab: {
      margin: theme.spacing(2),
      color:theme.palette.common.black,
      backgroundColor:"transparent",
      // '&:hover':{
      //   backgroundColor:"#1b5e20",
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

class DistributorTable extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            distributors:[],
            date: new Date().toLocaleDateString(),
            isExpire:false,
            filterText:"",
            filteredData:[]    
        }
        this.onChange=this.onChange.bind(this);

    }

    componentWillReceiveProps(){

        var token = localStorage.getItem('jwtToken');
        Axios
          .get('/distributors',{
            headers:{
              'Authorization':token
            }
          })
          .then(res => {
            this.setState({
              distributors : res.data,
              filteredData : res.data
            });
           // console.log(this.state.distributors);
          })
          .catch(err => {
            if(err.tokenmessage){
              console.log(err.tokenmessage);
              this.setState({isExpire:true});
            }
            console.log(err);
          })
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
              distributors : res.data,
              filteredData : res.data
            });
           // console.log(this.state.distributors);
          })
          .catch(err => {
            if(err.tokenmessage){
              console.log(err.tokenmessage);
              this.setState({isExpire:true});
            }
          })
      }
    
      onChange = (e) => {
        const filterText=e.target.value;
        this.setState(prevState => {
          const filteredData = prevState.distributors.filter(e => {
            return e.userName.toLowerCase().includes(filterText.toLowerCase());
          });
          return {
            filterText,
            filteredData
          };
        });
      }
    
    getFileName(){
        return 'distributors '+ this.state.date ;
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
                            placeholder='Search Distributors'
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
                        <Link to='/admin/distributors/add'>
                        <Fab aria-label="add" className={classes.fab}  >      
                            <AddIcon />
                        </Fab>  
                    </Link> 
                    <Route exact path="/admin/distributors/add" component={Add} />
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{fontSize:'1.1em'}}>
                                        Status
                                    </TableCell>
                                    <TableCell style={{fontSize:'1.1em'}}>
                                        User Name
                                    </TableCell>
                                    <TableCell style={{fontSize:'1.1em'}}>
                                        Full Name
                                    </TableCell>
                                    <TableCell style={{fontSize:'1.1em'}}>
                                        Warehouse
                                    </TableCell>
                                    <TableCell style={{fontSize:'1.1em'}}>
                                        Area
                                    </TableCell>
                                    <TableCell style={{fontSize:'1.1em'}}>
                                        Address
                                    </TableCell>
                                    <TableCell style={{fontSize:'1.1em'}}>
                                        Phone Number
                                    </TableCell>
                                    <TableCell style={{fontSize:'1.1em'}}>
                                        Email
                                    </TableCell>
                                    <TableCell style={{fontSize:'1.1em'}}>
                                        Actions 
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {this.state.filteredData.map((distributor,i) => {
                                return(
                                    <TableRow key={i} hover>
                                        <TableCell>
                                           {distributor.isLogin ? (<AccountCircleIcon className={classes.icon} style={{ color: green[500] }} />) : (<AccountCircleIcon className={classes.icon} style={{ color: grey[500] }} />)}
                                        </TableCell>
                                        <TableCell>{distributor.userName}</TableCell>
                                        <TableCell>{distributor.fullName}</TableCell>
                                        <TableCell>{distributor.warehouse}</TableCell>
                                        <TableCell>{distributor.area}</TableCell>
                                        <TableCell>{distributor.address}</TableCell>
                                        <TableCell>{distributor.phoneNo}</TableCell>
                                        <TableCell>{distributor.email}</TableCell>
                                        <TableCell>
                                        <Link to={`/admin/distributors/update/${distributor._id}`}>      
                                            <IconButton  aria-label="edit" >
                                                <EditIcon className={classes.icon} />
                                            </IconButton>
                                        </Link>
                                        <Route exact path='/admin/distributors/update/:id' component={Update} />
                                        <Link to={`/admin/distributors/delete/${distributor._id}`}>
                                            <IconButton  aria-label="delete">
                                                <DeleteIcon className={classes.icon}/>
                                            </IconButton>
                                        </Link>
                                        <Route exact path='/admin/distributors/delete/:id' component={Delete} />
                                    </TableCell>
                                </TableRow>);
                            })}
                            </TableBody>
                        </Table>
                        <CSVLink data={this.state.distributors} filename={this.getFileName()}> 
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
export default withStyles(useStyles)(DistributorTable);