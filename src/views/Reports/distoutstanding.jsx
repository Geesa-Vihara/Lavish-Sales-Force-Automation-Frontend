import React,{ Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import avatar from "assets/img/lavishlogo.png";

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
    logo:{        
        maxWidth: "180px",
        maxHeight: "180px",
    },
    logoimg:{
        width: "100%",
        height: "100%"
    },
    
  });
  
class DistOutstanding extends Component{
    render(){
        const {classes}=this.props;
        return(
            <div>
                    <Grid container>
                        <Grid item xs={12}>
                        <div className={classes.logo}style={{float:"left"}}>                    
                            <img className={classes.logoimg} src={avatar} alt="img" />                    
                        </div>
                        <div style={{float:"right"}} ><b>Lavish Tea (Private) Limited<br/>No 40<br/>Raymond Road<br/>Nugegoda<br/>Tel-011 4349191</b></div>
                        </Grid>
                        <Grid item xs={12} >
                            <h5><b>Distributor Market Outstanding Report</b></h5>
                        </Grid>
                        <Grid item xs={3}><b>
                            Area-______________________
                            </b>
                            </Grid>
                            <Grid item xs={3}><b>
                            Date/Month/Year-______________</b>
                            </Grid>
                            <Grid item xs={6}><b>
                            Distributor Name-________________________________________________</b>
                            </Grid>
                            <p/>
                        <table className={classes.table}>
                            <thead>
                                <tr>
                                    <th className={classes.th2} rowSpan="2" >No</th>
                                    <th className={classes.th2} rowSpan="2" >Invoice Date</th>
                                    <th className={classes.th2} rowSpan="2" >Invoice No</th>
                                    <th className={classes.th2} rowSpan="2" >Customer Name</th>
                                    <th className={classes.th2} colSpan="4">Outstanding Amount</th>

                                </tr>
                                <tr>
                                
                                    <th className={classes.th2}>Below 30 Days</th>
                                    <th className={classes.th2}>Over 30 Days</th>
                                    <th className={classes.th2}>Over 45 Days</th>
                                    <th className={classes.th2}>Collection Date</th>

                                </tr>
                            </thead>
                            <tbody>
                            {new Array(30).fill(undefined).map((_, i) => {
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
                                
                                </tr>
                            
                            )
                        })}  
                            <tr>                                        
                                <td className={classes.td}><b>30</b></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}><b>Total Value</b></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td>
                            </tr>
                            </tbody>
                        </table> 
                        <Grid container className={classes.sign}>
                            <Grid item xs={4}><b>
                            ------------------------------------------------<br/>
                            Sales Rep Name</b>
                            </Grid>
                            <Grid item xs={4}><b>
                            ------------------------------------------------<br/>
                            Sales Rep Signature</b>
                            </Grid>
                            <Grid item xs={4}><b>
                            ------------------------------------------------<br/>
                            Distributor Signature/Rubber Stamp</b>
                            </Grid>
                            
                            
                        
                        </Grid>
                    </Grid>
                </div>
        )
    }

}
export default withStyles(useStyles)(DistOutstanding);