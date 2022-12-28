import {useSelector} from 'react-redux';
import { Navigate, Outlet} from "react-router-dom";

const UserRouter = ()=>{

    const {userToken} = useSelector(state =>state.authReducer)

    return userToken ? <Outlet/> :<Navigate to="/login"/>
}


export default  UserRouter