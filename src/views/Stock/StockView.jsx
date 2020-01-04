import React from 'react';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import Modal from "@material-ui/core/Modal";
import Button from '@material-ui/core/Button';
import { Card,CardContent,CardActions } from '@material-ui/core';
//import StockTable from './StockTable';
import { Icon } from "@material-ui/core";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import avatar from "assets/img/lavishlogo.png";

 const useStyles = theme =>({
    buttonprint:{
        backgroundColor:"#DCDCDC",
        float:"right",
        marginBottom:10
    },
    button:{
      //  color:theme.palette.common.white,
        // backgroundColor:"#1b5e20",
        // '&:hover':{
        // backgroundColor:"#8EB69B",
        // },
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
    imgshadow:{
        margin: "10px auto 0",
        overflow: "hidden",
        maxWidth: "180px",
        boxShadow: "0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
        maxHeight: "180px",
        borderRadius: "50%"
    },
    img:{
        width: "100%",
        height: "100%"
    },
    user:{
        fontSize:19,
        color: "#1b5e20"
    },
    typography:{
        margin:'3px'
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
     

})


 class StockView extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isExpire:false,
            value:2,
            open:true,
            stock:[],
           
        };  
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);   
    }

    openModal = () => {
        this.setState({open:true});
    }

    closeModal = () => {
        this.setState({open:false});
        this.props.history.push("/admin/stock");
    }
    printreport=()=>{
        const content = document.getElementById('reporttoprint').innerHTML;   
        const orderHtml = ' <html><head><title></title><style>table {line-height:1;}</style></head><body>' + content + '</body></html>';
        document.body.innerHTML = orderHtml;        
        window.location.reload();
        window.print();  
    }
    componentDidMount=()=>{
        const {match:{params}} =this.props;
        var token=localStorage.getItem("jwtToken");
        axios.get(`/stock/${params.id}`, {
           headers:{
             "Authorization": token 
           }
         }
           )
             .then(response => {
                 this.setState({stock:response.data});
                 
                  
             })
             .catch(err=>{
                 
                 if(err.tokenmessage){
                     this.setState({isexpire:true}) ; 
                 }
             })
         
     }
     
    render(){
        const { classes } = this.props;
        const {stock}=this.state;
        if(!this.state.isExpire){
            return(
                <Modal
                    className={classes.modal}
                    open={this.state.open}
                    onClose={this.closeModal}
                    /* BackdropProps={{
                        style: {
                          opacity:'0.8'
                        }
                    }} */
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
                                <h5><b>Stock Order Form</b></h5>
                            </Grid>
                            <Grid item xs={3}><b>
                                Area-{stock.area}</b>
                            </Grid>
                            <Grid item xs={3}><b>
                                Month/Year-{stock.dateandtime}</b>
                            </Grid>
                            <Grid item xs={6}><b>
                                Distributor Name-{stock.distname}</b>
                            </Grid>
                        </Grid>
                        <table className={classes.table}>
                            <thead>
                                <tr>
                                    <th className={classes.th2} rowSpan="2">Product</th>
                                    <th className={classes.th2} rowSpan="2">Weight</th>
                                    <th className={classes.th2} rowSpan="2">Qty</th>
                                    <th className={classes.th2} rowSpan="2">Rate</th>
                                    <th className={classes.th2} colSpan="2">Value</th>
                                </tr>
                                <tr>                                    
                                    <th className={classes.th2} >Rs</th>
                                    <th className={classes.th2} >cts</th>
                                </tr>
                                
                            </thead>
                            <tbody>
                            {Object.keys(stock).map((product,i)=> {
                                if(stock[product].price && stock[product].price!==0){
                                return(
                                    
                                    <tr key={i}>                                    
                                        <td className={classes.td}><b>{stock[product].name}</b></td>
                                        <td className={classes.td}><b>{stock[product].weight}</b></td>
                                        <td className={classes.td}><b>{stock[product].qty}</b></td>
                                        <td className={classes.td}><b>{stock[product].rate}</b></td>
                                        <td className={classes.td}><b>{stock[product].price}</b></td>
                                        <td className={classes.td}><b>{stock[product].cents}</b></td> 
                                    </tr>

                                )
                                }
                            })}                               
                            <tr>
                                        
                                        <td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}></td><td className={classes.td}><b>Total</b></td><td className={classes.td}>{stock.totalValue}</td><td className={classes.td}></td>
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
                        <CardActions  style={{justifyContent:'right'}}>
                            <Button 
                                className={classes.button}
                                onClick={this.closeModal} 
                                variant='contained'
                            >
                                Close
                            </Button>
                        </CardActions>
                    </Card>
                </Modal>
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
export default withStyles(useStyles)(StockView);