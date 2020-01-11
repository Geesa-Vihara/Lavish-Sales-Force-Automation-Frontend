import React from 'react';
import { withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Icon from "@material-ui/core/Icon";
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import GridList from '@material-ui/core/GridList';
import ReactFusioncharts from "react-fusioncharts";
import salesrep from "assets/img/faces/salesrep.png";
import axios from "axios";

const useStyles = theme => ({
 
  content: {
    textAlign:"right",
    marginRight:theme.spacing(2),
    color:"black"
  },  
  icon:{
     fontSize:100,
     
   },
  iconimage:{
    color:"white",
    borderRadius: "20px",
    backgroundColor:"#dcedc8",
    width:100,
    height:100,
    textAlign:"center",
    
  },
  iconstore:{
    fontSize:130,
    backgroundColor:"#dcedc8",
    color:"white",
    borderRadius: "20px",
    float:"left",
  },
  container:{
    width:"100%"
  },  
  avatar: {
    backgroundColor: "transparent",
  },
  inline: {
    display: 'inline',
  },

})

class Dashboard extends React.Component {
  state = {
    date:"",
    dailyOrders:[],
    dailyRevenue:null,
    topProduct:"",
    topCustomer:"",
    products:[],
    dailySales:[],
    salesByArea:{},
  };
  
  componentDidMount(){
    const token=localStorage.getItem("jwtToken");
    var date = new Date().getDate(); 
    var month = new Date().getMonth() + 1; 
    var year = new Date().getFullYear(); 
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   
    this.setState({      
      date:
        monthNames[month]+" "+date + ", "  +  year 
    });
    axios.get('/dashboard/dailyorders',{
      headers:{
        "Authorization": token 
       }
    })
      .then(res=>{
       this.setState({
           dailyOrders:res.data
      
      })      
      this.setState({dailyRevenue:this.getTotalRevenue()})
      }               
      )
      .catch(err=>{
            
            if(err.tokenmessage){
                this.setState({isexpire:true}) ; 
            }
        })

        axios.get('/dashboard/topcustomer',{
          headers:{
            "Authorization": token 
           }
        })
          .then(res=>{
            if(res.data.invoice.length!==0){
                this.setState({
                    topCustomer:res.data.invoice[0].customerName,
                
                }) 
          }else{            
            this.setState({
              topCustomer:"No outlet",
          
          }) 
          }
          }               
          )
          .catch(err=>{
                
                if(err.tokenmessage){
                    this.setState({isexpire:true}) ; 
                }
            })
        
            axios.get('/dashboard/topproduct',{
              headers:{
                "Authorization": token 
               }
            })
              .then(res=>{
                if(res.data.length!==0){
               this.setState({
                   products:res.data[0]
              
              }) 
              this.setState({topProduct:this.getTopProduct()})

            }
            else{
              this.setState({topProduct:"No product"})
            }     
              
              }               
              )
              .catch(err=>{
                    
                    if(err.tokenmessage){
                        this.setState({isexpire:true}) ; 
                    }
                })
       axios.get('/dashboard/topproduct',{
              headers:{
                "Authorization": token 
               }
            })
              .then(res=>{
                if(res.data.length!==0){
               this.setState({
                   products:res.data[0]
              
              }) 
              this.setState({topProduct:this.getTopProduct()})

            }
            else{
              this.setState({topProduct:"No product"})
            }     
              
              }               
              )
              .catch(err=>{
                    
                    if(err.tokenmessage){
                        this.setState({isexpire:true}) ; 
                    }
                })
        axios.get('/dashboard/dailysales',{
          headers:{
            "Authorization": token 
            }
        })
          .then(res=>{
            if(res.data.length!==0){
            this.setState({
                dailySales:res.data
          
          })
          this.getSalesByArea();

        }}               
          )
          .catch(err=>{
                
                if(err.tokenmessage){
                    this.setState({isexpire:true}) ; 
                }
            })

  }
  getLongAgo=(date)=>{ 
       
    var res = Math.abs(new Date() - new Date(date)) / 1000;         
     // get total days between two dates
     var days = Math.floor(res / 86400);
     // get hours        
     var hours = Math.floor(res / 3600) % 24; 
     // get minutes
     var minutes = Math.floor(res / 60) % 60;    
     // get seconds
     var seconds = Math.round(res % 60);
     if(days!==0){
         return days+" days ago";
     }
     else if(hours!==0){
         return hours+" hours ago";
     }
     else if(minutes!==0){
        return minutes+" minutes ago";
    }
    else if(seconds!==0){
        return seconds+" seconds ago";
    }
       
    }
    getTotalRevenue=()=>{
      var tot=0;
      Object.keys(this.state.dailyOrders).map((order,i)=> {
        return(
          tot=tot+this.state.dailyOrders[order].totalValue
        )
      });
      return tot;
    }
    getTopProduct=()=>{
      const {products}=this.state;
      if(products.teabag_sum>=products.teabasket_sum && products.teabag_sum>=products.teabottle_sum && products.teabag_sum>=products.teabulk_sum && products.teabag_sum>=products.teasachet_sum && products.teabag_sum>=products.teapouch_sum)
        return "Tea Bag";
      else if(products.teabasket_sum>=products.teabag_sum && products.teabasket_sum>=products.teabottle_sum && products.teabasket_sum>=products.teabulk_sum && products.teabasket_sum>=products.teasachet_sum && products.teabasket_sum>=products.teapouch_sum)
        return "Tea Basket";
      else if(products.teabottle_sum>=products.teabag_sum && products.teabottle_sum>=products.teabasket_sum && products.teabottle_sum>=products.teabulk_sum && products.teabottle_sum>=products.teasachet_sum && products.teabottle_sum>=products.teapouch_sum)
        return "Tea Bottle";
      else if(products.teabulk_sum>=products.teabag_sum && products.teabulk_sum>=products.teabasket_sum && products.teabulk_sum>=products.teasachet_sum && products.teabulk_sum>=products.teabottle_sum && products.teabulk_sum>=products.teapouch_sum)
        return "Tea Bulk";
      else if(products.teasachet_sum>=products.teabag_sum && products.teasachet_sum>=products.teabasket_sum && products.teasachet_sum>=products.teabottle_sum && products.teasachet_sum>=products.teabulk_sum && products.teasachet_sum>=products.teapouch_sum)
        return "Tea Sachet";
      else return "Tea Pouch"
    }
    getSalesByArea=()=>{
      var obj={};
      this.state.dailySales.map((sales,i)=> {        
        obj[sales._id]=sales.sum;
        return(         
          this.setState({salesByArea:obj})
        )
      });
      
    }
  render() {
    
    const { classes } = this.props;
    const {date,dailyOrders,dailyRevenue,topCustomer,products,topProduct,salesByArea}=this.state;
    return (

      <div> 
        <Grid container style={{marginTop:"2%"}}>
          <Grid item xs={7} >
            <Grid container >
              <Grid item xs={6} style={{height:300}}>
                <Card style={{marginRight:10,height:"100%"}}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        <Icon style={{color:"black"}}>monetization_on</Icon>
                      </Avatar>
                    }
                    title="Daily sales revenue"
                    subheader={date}
                    />
                    <Divider/>
                    <CardContent >
                      <div className={classes.iconimage}>
                        <Icon  className={classes.icon} >attach_money</Icon>
                      </div>
                      <CardContent className={classes.content}>
                        <Typography component="h4" variant="h4">
                          <b>{"Rs "}{dailyRevenue}</b>
                        </Typography>
                      </CardContent>
                    </CardContent>
                </Card>
              </Grid>

              <Grid item xs={6} style={{height:300}}>
                <Card style={{marginRight:10,height:"100%"}}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}  >
                        <Icon style={{color:"black"}}>stars</Icon>
                      </Avatar>
                    }
                    title="Top selling product"
                    subheader={date}
                    />
                    <Divider/>
                    <CardContent>
                      <div className={classes.iconimage}>                            
                        <Icon  className={classes.icon} >trending_up</Icon>
                      </div>
                      <CardContent className={classes.content}>
                        <Typography component="h4" variant="h4">
                          <b>{topProduct}</b>
                        </Typography>
                      </CardContent>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} style={{height:250}}>
                  <Card style={{marginRight:10,marginTop:10,height:"100%"}}>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}  >
                          <Icon style={{color:"black"}}>store</Icon>
                        </Avatar>
                      }
                      title="Top performing outlet"
                      subheader={date}
                      />
                    <Divider/>
                    <CardContent >
                      <CardContent className={classes.content}>  
                      <Icon className={classes.iconstore} >storefront</Icon>                      
                        <Typography component="h3" variant="h3" style={{marginTop:20}}>                          
                          <b>{topCustomer}</b>
                        </Typography>
                      </CardContent>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} style={{height:590}}>
                  <Card style={{marginTop:20,height:"100%",marginRight:10}}>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe" className={classes.avatar} >
                          <Icon style={{color:"black"}}>storage</Icon>
                        </Avatar>
                      }
                      title="Sales orders done by sales representatives"
                      subheader={date}
                      />
                    <Divider/>
                    <CardContent >
                      <GridList style={{marginLeft:10,marginRight:10}}>  
                        <List style={{width:"100%",height:490}}>
                          
                          {dailyOrders.map((order,i)=>{                            
                            return(
                              <div key={i}>
                                  <ListItem alignItems="flex-start" >
                                  <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={salesrep} />
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={order.customerName}
                                    secondary={
                                      <React.Fragment>
                                        <Typography
                                          component="span"
                                          variant="body2"
                                          className={classes.inline}
                                          color="textPrimary"
                                        >
                                          {order.salesrepName}
                                        </Typography>
                                        {"-"}{this.getLongAgo(order.orderDate)}
                                      </React.Fragment>
                                    }
                                  />
                                  
                                </ListItem> 
                                <Divider variant="inset" component="li" />
                              </div>
                            )
                            
                          })}
                                               
                        </List>
                      </GridList>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={5} >
              <Grid container  >
                <Grid item xs={12}>
                  <Card style={{height:500,marginRight:10}} >
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe" className={classes.avatar} >
                          <Icon style={{color:"black"}}>pie_chart</Icon>
                        </Avatar>
                      }
                      title="Sales according to product"
                      subheader={date}
                      />
                    <Divider/>
                    <CardContent>
                        <ReactFusioncharts
                            type="doughnut2d"
                            width="100%"
                            height="400"
                            dataFormat="JSON"
                            dataSource={{
                              chart: {
    
                                palettecolors:"#8bc34a,#dcedc8,#aed581,#8bc34a,#689f38,#558b2f",
                                showlegend: "1",   
                                showpercentvalues: "0",
                                aligncaptionwithcanvas: "0",
                                captionpadding: "0",
                                decimals: "1",
                                plottooltext:
                                  "<b>$label</b> sold <b>$percentValue</b> amount  ",
                                theme: "fusion"
                              },
                              data: [
                                {
                                  label: "Tea pouch",
                                  value: products.teapouch_sum
                                },
                                {
                                  label: "Tea bag",
                                  value: products.teabag_sum
                                },
                                {
                                  label: "Tea sachet",
                                  value: products.teasachet_sum
                                },
                                {
                                  label: "Tea bulk",
                                  value: products.teabulk_sum
                                },
                                {
                                  label: "Tea bottle",
                                  value: products.teabottle_sum
                                },
                                {
                                  label: "Tea basket",
                                  value: products.teabasket_sum
                                }
                              ]
                            }}
                        />
                    </CardContent>
                  </Card>
                </Grid>
              
                <Grid item xs={12} style={{height:650}} >
                  <Card style={{marginTop:10,marginRight:10,height:"100%"}}>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}  >
                          <Icon style={{color:"black"}}>map</Icon>
                        </Avatar>
                      }
                      title="Sales according to each area"
                      subheader={date}
                    />
                    <Divider/>
                    <CardContent >
                      <ReactFusioncharts
                        type="bar2d"
                        width="100%"
                        height="550"
                        dataFormat="JSON"
                        dataSource={{
                          chart: {
                            palettecolors:"#1b5e20",    
                            aligncaptionwithcanvas: "0",
                            plottooltext: "Rs <b>$dataValue</b> worth of sales done in $label",
                            theme: "fusion"
                          },
                          
                         data: [
                            {
                              label: "Kandy",
                              value: salesByArea['Kandy']
                            },
                            {
                              label: "Wellawaya",
                              value: salesByArea['Wellawaya']
                            },
                            {
                              label: "Badulla",
                              value: salesByArea['Badulla']
                            },
                            {
                              label: "Hambanthota",
                              value: salesByArea['Hambanthota']
                            },
                            {
                              label: "Pitigala",
                              value: salesByArea['Pitigala']
                            },
                            {
                              label: "Matara",
                              value: salesByArea['Matara']
                            },
                            {
                              label: "Galle",
                              value: salesByArea['Galle']
                            },
                            {
                              label: "Ambalangoda",
                              value: salesByArea['Ambalangoda']
                            },
                            {
                              label: "Kaluthara",
                              value: salesByArea['Kaluthara']
                            },
                            {
                              label: "Horana",
                              value: salesByArea['Horana']
                            },
                            {
                              label: "Diwulapitiya",
                              value: salesByArea['Diwulapitiya']
                            },
                            {
                              label: "Chilaw",
                              value: salesByArea['Chilaw']
                            },
                            {
                              label: "Pththalam",
                              value: salesByArea['Pththalam']
                            },
                            {
                              label: "Anuradhapura",
                              value: salesByArea['Anuradhapura']
                            },
                            {
                              label: "Polonnaruwa",
                              value: salesByArea['Polonnaruwa']
                            },
                            {
                              label: "Kuliyapitiya",
                              value: salesByArea['Kuliyapitiya']
                            },
                            {
                              label: "Kurunagala",
                              value: salesByArea['Kurunagala']
                            },
                            {
                              label: "Mathale",
                              value: salesByArea['Mathale']
                            },
                            {
                              label: "Kegalle",
                              value: salesByArea['Kegalle']
                            },
                            {
                              label: "Awissawella",
                              value: salesByArea['Awissawella']
                            },
                            {
                              label: "Rathnapura",
                              value: salesByArea['Rathnapura']
                            },
                            {
                              label: "Negombo",
                              value: salesByArea['Negombo']
                            },
                            {
                              label: "Gampaha",
                              value: salesByArea['Gampaha']
                            },
                            {
                                label: "Homagama",
                                value: salesByArea['Homagama']
                              }
                          ] 
                        }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
      </div>
    );
  }
}



export default withStyles(useStyles)(Dashboard);
