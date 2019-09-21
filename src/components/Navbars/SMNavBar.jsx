import React, {Component} from "react";
import { Link } from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
class SMNavBar extends Component{
    
        state = {
            anchorEl: null,
            openNotification:false,
            openProfile:false,
            username:""
        };
    
    componentDidMount=()=>{
        this.setState({username:sessionStorage.getItem('UserName')}); 
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
        sessionStorage.removeItem('UserName');
    }
    render(){
       
       const {anchorEl,openNotification,openProfile}=this.state;
       const opennoti = openNotification;
       const openprof = openProfile;              
        return(
            
            <div>                
                <button
                    style={{                        
                        marginRight:"10px"             
                                                        
                    }}                    
                    className="btn-floating transparent"                    
                    >
                    <Link to="/dashboard"> <i className="material-icons">dashboard</i></Link>           
                </button>
                
                
                <Badge 
                    color="secondary" 
                    badgeContent={5}                    
                    style={{
                        marginRight:"10px"
                    }}      
                >
                <button
                                     
                    className="btn-floating transparent"
                    aria-owns={opennoti ? "notifications" : null}                    
                    aria-haspopup="true"                     
                    onClick={this.notiClick}
                    
                    >
                     <i className="material-icons">add_alert</i>                      
                </button>
                </Badge>
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
                <button
                    style={{                   
                        marginRight:"10px"             
                                                        
                    }}                    
                    className="btn-floating transparent"
                    aria-owns={openprof ? "menu" : null}                    
                    aria-haspopup="true"                     
                    onClick={this.profileClick}
                    >
                    <i className="material-icons">person</i>               
                </button>
                <label>{this.state.username}</label>
                
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
                    <MenuItem onClick={this.profileClose}><Link to={`/updateprofile/${this.state.username}`}> Profile</Link></MenuItem>                    
                    <MenuItem onClick={this.logout}><Link to="/login">Logout</Link></MenuItem>
                </Menu>               
                
            </div>
        )
    }
}

export default SMNavBar;
