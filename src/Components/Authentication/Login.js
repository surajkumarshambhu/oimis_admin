import React from 'react'
import img from "../../Images/favicon.png";
import './login.css'
import { ApiHelper } from '../../Helper/APIHelper';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {

    const [formData,setFormData] = useState({
        email:'',
        password:''
    })
    const [loader, setLoader] = useState(false);
    const history = useNavigate();
    function submit(e){
        setLoader(true)
        e.preventDefault()
        const postData = 
        {
            request: {
                email:  formData.email,
                password: formData.password,
            }
        }
        let url = "admin/login";
        ApiHelper(url,postData,'POST')
        .then(resposnse => {
            if (resposnse.success === false){
                setLoader(false)
            }
            else{
                localStorage.setItem('user', JSON.stringify(resposnse));
                history("/project-list");
                setLoader(false)
            }
        })
    }

    function handle(e){
        const newData = {...formData}
        newData[e.target.id] = e.target.value
        setFormData(newData)
    }

    return (
        <div className='login-wrapper'>
            <div className='login-container'>
                <div className='login-form'>
                    <div className='login-form-group'>
                        <h2>Sign In</h2>
                        <p>Login to stay connected</p>
                        <form onSubmit={(e) => submit(e)}>
                            <div className='form-group-col'>
                                <input type="email" className="form-control" placeholder="Email" required="required" id = 'email'  onChange={(e) => handle(e)} value={formData.email} />
                                <input type="password" className="form-control" placeholder="Password" required="required" id = 'password'  onChange={(e) => handle(e)} value={formData.password} />
                            </div>
                            <div className='form-group-option'>
                                <div className='flex flex-direction-row flex-gap-10'>
                                    <input type="checkbox" />
                                    <label >Remember Me</label>
                                </div>
                                <button className='btn-clear'>Forgot Password?</button>
                            </div>
                            <div className='authentication'>
                                <button type="submit" >
                                    {
                                        loader === true ? <></> : ""
                                    }
                                    {
                                        (loader) === true ? "Loading..." : "Sign In"
                                    }
                                </button>
                                <span>
                                    Create an Account 
                                    <a> Sign Up</a>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='flex'>
                    <img src={img} alt="" srcSet=""></img>
                    <div className='flex'>
                        <h1>Indian <span>Railways</span></h1>
                        <span>भारतीय रेल</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
