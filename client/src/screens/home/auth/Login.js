import Nav from "./../../../components/home/Nav";
import Header from "./../../../components/home/Header";
import { Link ,useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useUserLoginMutation } from "../../../store/service/authService";
import { setSuccess } from "../../../store/reducer/globalReducer";
import { useForm } from "../../../hook/Form";
import {showError} from"../../../utils/ShowError";
import { setUserToken } from "../../../store/reducer/authReducer";

const Login = () => {
    const [errors, setError] = useState([])
    const {state, onChange }=useForm({
        email:"",
        password:""
    })
    // const [state, setState] = useState({email:"", password:""})
    // const onChange = (e) =>{
    //     setState({...state, [e.target.name]:e.target.value});
    //     }   
    const [loginUser, response] =useUserLoginMutation()
    const onSubmit = (e)=>{
        e.preventDefault();
        loginUser(state)
        console.log(state)
    }

    useEffect(() =>{
        if(response.isError){
            setError(response?.error?.data?.errors)
        }
    },[response?.error?.data])
    const navigate = useNavigate()
    const dispatch =useDispatch();

    useEffect(() =>{
        if(response.isSuccess){
            localStorage.setItem('user-token', response?.data?.data)
            dispatch(setSuccess(response?.data?.msg))
            dispatch(setUserToken(response?.data?.data))
            navigate("/user")
        }
    }, [response.isSuccess])

    // const showError = (name) =>{
    //     const exist = errors.find(err =>err.param === name);
    //     if(exist){
    //         return exist.msg
    //     }else {
    //         return false
    //     }
    // }

        return (
        <>
            <Nav />
            <div className="mt-[70px] pb-[80px]">
                <Header>Sign in</Header>
                <div className="flex flex-wrap justify-center">
                    <motion.div initial={{opacity:0, x:"-100vw"}}  animate={{opacity:1, x:0}}  className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 p-6">
                        <form className="bg-white rounded-lg -mt-12 border border-gray-200 p-10" onSubmit={onSubmit}>
                            <h1 className="heading mt-5">Sign in</h1>
                            <div className="mb-4">
                                <label className="form-label" htmlFor="email">email</label>
                                <input type="email" name="email" id="email" className={`form-input ${showError(errors,'email') ? 'border-rose-600':'border-gray-300'}`} placeholder="Email..." value={state.email} onChange={onChange}/>
                                {showError(errors,'email') && <span className="error">{showError(errors,'email')}</span>}
                                </div>
                            <div className="mb-4">
                            <label className="form-label" htmlFor="password">password</label>
                            <input type="password" name="password" id="password" className={`form-input ${showError(errors,'password') ? 'border-rose-600' :'border-gray-300'}`} placeholder="Password..." value={state.password} onChange={onChange}/>
                            {showError(errors,'password') && <span className="error">{showError(errors,'password')}</span>}
                            </div>
                        <div className="mb-4">
                            <input type="submit" value={`${response.isLoading ? "loading...." :"sign in"}`} disabled={response?.isLoading ? true:false} className="btn btn-indigo w-full"/>
                        </div>
                        <div>
                            <p>don't have account ? <span className="capitalize font-medium text-base text-black"><Link to="/register">register</Link></span></p>
                        </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default Login;
