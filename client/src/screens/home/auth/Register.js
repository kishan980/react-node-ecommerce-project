import { useState, useEffect } from "react";
import Nav from "./../../../components/home/Nav";
import Header from "./../../../components/home/Header";
import { Link,useNavigate } from "react-router-dom";
import {motion} from "framer-motion";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../../store/reducer/authReducer";
import { useUserRegisterMutation } from "../../../store/service/authService";
import { setSuccess } from "../../../store/reducer/globalReducer";
import { useForm } from "../../../hook/Form";
import { showError } from "../../../utils/ShowError";
const Register = () => {
    const [errors, setError] = useState([])
    // const [state, setState] = useState({
    //     name:"",
    //     email:"",
    //     password:""
    // })
    // const onChange = (e)=>{
    //     setState({...state, [e.target.name]: e.target.value})
    // }
    const {state, onChange} = useForm({
        name:"",
        email:"",
        password:""
    })
    const [registerUser, response] = useUserRegisterMutation()
     const onSubmit  =(e) =>{
        e.preventDefault()
        registerUser(state)
    }
    useEffect(() =>{
        if(response.isError){
            setError(response?.error?.data?.errors)
        }
    },[response?.error?.data])
        const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(()=>{
        if(response.isSuccess){
            localStorage.setItem('user-token', response?.data?.token)
            dispatch(setUserToken(response?.data?.token))
            dispatch(setSuccess(response?.data?.msg))
            navigate("/user")
        }
    },[response.isSuccess])
    // const showError = (name)=>{
    //     const exist = errors.find(err =>err.param === name)
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
                <Header>Sign up</Header>
                <div className="flex flex-wrap justify-center">
                    <motion.div initial={{opacity:0, x:"-100vw"}}  animate={{opacity:1, x:0}} className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 p-6">
                        <form onSubmit={onSubmit} className="bg-white rounded-lg -mt-12 border border-gray-200 p-10">
                            <h1 className="heading mt-5">Sign up</h1>
                            <div className="mb-4">
                                <label className="form-label" htmlFor="name">name</label>
                                <input type="text" name="name" id="name" className={`form-input ${showError(errors,'name') ? 'border-rose-600': 'border-gray-300'}`} placeholder="Name..." value={state.name} onChange={onChange}/>
                            {showError(errors,'name') && <span className="error">{showError(errors,'name')}</span>}
                                </div> 
                            <div className="mb-4">
                                <label className="form-label" htmlFor="email">email</label>
                                <input type="email" name="email" id="email" className={`form-input ${showError(errors,'email')? 'border-rose-600': 'border-gray-300'}`} placeholder="email..." value={state.email} onChange={onChange}/>
                                {showError(errors,'email') && <span className="error">{showError(errors,'email')}</span>}
                                </div>
                            <div className="mb-4">
                            <label className="form-label" htmlFor="password">password</label>
                            <input type="password" name="password" id="password" className={`form-input ${showError(errors,'password') ? 'border-rose-600':'border-gray-300'}`} placeholder="Password..." value={state.password} onChange={onChange}/>
                            {showError(errors,'password') && <span className="error">{showError(errors,'password')}</span>}
                            </div>
                        <div className="mb-4">
                            <input type="submit" value={`${response?.isLading ? 'loading...':'sign up'}`} disable={response?.isLoading ? true: false} className="btn btn-indigo w-full"/>
                        </div>
                        <div>
                            <p>already have account ? <span className="capitalize font-medium text-base text-black"><Link to="/login">Sign in</Link></span></p>
                        </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default Register;
