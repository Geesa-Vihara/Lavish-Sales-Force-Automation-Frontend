import React from 'react';
import { Redirect } from 'react-router-dom';
import { withStyles} from '@material-ui/core';
import Modal from "@material-ui/core/Modal";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Card,CardContent,CardActions} from '@material-ui/core';
import logo from "assets/img/lavishlogo.png";
import { Table,TableCell,TableHead,TableBody,TableRow} from '@material-ui/core';
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
    typography:{
        margin:'2px'
    },
    table: {
        marginBottom: "0",
        width: "100%",
        maxWidth: "100%",
        borderCollapse: "collapse"
      },
    tableHeadCell: {
       color: "inherit",
       fontSize: "1.1em"
      },

})


class View extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            invoice : [],
            isExpire:false,
            open:true,
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }


    openModal = () => {
        this.setState({open:true});
    }

    closeModal = () => {
        this.setState({open:false});
        this.props.history.push("/admin/invoices");
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
                        <CardContent>
                            <div style={{float:"left"}}>
                                <img style={{width:"120px",height:"120px"}} src={logo} alt="logo"/>
                            </div>
                            <Typography className={classes.typography} style={{textAlign:"left",float:"right"}}><b>Lavish Tea (Private) Limited<br/>No 40<br/>Raymond Road<br/>Nugegoda<br/>Tel-011 4349191<br/></b></Typography>
                            <Typography variant="h6" className={classes.typography} style={{float:"right",marginTop:"30px",marginLeft:"70%"}}>Order Invoice</Typography>
                            <div style={{textAlign:"left",float:"right",marginTop:"20px"}}>
                                <Typography className={classes.typography} >Date:<label style={{textAlign:"right",float:"right"}} >2019-11-14</label><br/></Typography >
                                <Typography className={classes.typography} >Invoice RefNo:<label style={{textAlign:"right",float:"right"}}>2435</label><br/></Typography >
                                <Typography className={classes.typography} >Territory:<label style={{textAlign:"right",float:"right"}}>Matara</label><br/></Typography >
                                <Typography className={classes.typography} >Salesrep :<label style={{textAlign:"right",float:"right"}}>kumar</label><br/></Typography >
                            </div>
                            <div style={{textAlign:"left",float:"left",marginBottom:"5px",marginTop:"5px"}}>
                                <Typography className={classes.typography} ><b>Bill To<br/></b></Typography >
                                <Typography className={classes.typography} >Customer:<label style={{textAlign:"right",float:"right"}}>kamal perera</label><br/></Typography >
                                <Typography className={classes.typography} >Address:<label style={{textAlign:"right",float:"right"}}>meddawatha,Matara</label><br/></Typography >
                                <Typography className={classes.typography} >Contact :<label style={{textAlign:"right",float:"right"}}>0716008664</label><br/></Typography >
                            </div>
                            <Table className={classes.table}>
                                <TableHead className={classes.tableHeadCell}>
                                    <TableRow>
                                        <TableCell >Invoice Id</TableCell>
                                        <TableCell style={{fontSize:'1.1em'}}>Product</TableCell>
                                        <TableCell style={{fontSize:'1.1em'}}>Weight</TableCell>
                                        <TableCell style={{fontSize:'1.1em'}}>Qty</TableCell>
                                        <TableCell style={{fontSize:'1.1em'}}>Rate</TableCell>
                                        <TableCell style={{fontSize:'1.1em'}}>Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                {/* <TableBody>
                                    {this.state.invoice.map((product,i)=> {
                                        return(
                                            <TableRow key={i} hover>
                                                <TableCell>{product.id}</TableCell>
                                                <TableCell>{product.name}</TableCell>
                                                <TableCell>{product.weight}</TableCell>
                                                <TableCell>{product.qty}</TableCell>
                                                <TableCell>{product.rate}</TableCell>
                                                <TableCell>{product.total}</TableCell>

                                            </TableRow>  
                                        );
                                    })}
                                </TableBody> */}
                            </Table>
                        </CardContent>
                        <CardActions  style={{justifyContent:'right',marginTop:"85%"}}>
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