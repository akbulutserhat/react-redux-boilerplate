import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import { SignOut } from '../store/modules/auth/auth.action';
import Default from '../assets/default.png'

const Navigation = () => {

  const [isOpen, setIsOpen] = useState(false); // For hamburger menu

  const currentState = useSelector((state) => state);
  
  const { isAuthenticated, currentUser } = currentState.Auth;

  const dispatch = useDispatch()

  const logoutUser  = () => dispatch(SignOut());

  let imagePreview = null;
  if(currentUser && currentUser.avatar_path){
    imagePreview = (<img className="img_style_nav" src={currentUser.avatar_path} alt="profile 1"/>);
  } else {
    imagePreview = (<img className="img_style_nav" src={Default} alt="profile 2"/>);
  }

  const logout = (e) => {
    e.preventDefault()
    logoutUser()
  }

  const userProfile = isAuthenticated ?  `/profile/${currentUser.id}` : ""

  const SignedInLinks = (
              <React.Fragment>
                  <li className="mt-2">
                    <NavLink to="/signedLink">Test Link</NavLink>
                  </li>
                  <li className="mt-2">
                    <NavLink to="/signedLink2">Test Link 2</NavLink>
                  </li>
                  <div>
                    {imagePreview}
                  </div>
                  <ul>
                      <li>
                        <NavLink to={userProfile}>Profile</NavLink>
                      </li>
                      <li>
                        <a onClick={logout}>Logout</a>
                      </li>
                  </ul>
              </React.Fragment>
            )

  const SignedOutLinks = (
                <React.Fragment>
                  <li>
                    <Link to='/login'>Login</Link>
                  </li>
                  <li>
                    <Link to='/signup'>Signup</Link>
                  </li>
                </React.Fragment>
              )


  return (
    <div className="mb-3">
      <nav> 
        <h1 className="mx-auto"><Link to='/'>Title</Link></h1>
        <div> 
          <nav className="ml-auto">
            { isAuthenticated ? SignedInLinks: SignedOutLinks }
          </nav>
        </div>
      </nav>
    </div>
  );
}

export default Navigation