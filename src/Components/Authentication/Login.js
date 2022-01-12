import React from 'react'
import img from "../../Images/favicon.png";
import './login.css'

function Login() {
    return (
        <div className='login-wrapper'>
            <div className='login-container'>
                <div className='login-form'>
                    <div className='login-form-group'>
                        <h2>Sign In</h2>
                        <p>Login to stay connected</p>
                        <form>
                            <div className='form-group-col'>
                                <input type="email" className="form-control" placeholder="Email" required="required" />
                                <input type="password" className="form-control" placeholder="Password" required="required" />
                            </div>
                            <div className='form-group-option'>
                                <div className='flex flex-direction-row flex-gap-10'>
                                    <input type="checkbox" />
                                    <label >Remember Me</label>
                                </div>
                                <button className='btn-clear'>Forgot Password?</button>
                            </div>
                            <div className='authentication'>
                                <button type="submit" >Sign In</button>
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
