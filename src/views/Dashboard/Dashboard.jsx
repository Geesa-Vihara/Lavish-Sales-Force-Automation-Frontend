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
import dailysales from "variables/dailysales.jsx";
import dailyproducts from "variables/dailyproducts.jsx";
import axios from "axios";
import jwt_decode from "jwt-decode";

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
  };
  componentDidMount(){
    const token=localStorage.getItem("jwtToken");
    const decoded=jwt_decode(token);
    this.setState({username:decoded.name}); 
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
           dailyOrders:res.data,
      
      })
      }               
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
  render() {
    const {date,dailyOrders}=this.state;
    const { classes } = this.props;
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
                          <b>Rs 20,000</b>
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
                          <b>Tea Pouch</b>
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
                          <b> Cargills Colombo</b>
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
                            dataSource={dailyproducts}
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
                        dataSource={dailysales}
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
