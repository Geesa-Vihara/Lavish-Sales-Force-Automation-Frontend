{/*

import React from "react";
import {  Link  } from 'react-router-dom';
import Add from "../SalesRep/Add"

// @material-ui/core components

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Paper from '@material-ui/core/Paper';
//icons
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ViewIcon from "@material-ui/icons/Visibility";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

// core components
//import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";   

const useStyles = makeStyles(theme => ({              //styles for add button
  fab: {
    variant:'fab',
    margin: theme.spacing(1),
    backgroundColor: "#018786",
    
    
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

}));

function CustomTable({ ...props }) {

  const { tableHead, tableData } = props;    //classes,tableHeadColor
  
  const classes = useStyles();

  return (
    <div> 
      <Paper>   
      <Link  to='/salesreps/add'>                                                                  //Add button to add salesreps   
      <Fab  component={Link} to="salesrep/add" aria-label="add"  className={classes.fab}>         //Add button to add salesreps  /
        <AddIcon />
      </Fab>  
      </Link>
                                                                             //className={classes.tableResponsive}   TODO component that should render 
      <Table className={classes.table}>                                       // className={classes.table}
        {tableHead !== undefined ? (
          <TableHead >                                                           // className={classes[tableHeaderColor + "TableHeader"]}
            <TableRow >                                                           // className={classes.tableHeadRow}
              {tableHead.map((prop, key) => {
                return (
                  <TableCell key={key} className={classes.tableHeadCell}>              // className={classes.tableCell + " " + classes.tableHeadCell} 
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <TableRow key={key} >                                   //className={classes.tableBodyRow}
                {prop.map((prop, key) => {
                  return (
                  <TableCell  key={key}>                              //className={classes.tableCell}
                      {prop}
                    </TableCell>
                  );
                })}
                <TableCell>  
                    <IconButton  aria-label="view" component={Link} to="/view" >
                        <ViewIcon className={classes.icon}/>
                    </IconButton>       
                    <IconButton  aria-label="edit" >
                        <EditIcon className={classes.icon} />
                    </IconButton>
                    <IconButton  aria-label="delete">
                        <DeleteIcon className={classes.icon}/>
                    </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Fab variant="extended" size="medium"  aria-label="export"  className={classes.fab}>         //Add button to add salesreps
        <GetAppIcon className={classes.extendedIcon}/>
        Export
      </Fab>  
      </Paper>
    </div>
  );
}

/*CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

export default CustomTable; 

/*{withStyles(tableStyle)(CustomTable);  
*/}
