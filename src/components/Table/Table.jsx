
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
//import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
//import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";   

function CustomTable({ ...props }) {
  const { tableHead, tableData, tableHeaderColor } = props;    //classes
  return (
    <div>                                            {/*className={classes.tableResponsive}*/}
      <Table >                                       {/* className={classes.table}*/}
        {tableHead !== undefined ? (
          <TableHead >                               {/* className={classes[tableHeaderColor + "TableHeader"]}*/}
            <TableRow >                              {/* className={classes.tableHeadRow}*/}
              {tableHead.map((prop, key) => {
                return (
                  <TableCell key={key}>              {/* className={classes.tableCell + " " + classes.tableHeadCell} */}
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
              <TableRow key={key} >                   {/*className={classes.tableBodyRow}*/}
                {prop.map((prop, key) => {
                  return (
                  <TableCell  key={key}>              {/*className={classes.tableCell}*/ }
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
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

export default CustomTable;                                  {/*withStyles(tableStyle)(CustomTable);*/}
