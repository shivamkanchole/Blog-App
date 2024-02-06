import React from 'react'
import {useDispatch} from 'react-redux'
import {logout} from '../../store/authSlice'
import authService from '../../appwrite/Auth'
import {useNavigate} from 'react-router-dom'

function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logouthander = () =>{
        authService.Logoutuser().then(()=>{
            dispatch(logout())
            navigate('/')
            window.location.reload() // basically to refresh the page
        })
    }
  return <button
  className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
  onClick={logouthander}
  >Logout</button>
}

export default LogoutBtn