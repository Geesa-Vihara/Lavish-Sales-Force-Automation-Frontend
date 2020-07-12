import React from 'react';
import { Redirect } from 'react-router-dom';
import { withStyles} from '@material-ui/core';
import Modal from "@material-ui/core/Modal";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Card,CardContent,CardActions,Grid} from '@material-ui/core';
import logo from "assets/img/lavishlogo.png";
import { Icon } from "@material-ui/core";
import { Table,TableCell,TableHead,TableBody,TableRow} from '@material-ui/core';
import Axios from 'axios';
const useStyles = theme =>({

    button:{
      //  color:theme.palette.common.white,
        // backgroundColor:"#1b5e20",
        // '&:hover':{
        // backgroundColor:"#8EB69B",
        // },
        width:'20%',
        marginRight:theme.spacing(2)
       
    },
    buttonprint:{
        backgroundColor:"#DCDCDC",
        float:"right",
       // marginBottom:10,
        //marginTop:5
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        //height:"90%"
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
    typography:{
        margin:'2px'
    },
    table: {
        marginBottom: "0",
        width: "100%",
        maxWidth: "100%",
        borderCollapse: "collapse",
       // border:'1px solid black'
      },
    tableHeadCell: {
       color: "inherit",
       fontSize: "1em",
      // border:'1px solid black'
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


class View extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            invoice : [],
            filteredData:[],
            isExpire:false,
            open:true,
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount(){
        const {match:{params}} = this.props;
        var token = localStorage.getItem('jwtToken');
        Axios
            .get(`/invoices/${params.id}`,{
                headers:{
                    'Authorization':token
                }
            })
            .then(res=>{
                this.setState({
                    invoice : res.data,
                    filteredData : res.data
                });
                //console.log(res.data);
            })
            .catch(err=>{
                if(err.message){
                    console.log(err.tokrnmessage);
                    this.setState({isExpire:true});
                }
            });
    }

    openModal = () => {
        this.setState({open:true});
    }

    closeModal = () => {
        this.setState({open:false});
        this.props.history.push("/admin/invoices");
    }
    printreport=()=>{
        const content = document.getElementById('reporttoprint').innerHTML;   
        const orderHtml = ' <html><body>' + content + '</<body></html>';
        document.body.innerHTML = orderHtml;        
        window.location.reload();
        window.print();  
    }

    render(){
        const { classes } = this.props;
        const { invoice } = this.state;

        if(!this.state.isExpire){
            return(
                <Modal
                    
                    className={classes.modal}
                    open={this.state.open}
                    onClose={this.closeModal}
                    BackdropProps={{
                        style:{
                            opacity:'0.5'
                        }
                    }}
                >
                    <Card className={classes.modalCard}>
                        <CardContent >
                            <div>
                                <Button className={classes.buttonprint} onClick={this.printreport} ><Icon style={{fontSize:30}}>printer</Icon>Print</Button>
                            </div> 
                            <div id="reporttoprint"> 
                            <Grid item xs={12} style={{marginTop:'45px'}} >
                                <div className={classes.logo}style={{float:"left"}}>                    
                                    <img className={classes.logoimg} src={logo} alt="img" />                    
                                </div>
                                <div style={{float:"right"}} ><b>Lavish Tea (Private) Limited<br/>No 40<br/>Raymond Road<br/>Nugegoda<br/>Tel-011 4349191</b></div>
                            </Grid>                  
                            {/* <div style={{float:"left",marginTop:"30px"}}>
                                <img style={{width:"120px",height:"120px"}} src={logo} alt="logo"/>
                            </div>
                            <Typography style={{textAlign:"left",float:"right",marginTop:"40px",marginLeft:"100px"}}><b>Lavish Tea (Private) Limited<br/>No 40<br/>Raymond Road<br/>Nugegoda<br/>Tel-011 4349191<br/></b></Typography> */}
                            <Typography variant="h6" className={classes.typography} style={{float:"right",marginTop:"15px",marginLeft:"70%"}}>Sales Order Invoice</Typography>
                            <div style={{textAlign:"left",float:"right",marginTop:"15px"}}>
                                <Typography className={classes.typography} >Date:<label style={{textAlign:"right",float:"right"}} >{invoice.orderDate}</label><br/></Typography >
                                <Typography className={classes.typography} >Invoice RefNo:<label style={{textAlign:"right",float:"right"}}>{invoice.Invoiceno}</label><br/></Typography >
                                <Typography className={classes.typography} >Territory:<label style={{textAlign:"right",float:"right"}}>{invoice.CustomerAddress}</label><br/></Typography >
                                <Typography className={classes.typography} >Salesrep :<label style={{textAlign:"right",float:"right"}}>{invoice.salesrepName}</label><br/></Typography >
                            </div>
                            <div style={{textAlign:"left",float:"left",marginBottom:"5px",marginTop:"5px"}}>
                                <Typography className={classes.typography} ><b>Bill To<br/></b></Typography >
                                <Typography className={classes.typography} >Customer:<label style={{textAlign:"right",float:"right"}}>{invoice.customerName}</label><br/></Typography >
                                <Typography className={classes.typography} >Address:<label style={{textAlign:"right",float:"right"}}>{invoice.CustomerAddress}</label><br/></Typography >
                                {/* <Typography className={classes.typography} >Contact :<label style={{textAlign:"right",float:"right"}}>0716008664</label><br/></Typography > */}
                            </div>
                            <Table className={classes.table}>
                                <TableHead className={classes.tableHeadCell}>
                                    <TableRow>
                                        {/* <TableCell >Invoice Id</TableCell>   product code */}
                                        <TableCell style={{border:'1px solid black'}}>Product</TableCell>
                                        <TableCell style={{border:'1px solid black'}}>Weight</TableCell>
                                        <TableCell style={{border:'1px solid black'}}>Qty</TableCell>
                                        <TableCell style={{border:'1px solid black'}}>price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Object.keys(invoice).filter(p=>invoice[p].price>0).map((product,i)=> {
                                   
                                            return(
                                                <TableRow key={i} hover>   
                                                    <TableCell style={{border:'1px solid black'}}>{invoice[product].name}</TableCell>
                                                    <TableCell style={{border:'1px solid black'}}>{invoice[product].weight}</TableCell>
                                                    <TableCell style={{border:'1px solid black'}}>{invoice[product].qut}</TableCell>
                                                    <TableCell style={{border:'1px solid black'}}>{invoice[product].price}</TableCell>
                                                </TableRow>  
                                            );
                                        
                                    })}
                                    <TableRow>
                                        <TableCell rowSpan={4} style={{border:'1px solid black'}}/>
                                        <TableCell colSpan={2} style={{border:'1px solid black'}}>Sub Total</TableCell>
                                        <TableCell align="right" style={{border:'1px solid black'}}>{invoice.totalValue}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={2} style={{border:'1px solid black'}}>AddDisc Total</TableCell>
                                        <TableCell align="right" style={{border:'1px solid black'}}>0</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={2} style={{border:'1px solid black'}}>Tax/VAT Total</TableCell>
                                        <TableCell align="right" style={{border:'1px solid black'}}>0</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={2} style={{border:'1px solid black'}}><b>Total</b></TableCell>
                                        <TableCell align="right" style={{border:'1px solid black'}}><b>{invoice.totalValue}</b></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
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
            )
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
export default withStyles(useStyles)(View);