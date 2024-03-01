import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Protected({children}) {
    const {token} = useAuth()

    if(!token){
        return <Navigate to='/login' replace={true}></Navigate>
    }
    return children;
}

export default Protected;