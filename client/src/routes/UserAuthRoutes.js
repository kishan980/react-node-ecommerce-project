import { useSelector } from "react-redux";
import { Navigate, Outlet} from "react-router-dom";

const UserAuthRouter = ()=>{
        const { userToken} = useSelector(state => state.authReducer)
        return userToken ? <Navigate to="/user" />: <Outlet/>

}

export default UserAuthRouter