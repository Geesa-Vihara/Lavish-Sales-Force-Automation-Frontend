import React, {Component} from "react";
import { Link } from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class SMNavBar extends Component{
    
        state = {
            anchorEl: null,
          
        };
    
   
    handleClick=(event)=> {
        
        this.setState({ anchorEl: event.currentTarget });
          
    }

    handleClose=()=> {
        
        this.setState({ anchorEl: null });
    
    }
    render(){
       const {anchorEl}=this.state;
       const open = Boolean(anchorEl);
        return(
           
            <div>                
                <button
                    style={{                        
                    marginRight:"10px",              
                    marginTop: "1rem"                                        
                    }}                    
                    className="btn-floating green"                    
                    >
                    <Link to="/dashboard"> <i className="material-icons">dashboard</i></Link>           
                </button>

                <button
                    style={{                     
                    marginRight:"10px",                 
                    marginTop: "1rem"                                        
                    }}                   
                    className="btn-floating green"
                    
                    >
                     <i className="material-icons">add_alert</i>                                  
                </button>

                <button
                    style={{                   
                    marginRight:"10px",                 
                    marginTop: "1rem"                                        
                    }}                    
                    className="btn-floating green"
                    aria-owns={open ? "simple-menu" : null}                    
                    aria-haspopup="true"                     
                    onClick={this.handleClick}
                    >
                    <i className="material-icons">person</i>               
                </button>
                
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}                    
                    onClose={this.handleClose}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                                   
                >
                    <MenuItem onClick={this.handleClose}><Link to="/updateprofile"> Profile</Link></MenuItem>                    
                    <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                </Menu>               
                
            </div>
        )
    }
}
export default SMNavBar;