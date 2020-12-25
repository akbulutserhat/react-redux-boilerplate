import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from 'react-router-dom';
import { SignIn } from '../../store/modules/auth/auth.action';

const Login = () => {

    const currentState = useSelector((state) => state.Auth);
  
    const [user, setUser] = useState({
      email: '',
      password: ''
    });
    const dispatch = useDispatch()
  
    const userLogin = (credentials) => dispatch(SignIn(credentials))
  
  
    const handleChange = e => {
      setUser({
        ...user,
        [e.target.name]: e.target.value
      })
    }
    const submitUser = (e) => {
      e.preventDefault()
      userLogin({
        email: user.email,
        password: user.password
      });
    }
  
    if(currentState.isAuthenticated){
      return <Redirect to='/' />
    }
  
      return (
        <div className="App" id="page-container">
          <div className="container Auth">
          <div className="card-style">
            <h1>Login</h1>
            <div>
            <form onSubmit={submitUser}>
            <div className="mb-2">
              { currentState.authError && currentState.authError.Incorrect_details ? (
                <small className="color-red">{currentState.authError.Incorrect_details}</small>
                ) : (
                  ""
              )}
              { currentState.authError && currentState.authError.No_record ? (
                <small className="color-red">{currentState.authError.No_record}</small>
                ) : (
                  ""
              )}
            </div>
            <div>
              <label>Email</label>
              <input type="email" name="email" placeholder="Enter email" onChange={handleChange} />
              { currentState.authError && currentState.loginError.Required_email ? (
                <small className="color-red">{currentState.authError.Required_email}</small>
                ) : (
                  ""
              )}
              { currentState.authError && currentState.loginError.Invalid_email ? (
                <small className="color-red">{ currentState.authError.Invalid_email }</small>
                ) : (
                  ""
              )}
              </div>
              <div>
              <label>Password</label>
              <input type="password" name="password" placeholder="Enter password" onChange={handleChange}/>
              { currentState.authError && currentState.authError.Required_password ? (
                <small className="color-red">{ currentState.authError.Required_password }</small>
                ) : (
                  ""
                )}
                { currentState.authError && currentState.authError.Invalid_password ? (
                <small className="color-red">{ currentState.authError.Invalid_password }</small>
                ) : (
                  ""
                )}
                { currentState.authError && currentState.authError.Incorrect_password ? (
                <small className="color-red">{ currentState.authError.Incorrect_password }</small>
                ) : (
                  ""
                )}
              </div>
  
              { currentState.isLoading ? (
                <button
                  className="btn btn-primary"
                  type="submit"
                  block
                  disabled
                >
                  Login...
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  type="submit"
                  block
                  disabled={ user.email === "" || user.password === ""  }
                >
                  Login
              </button>
              )}
              </form>
              <div className="mt-2" style={{display: "flex", justifyContent: "space-between"}}>
                <div>
                  <small><Link to="/signup">Sign Up</Link></small>
                </div>
              </div>
             
              </div>
            </div>
          </div>
          
  
          </div>
      );
  }
  
  export default Login