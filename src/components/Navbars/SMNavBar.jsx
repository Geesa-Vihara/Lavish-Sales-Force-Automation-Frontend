import React, {Component} from "react";
import { Link } from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class SMNavBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: false,
            setAnchorEl: false
        };
    }    
      
   
    handleClick=()=> {
        
        this.setState( {
            setAnchorEl: !this.state.setAnchorEl
          });
          
    }

    handleClose=()=> {
        
        this.setState( {
            setAnchorEl: false
          });
    
    }
    render(){
       const {anchorEl,setAnchorEl}=this.state;
        return(
           
            <div>                
                <button
                    style={{                        
                    marginRight:"10px",              
                    marginTop: "1rem"                                        
                    }}                    
                    className="btn-floating green"                    
                    >
                    <Link to="/dashboard"> <i class="material-icons">dashboard</i></Link>           
                </button>

                <button
                    style={{                     
                    marginRight:"10px",                 
                    marginTop: "1rem"                                        
                    }}                   
                    className="btn-floating green"
                    
                    >
                     <i class="material-icons">add_alert</i>                                  
                </button>

                <button
                    style={{                   
                    marginRight:"10px",                 
                    marginTop: "1rem"                                        
                    }}                    
                    className="btn-floating green"
                    aria-controls="simple-menu" 
                    aria-haspopup="true"                     
                    onClick={this.handleClick}
                    >
                    <i class="material-icons">person</i>               
                </button>
                
                <Menu
                    id="simple-menu"
                    anchorEl={!this.state.setAnchorEl}
                    keepMounted
                    open={Boolean(setAnchorEl)}                    
                    onClose={this.handleClose}
                    
                    anchorOrigin={{                        
                        horizontal: 'right',
                        
                    }}                                   
                    PaperProps={{
                        style: {
                           marginTop: "-17%"      
                        },
                      }}                   
                >
                    <MenuItem onClick={this.handleClose}><Link to="/updateprofile"> Profile</Link></MenuItem>                    
                    <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                </Menu>               
                
            </div>
        )
    }
}
export default SMNavBar;