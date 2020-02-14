import React,{ Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { Icon } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { Card,CardContent } from '@material-ui/core';

const useStyles = theme => ({    
    buttonprint:{
        backgroundColor:"#DCDCDC",
        float:"right",
        marginBottom:10
    },
    button:{
        width:'20%',
        marginRight:theme.spacing(2)
       
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalCard: {
        width: '100%',
        height:'100%',
        maxWidth: 900,
        overflow:'auto'
    },
    modalCardContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    sign:{
       textAlign:"center",
       marginTop:20,
       fontSize:13
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
    constructor (props){
        super(props);
        this.state={        
        isexpire:false,
        sales:[],
        open:false,
        rep:"",
        dist:"",
        area:"",
        currdate:""

        }; 
      }
    
    closeModal = () => {
        this.setState({open:false});
        this.props.history.push("/admin/reports");
    }
    printreport=()=>{
        const content = document.getElementById('reporttoprint').innerHTML;   
        const orderHtml = ' <html><head><title></title><style>table {line-height:1;}</style></head><body>' + content + '</body></html>';
        document.body.innerHTML = orderHtml;        
        window.location.reload();
        window.print();  
    }
    
    componentDidMount=()=>{
        this.setState({open:true});
        const {match:{params}} =this.props;
        var token=localStorage.getItem("jwtToken");
        const userData={
            type:"sales",
            distributor:params.id2,
            date:this.props.date
        }
        axios.post("/reports/byDist", userData,{
           headers:{
             "Authorization": token 
           }
         }
           )
             .then(response => {
                 this.setState({sales:response.data});
                 this.setState({rep:response.data[0].salesrepName});
                 this.setState({dist:response.data[0].distUsername});
                 this.setState({area:response.data[0].area});
                 this.setState({currdate:response.data[0].currdate});
                  
             })
             .catch(err=>{
                 
                 if(err.tokenmessage){
                     this.setState({isexpire:true}) ; 
                 }
             })
         
     }
    
    render(){
        const {classes}=this.props;
        var tv=0;var tp=0;var tb=0;var ts=0;var tbu=0;var tbo=0;var tba=0;
        const {sales}=this.state;
        return(
            <Modal
                    className={classes.modal}
                    open={this.state.open}
                    onClose={this.closeModal}
                >
                  <Card className={classes.modalCard}>
                        <CardContent className={classes.modalCardContent}>   
                    <div>
                        <Button className={classes.buttonprint} onClick={this.printreport} ><Icon style={{fontSize:40}}>printer</Icon>Print</Button>
                    </div>  
                    <Grid container id="reporttoprint"> 
                        <Grid container>
                            <Grid item xs={12}><b>Lavish Tea (Private)Limited<br/>No 40 ,Raymond Road<br/>Nugegoda</b></Grid>
                            <Grid item xs={12} style={{textAlign:"center"}}><b>Monthly Sales Report</b></Grid>
                        </Grid>
                        <table className={classes.table}>
                            <thead>
                                <tr>
                                    <th className={classes.th}>Area-{this.state.area}</th>
                                    <th className={classes.th}>Sales rep name-{this.state.rep}</th>
                                    <th className={classes.th}>Distributor-{this.state.dist}</th>
                                    <th className={classes.th}>Month/Year-{this.state.currdate}</th>
                                </tr>
                            </thead>
                        </table>
                        <label><br/></label>
                        <table className={classes.table}>
                            <thead>
                                <tr>
                                    <th className={classes.th2} rowSpan="2">Invoice No</th>
                                    <th className={classes.th2} rowSpan="2">Date</th>
                                    <th className={classes.th2} rowSpan="2">Working area</th>
                                    <th className={classes.th2} colSpan="6">RD Sales</th>
                                    <th className={classes.th2} rowSpan="2">Total RD Sales</th>
                                    <th className={classes.th2} rowSpan="2">Day collection</th>

                                </tr>
                                
                                <tr>
                                    
                                    <th className={classes.th2}>Tea Pouch</th>
                                    <th className={classes.th2}>Tea Bag</th>
                                    <th className={classes.th2}>Tea Sachet</th>
                                    <th className={classes.th2}>Tea Bulk</th>
                                    <th className={classes.th2}>Tea Bottle</th>
                                    <th className={classes.th2}>Tea Basket</th>

                                </tr>
                            </thead>
                            <tbody>
                            {Object.keys(sales).map((_, i) => {
                                tb=tb+sales[i].teabag_sum;
                                tp=tp+sales[i].teapouch_sum;
                                ts=ts+sales[i].teasachet_sum;
                                tbu=tbu+sales[i].teabulk_sum;
                                tbo=tbo+sales[i].teabottle_sum;
                                tba=tba+sales[i].teabasket_sum;
                                tv=tv+sales[i].totalValue;
                                return(
                                
                                    <tr key={i}>
                                        
                                        <td className={classes.td}><b>{sales[i].Invoiceno}</b></td>
                                        <td className={classes.td}><b>{sales[i].orderDate}</b></td>
                                        <td className={classes.td}><b>{sales[i].area}</b></td>
                                        <td className={classes.td}><b>{sales[i].teapouch_sum!==0?sales[i].teapouch_sum:""}</b></td>
                                        <td className={classes.td}><b>{sales[i].teabag_sum!==0?sales[i].teabag_sum:""}</b></td>
                                        <td className={classes.td}><b>{sales[i].teasachet_sum!==0?sales[i].teasachet_sum:""}</b></td>
                                        <td className={classes.td}><b>{sales[i].teabulk_sum!==0?sales[i].teabulk_sum:""}</b></td>
                                        <td className={classes.td}><b>{sales[i].teabottle_sum!==0?sales[i].teabottle_sum:""}</b></td>
                                        <td className={classes.td}><b>{sales[i].teabasket_sum!==0?sales[i].teabasket_sum:""}</b></td>
                                        <td className={classes.td}><b>{sales[i].totalValue!==0?sales[i].totalValue:""}</b></td>
                                        <td className={classes.td}><b>{sales[i].collection}</b></td>
                                    
                                    </tr>
                                    
                                
                                )
                                
                            })}
                            <tr>
                                        <td className={classes.td}></td>
                                        <td className={classes.td}></td>
                                        <td className={classes.td}><b>Total</b></td>
                                        <td className={classes.td}><b>{tp!==0?tb:""}</b></td>
                                        <td className={classes.td}><b>{tb!==0?tb:""}</b></td>
                                        <td className={classes.td}><b>{ts!==0?ts:""}</b></td>
                                        <td className={classes.td}><b>{tbu!==0?tbu:""}</b></td>
                                        <td className={classes.td}><b>{tbo!==0?tbo:""}</b></td>
                                        <td className={classes.td}><b>{tba!==0?tba:""}</b></td>
                                        <td className={classes.td}><b>{tv!==0?tv:""}</b></td>
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
                </CardContent>
                </Card>
                </Modal>
        )
                        
    }

}
export default withStyles(useStyles)(SalesReport);