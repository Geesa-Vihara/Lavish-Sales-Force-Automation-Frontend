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
            };
    componentDidMount=()=>{
        const token=localStorage.getItem("jwtToken");
        const decoded=jwt_decode(token);
        this.setState({username:decoded.name}); 
        
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
          
    }

    notiClose=()=> {
        this.setState({ openNotification: false });
        this.setState({ anchorEl: null });
    
    }
    logout=()=>{
        this.setState({ openProfile: false });
        this.setState({ anchorEl: null });           
        localStorage.removeItem('jwtToken');
    }
    dashboard=()=>{
        this.props.history.push('/admin/dashboard')
    }
    render(){
        const { classes } = this.props;
       const {anchorEl,openNotification,openProfile,username}=this.state;
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
                        badgeContent={5} 
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
                    <MenuItem onClick={this.notiClose}>Mike John responded to your email</MenuItem>                    
                    <MenuItem onClick={this.notiClose}>You have 5 new tasks</MenuItem>
                    <MenuItem onClick={this.notiClose}>You are now friend with Andrew</MenuItem>  
                    <MenuItem onClick={this.notiClose}>Another Notification</MenuItem>  
                    <MenuItem onClick={this.notiClose}>Another One</MenuItem> 
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
                    <MenuItem onClick={this.profileClose}><Link to={`/account/${username}`}>Account</Link></MenuItem>                    
                    <MenuItem onClick={this.logout}><Link to="/login">Logout</Link></MenuItem>
                </Menu>                    
            </div>
        )
    }
}

export default withRouter(withStyles(useStyles)(SMNavBar));
