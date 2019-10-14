import React from 'react';
// import  { Link,Route,Redirect}  from 'react-router-dom';
// import { CSVLink } from 'react-csv';
// import Axios from 'axios';
// import Add from "components/Distributor/Add";
// import Delete from "components/Distributor/Delete";
// import Update from "components/Distributor/Update";


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

const useStyles =theme => ({   
 
    fab: {
      margin: theme.spacing(2),
      color:theme.palette.common.white,
      backgroundColor:"#8EB69B",
      '&:hover':{
        backgroundColor:"#1b5e20",
      },
    },
    extendedIcon: {
      marginRight: theme.spacing(2),
    },
    icon:{
      color:"#1b5e20",
      '&:hover':{
        color:"#8EB69B"
      }                    
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

class CustomerTable extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            customers:[],
            errors:{},
            isExpire:false,

        }

    }

    render(){
        const { classes } = this.props;
         return(
            <div>
                <div className={classes.root}>
                    <TextField
                        style={{left:'140%'}}
                        autoFocus
                        id='filter'
                        type='text'
                        placeholder='Search Customers'
                        // value={this.state.filterText}
                        // onChange={this.onChange}
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
                    {/* <Link to='/admin/distributorss/add'> */}
                    <Fab aria-label="add" className={classes.fab}  >      
                        <AddIcon />
                    </Fab>  
                {/* </Link> */}
                {/* <Route exact path="/admin/distributors/add" component={Add} /> */}
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontSize:'1.1em'}}>
                                    Shop
                                </TableCell>
                                <TableCell style={{fontSize:'1.1em'}}>
                                    Type
                                </TableCell>
                                <TableCell style={{fontSize:'1.1em'}}>
                                    Name
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
                            <TableRow hover>
                                <TableCell>keels</TableCell>
                                <TableCell>Realtail</TableCell>
                                <TableCell>nuwan</TableCell>
                                <TableCell>Matara</TableCell>
                                <TableCell>Nupe,Matara</TableCell>
                                <TableCell>073456789</TableCell>
                                <TableCell>nuwan@gmail.com </TableCell>
                                <TableCell>
                                    {/* <Link to={`/admin/distributorss/update/${distributor._id}`}>       */}
                                        <IconButton  aria-label="edit" >
                                            <EditIcon className={classes.icon} />
                                        </IconButton>
                                    {/* </Link> */}
                                    {/* <Route exact path='/admin/distributorss/update/:id' component={Update} /> */}
                                    {/* <Link to={`/admin/distributors/delete/${distributor._id}`}> */}
                                        <IconButton  aria-label="delete">
                                            <DeleteIcon className={classes.icon}/>
                                        </IconButton>
                                    {/* </Link> */}
                                    {/* <Route exact path='/admin/Distributors/delete/:id' component={Delete} /> */}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    {/* <CSVLink data={this.state.distributorss} filename={this.getFileName()}> */}
                        <Fab variant="extended" size="medium"  aria-label="export"  className={classes.fab}>       
                            <GetAppIcon className={classes.extendedIcon}/>
                                Export
                        </Fab> 
                    {/* </CSVLink> */}
                </Paper>
            </div>
        
        );
    }


}
export default withStyles(useStyles)(CustomerTable);