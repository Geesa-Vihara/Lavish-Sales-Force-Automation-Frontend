import React,{ Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import avatar from "assets/img/lavishlogo.png";

const useStyles = theme => ({  
    sign:{
       textAlign:"center",
       marginTop:50
    },
    heading:{        
        marginBottom:20
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
  
class StockBalance extends Component{
    render(){
        const {classes}=this.props;
        return(
            <div>
                    <Grid container id="reporttoprint">
                        <Grid item xs={12}>
                        <div className={classes.logo}style={{float:"left"}}>                    
                            <img className={classes.logoimg} src={avatar} alt="img" />                    
                        </div>
                        <div style={{float:"right"}} ><b>Lavish Tea (Private) Limited<br/>No 40<br/>Raymond Road<br/>Nugegoda<br/>Tel-011 4349191</b></div>
                        </Grid>                        
                        <Grid container className={classes.heading}>
                            <Grid item xs={12} style={{marginBottom:30}}>
                                <h5><b>Distributor Balance Stock Report</b></h5>
                            </Grid>
                            <Grid item xs={3}><b>
                                Area-___________________</b>
                            </Grid>
                            <Grid item xs={3}><b>
                                Month/Year-____________</b>
                            </Grid>
                            <Grid item xs={6}><b>
                                Distributor Name-_______________________________</b>
                            </Grid>
                        </Grid>
                        <table className={classes.table}>
                            <thead>
                                <tr>
                                    <th className={classes.th2} colSpan="2">Product Range</th>
                                    <th className={classes.th2} >Weight & Pack size</th>
                                    <th className={classes.th2} >Packets in Case</th>
                                    <th className={classes.th2} >Invoice Price</th>
                                    <th className={classes.th2} >Quantity</th>
                                    <th className={classes.th2} >Amount Rs</th>

                                </tr>
                                
                            </thead>
                            <tbody>
                                <tr >                                    
                                    <td className={classes.td}><b>1</b></td>
                                    <td className={classes.td}><b>Tea Pouch</b></td>
                                    <td className={classes.td}><b>20 g</b></td><td className={classes.td}><b>400</b></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td>
                                </tr>
                                <tr >                                    
                                    <td className={classes.td}><b>2</b></td>
                                    <td className={classes.td}><b>Tea Pouch</b></td>
                                    <td className={classes.td}><b>50 g</b></td><td className={classes.td}><b>240</b></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td>
                                </tr>
                                <tr >                                    
                                    <td className={classes.td}><b>3</b></td>
                                    <td className={classes.td}><b>Tea Pouch</b></td>
                                    <td className={classes.td}><b>100 g</b></td><td className={classes.td}><b>144</b></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td>
                                </tr>
                                <tr >                                    
                                    <td className={classes.td}><b>4</b></td>
                                    <td className={classes.td}><b>Tea Pouch</b></td>
                                    <td className={classes.td}><b>200 g</b></td><td className={classes.td}><b>48</b></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td>
                                </tr>
                                <tr >                                    
                                    <td className={classes.td}><b>5</b></td>
                                    <td className={classes.td}><b>Tea Pouch-Premium</b></td>
                                    <td className={classes.td}><b>400 g</b></td><td className={classes.td}><b>24</b></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td>
                                </tr>
                                <tr >                                    
                                    <td className={classes.td}><b>6</b></td>
                                    <td className={classes.td}><b>Tea Pouch-Premium</b></td>
                                    <td className={classes.td}><b>1 Kg</b></td><td className={classes.td}><b>12</b></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td>
                                </tr>
                                <tr >                                    
                                    <td className={classes.td}><b>7</b></td>
                                    <td className={classes.td}><b>Tea Pouch-Catering Pack</b></td>
                                    <td className={classes.td}><b>1 Kg</b></td><td className={classes.td}><b>12</b></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td>
                                </tr>
                                <tr >                                    
                                    <td className={classes.td}><b>8</b></td>
                                    <td className={classes.td}><b>Tea Pouch-Export Quality</b></td>
                                    <td className={classes.td}><b>1 Kg</b></td><td className={classes.td}><b>12</b></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td>
                                </tr>
                                <tr >                                    
                                    <td className={classes.td}><b>9</b></td>
                                    <td className={classes.td}><b>Tea Pouch-BOPF</b></td>
                                    <td className={classes.td}><b>1 Kg</b></td><td className={classes.td}><b>12</b></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td>
                                </tr>
                                <tr >                                    
                                    <td className={classes.td}><b>10</b></td>
                                    <td className={classes.td}><b>Tea Pouch-Dust No-1 Strong Tea</b></td>
                                    <td className={classes.td}><b>1 Kg</b></td><td className={classes.td}><b>12</b></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td>
                                </tr>
                                <tr >                                    
                                    <td className={classes.td}></td>
                                    <td className={classes.td}><b>Tea Bulk</b></td>
                                    <td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td>
                                </tr>
                                <tr >                                    
                                    <td className={classes.td}><b>1</b></td>
                                    <td className={classes.td}><b>Tea Bulk-Catering</b></td>
                                    <td className={classes.td}><b>5 Kg</b></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td>
                                </tr>
                                <tr >                                    
                                    <td className={classes.td}><b>2</b></td>
                                    <td className={classes.td}><b>Tea Bulk-Export Quality</b></td>
                                    <td className={classes.td}><b>5 Kg</b></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td>
                                </tr>
                                <tr >                                    
                                    <td className={classes.td}><b>3</b></td>
                                    <td className={classes.td}><b>Tea Bulk-Premium</b></td>
                                    <td className={classes.td}><b>5 Kg</b></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td>
                                </tr>
                                <tr >                                    
                                    <td className={classes.td}><b>4</b></td>
                                    <td className={classes.td}><b>Tea Bulk</b></td>
                                    <td className={classes.td}><b>5 Kg</b></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td>
                                </tr>
                                <tr >                                    
                                    <td className={classes.td}><b>5</b></td>
                                    <td className={classes.td}><b>Tea Basket-PF 1</b></td>
                                    <td className={classes.td}><b>4.5 Kg</b></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td>
                                </tr>
                                <tr >                                    
                                    <td className={classes.td}><b>6</b></td>
                                    <td className={classes.td}><b>Tea Basket-BP 1</b></td>
                                    <td className={classes.td}><b>4 Kg</b></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td>
                                </tr>
                                <tr >                                    
                                    <td className={classes.td}><b>7</b></td>
                                    <td className={classes.td}><b>Tea Bulk BP 1</b></td>
                                    <td className={classes.td}><b>5 Kg</b></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td>
                                </tr>
                                <tr >                                    
                                    <td className={classes.td}><b>8</b></td>
                                    <td className={classes.td}><b>Tea Bulk-Dust No 1</b></td>
                                    <td className={classes.td}><b>60 Kg</b></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td>
                                </tr>
                                <tr >                                    
                                    <td className={classes.td}></td>
                                    <td className={classes.td}><b>Tea Bag</b></td>
                                    <td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td>
                                </tr>
                                <tr >                                    
                                    <td className={classes.td}><b>1</b></td>
                                    <td className={classes.td}><b>Tea Bag(50 g)</b></td>
                                    <td className={classes.td}><b>25 Pkt</b></td><td className={classes.td}><b>24</b></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td>
                                </tr>
                                <tr >                                    
                                    <td className={classes.td}><b>2</b></td>
                                    <td className={classes.td}><b>Tea Bag(100 g)</b></td>
                                    <td className={classes.td}><b>50 Pkt</b></td><td className={classes.td}><b>24</b></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td>
                                </tr>
                                <tr >                                    
                                    <td className={classes.td}><b>3</b></td>
                                    <td className={classes.td}><b>Tea Bag(200 g)</b></td>
                                    <td className={classes.td}><b>100 Pkt</b></td><td className={classes.td}><b>12</b></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td>
                                </tr>
                                <tr >                                    
                                    <td className={classes.td}><b>4</b></td>
                                    <td className={classes.td}><b>Tea Bag-Catering Pack</b></td>
                                    <td className={classes.td}><b>250 Pkt</b></td><td className={classes.td}><b>12</b></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td>
                                </tr>
                                <tr >                                    
                                    <td className={classes.td}><b>5</b></td>
                                    <td className={classes.td}><b>Tea Bag-Catering Pack</b></td>
                                    <td className={classes.td}><b>1000 Pkt</b></td><td className={classes.td}><b>3</b></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td>
                                </tr>
                            <tr>
                                        
                                        <td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}><b>Total</b></td><td className={classes.td}></td>
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
export default withStyles(useStyles)(StockBalance);