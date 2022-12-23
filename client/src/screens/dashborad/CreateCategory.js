import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Wrapper from './Wrapper';
import ScreenHeader from './../../components/ScreenHeader';
import {setSuccess} from "../../store/reducer/globalReducer";
import {useCreateCategoryMutation} from "../../store/service/categoryService";


const CreateCategory = () => {
  const [state, setState] = useState("");
  const [saveCategory, response]= useCreateCategoryMutation();
  const errors = response?.error?.data?.errors ? response?.error?.data?.errors: [];
  const submitCategory = (e) =>{
    e.preventDefault()
    saveCategory({name:state})

  }
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(()=>{
      if(response?.isSuccess){
        dispatch(setSuccess(response?.data?.message))
        navigate("/dashboard/categories")
      }
  },[response?.isSuccess])
  return (
    <Wrapper> 

      <ScreenHeader>

        <Link to="/dashboard/categories" className='btn-dark'><i className='bi bi-arrow-left-short'></i>Categories List</Link>
      </ScreenHeader>
        <form className='w-full md:w-8/12' onSubmit={submitCategory}>

              <h3 className='text-lg capitalize mb-3'>create category</h3>
              {
                errors.length >0  && errors.map((error, key)=>(
                  <p className='alert-danger' key={key}>
                    {error.msg}
                  </p>
                ))
              }
              <div className='mb-3'>
                <input type="text"  name="" className='form-control' placeholder='Category Name...' value={state} onChange={(e) =>{setState(e.target.value)}}/>
              </div>
              <div className='mb-3'>
                <input type="submit" value="create category" className='btn btn-indigo' />
              </div>
        </form>
    </Wrapper>
  )
}

export default CreateCategory
