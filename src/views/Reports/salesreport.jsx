import React,{ Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";

const useStyles = theme => ({    
    
    sign:{
       textAlign:"center",
       marginTop:50
    },
    table:{
        borderCollapse: "collapse",
        width: "100%",
    },    
    th:{
        border: "solid",
        textAlign: "left",
    }, 
    th2:{
        border: "solid",
        textAlign: "center",
    },   
    td:{
        border: "solid",
        textAlign: "left",
        paddingLeft:0
    },     
  });

class SalesReport extends Component{    
    render(){
        const {classes}=this.props;
        return(
            <div>   
                    <Grid container id="reporttoprint"> 
                        <Grid item xs={12}><b>Lavish Tea (Private)Limited<br/>No 40 ,Raymond Road<br/>Nugegoda</b></Grid>
                        <Grid item xs={12} style={{textAlign:"center"}}><h5><b>Monthly Sales Report</b></h5></Grid>
                        <table className={classes.table}>
                            <thead>
                                <tr>
                                    <th className={classes.th}>Area-</th>
                                    <th className={classes.th}>Sales rep name-</th>
                                    <th className={classes.th}>Distributor-</th>
                                    <th className={classes.th}>Month/Year-</th>
                                </tr>
                            </thead>
                        </table>
                        <label><br/></label>
                        <table className={classes.table}>
                            <thead>
                                <tr>
                                    <th className={classes.th2} rowSpan="2">No</th>
                                    <th className={classes.th2} rowSpan="2">Date</th>
                                    <th className={classes.th2} rowSpan="2">Working area</th>
                                    <th className={classes.th2} colSpan="5">RD Sales</th>
                                    <th className={classes.th2} rowSpan="2">Total RD Sales</th>
                                    <th className={classes.th2} rowSpan="2">Day PC</th>
                                    <th className={classes.th2} colSpan="3">Day collection</th>

                                </tr>
                                
                                <tr>
                                    
                                    <th className={classes.th2}>Category 1</th>
                                    <th className={classes.th2}>Category 2</th>
                                    <th className={classes.th2}>Category 3</th>
                                    <th className={classes.th2}>Strong 1kg</th>
                                    <th className={classes.th2}>Bulk 60kg</th>
                                    <th className={classes.th2}>Cash</th>
                                    <th className={classes.th2}>Cheque</th>
                                    <th className={classes.th2}>Credit</th>

                                </tr>
                            </thead>
                            <tbody>
                            {new Array(32).fill(undefined).map((_, i) => {
                                return(
                                
                                    <tr key={i}>
                                        
                                        <td className={classes.td}><b>{i}</b></td>
                                        <td className={classes.td}></td>
                                        <td className={classes.td}></td>
                                        <td className={classes.td}></td>
                                        <td className={classes.td}></td>
                                        <td className={classes.td}></td>
                                        <td className={classes.td}></td>
                                        <td className={classes.td}></td>
                                        <td className={classes.td}></td>
                                        <td className={classes.td}></td>
                                        <td className={classes.td}></td>
                                        <td className={classes.td}></td>
                                        <td className={classes.td}></td>
                                    
                                    </tr>
                                
                                )
                            })}
                            <tr>
                                        <td className={classes.td}></td>
                                        <td className={classes.td}></td>
                                        <td className={classes.td}><b>Total</b></td>
                                        <td className={classes.td}></td>
                                        <td className={classes.td}></td>
                                        <td className={classes.td}></td>
                                        <td className={classes.td}></td>
                                        <td className={classes.td}></td>
                                        <td className={classes.td}></td>
                                        <td className={classes.td}></td>
                                        <td className={classes.td}></td>
                                        <td className={classes.td}></td>
                                        <td className={classes.td}></td>
                            </tr>
                            </tbody>
                        </table> 
                        <Grid container className={classes.sign}>
                            <Grid item xs={3}><b>
                            ----------------------------------------<br/>
                            Sales rep signature/Date</b>
                            </Grid>
                            <Grid item xs={3}><b>
                            ----------------------------------------<br/>
                            ASM signature/Date</b>
                            </Grid>
                            <Grid item xs={3}><b>
                            ----------------------------------------<br/>
                            Distributor signature/Date</b>
                            </Grid>
                            <Grid item xs={3}><b>
                            ----------------------------------------<br/>
                            Distributor rubber stamp</b>
                            </Grid>
                            
                        </Grid>
                    </Grid>
                </div>
        )
    }

}
export default withStyles(useStyles)(SalesReport);