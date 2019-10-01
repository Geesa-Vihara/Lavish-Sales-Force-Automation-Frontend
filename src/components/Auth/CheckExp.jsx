import jwt_decode from "jwt-decode";

const CheckExp=()=>{
    const token=localStorage.getItem("jwtToken");
    if(token){
        const decoded=jwt_decode(token);
        const currenttime=Date.now()/1000;
        const exptime=decoded.exp;
        
        if(exptime<currenttime){         
            return true;
        }else {
            return false;

    }
}
return null;
}
export default CheckExp;
