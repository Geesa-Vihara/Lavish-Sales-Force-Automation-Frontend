import React from "react";
import  { Link,Route}  from 'react-router-dom';
import { CSVLink } from 'react-csv';
import Axios from 'axios';
import Add from "components/SalesRep/Add";
import Delete from "components/SalesRep/Delete";
import Update from "components/SalesRep/Update";
// import View from "components/SalesRep/View";
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import { Table,TableBody,TableCell,TableHead,TableRow }  from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
//buttons
import Fab from '@material-ui/core/Fab';
import IconButton from "@material-ui/core/IconButton";
//icons
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from "@material-ui/icons/Delete";       
import EditIcon from "@material-ui/icons/Edit";
import ViewIcon from "@material-ui/icons/Visibility";
import AddIcon from '@material-ui/icons/Add';

const useStyles =theme => ({     

  fab: {
    margin: theme.spacing(1),
    backgroundColor: "#018786"
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  icon:{
    color:"#018786"
  },
  table: {
    marginBottom: "0",
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "transparent",
    borderSpacing: "0",
    borderCollapse: "collapse"
  },
  tableHeadCell: {
   color: "inherit",
   fontSize: "1.1em"
  
  },
});

class  SalesRepTable extends React.Component{

  constructor (props){
    super(props);
    this.state={
      salesReps:[],
      date: new Date().toLocaleDateString(),
      isExpire:false
      
    };
  }

  componentWillReceiveProps(){
    
    Axios
      .get('/salesReps')
      .then(res => {
        this.setState({
          salesReps : res.data
        });
       // console.log(this.state.salesReps);
      })
      .catch(err => {
        console.log(err.message);
      })
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
          salesReps : res.data
        });
        console.log(this.state.salesReps);
      })
      .catch(err => {
        if(err.message){
          console.log(err.message);
          this.setState({isExpire:true});
        }
      })
  }

  getFileName(){
    return 'salesreps '+ this.state.date ;
  }

  render(){

    const { classes } = this.props;
    return(
      <div>
        
          <Paper>
            <Link to='/admin/salesreps/add'>         
              <Fab aria-label="add" className={classes.fab}>      
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
                {this.state.salesReps.map((salesrep,i) => 
                  <TableRow key={i}>
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
                      {/* <Route exact path='/admin/salesreps/view/:userName' component={View} /> */}
                      <Link to={`/admin/salesreps/edit/${salesrep._id}`}>      
                        <IconButton  aria-label="edit" >
                            <EditIcon className={classes.icon} />
                        </IconButton>
                      </Link>
                       <Route exact path='/admin/salesreps/edit/:id' component={Update} />
                      <Link to={`/admin/salesreps/delete/${salesrep._id}`}>
                        <IconButton  aria-label="delete">
                            <DeleteIcon className={classes.icon}/>
                        </IconButton>
                      </Link>
                      <Route exact path='/admin/salesreps/delete/:id' component={Delete} />
                  </TableCell>
                </TableRow>
              )}
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
}


export default withStyles(useStyles)(SalesRepTable); 
