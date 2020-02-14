import React,{ Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import avatar from "assets/img/lavishlogo.png";
import Modal from "@material-ui/core/Modal";
import { Card,CardContent } from '@material-ui/core';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { Icon } from "@material-ui/core";

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
       marginTop:40
    },
    heading:{        
        marginBottom:10
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
        maxWidth: "150px",
        maxHeight: "150px",
    },
    logoimg:{
        width: "100%",
        height: "100%"
    },
    
  });
  
class StockBalance extends Component{
    constructor (props){
        super(props);
        this.state={        
        isexpire:false,
        stock:[],
        open:false,
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
            type:"stock",
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
                 this.setState({stock:response.data[0]});
                 this.setState({dist:response.data[0].distname});
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
        const {stock}=this.state;
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
                        <Grid item xs={12} >
                        <div className={classes.logo}style={{float:"left"}}>                    
                            <img className={classes.logoimg} src={avatar} alt="img" />                    
                        </div>
                        <div style={{float:"right"}} ><b>Lavish Tea (Private) Limited<br/>No 40<br/>Raymond Road<br/>Nugegoda<br/>Tel-011 4349191</b></div>
                        </Grid>                        
                        <Grid container className={classes.heading}>
                            <Grid item xs={12} >
                                <h5><b>Distributor Balance Stock Report</b></h5>
                            </Grid>
                            <Grid item xs={3}><b>
                                Area-{this.state.area}</b>
                            </Grid>
                            <Grid item xs={3}><b>
                                Month/Year-{this.state.currdate}</b>
                            </Grid>
                            <Grid item xs={6}><b>
                                Distributor Name-{this.state.dist}</b>
                            </Grid>
                        </Grid>
                        <table className={classes.table}>
                            <thead>
                                <tr>
                                    <th className={classes.th2} colSpan="2">Product Range</th>
                                    <th className={classes.th2} >Weight & Pack size</th>
                                    <th className={classes.th2} >Invoice Price</th>
                                    <th className={classes.th2} >Quantity</th>
                                    <th className={classes.th2} >Amount Rs</th>

                                </tr>
                                
                            </thead>
                            <tbody>
                            {Object.keys(stock).map((product,i)=> {
                                if(stock[product].price && stock[product].price!==0){
                                return(
                                    
                                    <tr key={i}>                                    
                                        <td className={classes.td} colSpan="2"><b>{stock[product].name}</b></td>
                                        <td className={classes.td}><b>{stock[product].weight}</b></td>
                                        <td className={classes.td}><b>{stock[product].rate}</b></td>
                                        <td className={classes.td}><b>{stock[product].qut}</b></td>
                                        <td className={classes.td}><b>{stock[product].price}</b></td> 
                                    </tr>

                                )
                                }
                                else return null;
                            })}  
                            <tr>
                                        
                                        <td className={classes.td} colSpan="4"></td><td className={classes.td}><b>Total</b></td><td className={classes.td}><b></b></td>
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
                    </CardContent>
                    </Card>
                </Modal>
        )
    }

}
export default withStyles(useStyles)(StockBalance);