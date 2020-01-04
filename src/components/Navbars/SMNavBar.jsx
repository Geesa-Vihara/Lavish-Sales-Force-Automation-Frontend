import React, {Component} from "react";
import { Link,withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import jwt_decode from "jwt-decode";
import Button from '@material-ui/core/Button';
import Person from '@material-ui/icons/Person';
import Dashboard from '@material-ui/icons/Dashboard';
import Notification from '@material-ui/icons/Notifications';
import axios from "axios";

const useStyles = theme => ({
    margin: {
        margin: theme.spacing(2),        
      },
      icon:{
          color:"white"
      }
    
  });

class SMNavBar extends Component{
            state = {
                anchorEl: null,
                openNotification:false,
                openProfile:false,
                username:"",
                notifications:[],
                noOfNotifications:0, 
            };
    componentDidMount=()=>{
        const token=localStorage.getItem("jwtToken");
        const decoded=jwt_decode(token);
        this.setState({username:decoded.name}); 
        axios.get('/newnotifications',{
            headers:{
              "Authorization": token 
             }
          })
            .then(res=>{
             this.setState({
                 notifications:res.data,
                 noOfNotifications:res.data.length,  
            
            })
            }               
            )
            .catch(err=>{
                  
                  if(err.tokenmessage){
                      this.setState({isexpire:true}) ; 
                  }
              })
            
    }
  
    profileClick=(event)=> {
        this.setState({ openProfile: true });
        this.setState({ anchorEl: event.currentTarget });
          
    }

    profileClose=()=> {
        this.setState({ openProfile: false });
        this.setState({ anchorEl: null });
    
    }
    notiClick=(event)=> {
        this.setState({ openNotification: true });
        this.setState({ anchorEl: event.currentTarget });
        const userData={
            lasttimenoticlicked:new Date()
        };
        var token=localStorage.getItem("jwtToken");
        axios.put('/lastnoticlicked',userData, {
           headers:{
             "Authorization": token 
            }
         })
           .catch(err=>{
                 
                 if(err.tokenmessage){
                     this.setState({isexpire:true}) ; 
                 }
             })
          
    }

    notiClose=()=> {
        this.setState({ openNotification: false });
        this.setState({ anchorEl: null });
        this.setState({noOfNotifications:0,notifications:[]})
    
    }
    logout=()=>{
        this.setState({ openProfile: false });
        this.setState({ anchorEl: null });           
        localStorage.removeItem('jwtToken');
    }
    dashboard=()=>{
        this.props.history.push('/admin/dashboard')
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
    render(){
       const { classes } = this.props;
       const {anchorEl,openNotification,openProfile,username,notifications,noOfNotifications}=this.state;
       const opennoti = openNotification;
       const openprof = openProfile;              
        return(
            
            <div>                
                <Button
                     onClick={this.dashboard}  
                    > 
                     <Dashboard className={classes.icon}/>        
                </Button>
                <Button
                    aria-owns={opennoti ? "notifications" : null}                    
                    aria-haspopup="true"                     
                    onClick={this.notiClick}
                >
                     <Badge 
                        color="secondary" 
                        badgeContent={noOfNotifications} 
                        className={classes.margin}     
                    >    
                        <Notification className={classes.icon} />              
                    </Badge>                   
                 </Button> 
                 
                <Menu
                    id="notifications"
                    anchorEl={anchorEl}
                    keepMounted
                    open={opennoti}                    
                    onClose={this.notiClose}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                                   
                >
                    {noOfNotifications!==0 ? (
                        notifications.map((note,i)=> {
                            
                                return(                                        
                                <MenuItem key={i}onClick={this.notiClose}><b>{note.customerName}->{note.area} {note.salesrepName}</b>-{this.getLongAgo(note.orderDate)}</MenuItem>                                                 
                                   
                                )
                                
                        })
                    ) : (
                                                                
                            <MenuItem onClick={this.notiClose}>No New Notifications</MenuItem>                                                 
                           
                        )
                    }
                   
                   
                </Menu>       
                 <Button
                    aria-owns={openprof ? "menu" : null}                    
                    aria-haspopup="true"                     
                    onClick={this.profileClick}
                    > 
                    <Person className={classes.icon} />               
                </Button> 
                <label>{username}</label>
                <Menu
                    id="menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={openprof}                    
                    onClose={this.profileClose}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }}                                  
                >
                    <MenuItem onClick={this.profileClose}><Link to={`/account/${username}`} style={{color:"black"}}>Account</Link></MenuItem>                    
                    <MenuItem onClick={this.logout}><Link to="/login" style={{color:"black"}}>Logout</Link></MenuItem>
                </Menu>                    
            </div>
        )
    }
}

export default withRouter(withStyles(useStyles)(SMNavBar));
