import React from 'react';
import './MainHeader.css';

import logo from '../../assets/Logo.svg';
import { Avatar } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectUser } from '../../features/userSlice';
import { resetPlanInfo } from '../../features/appSlice';
import { auth } from '../../firebase/firebase';

function MainHeader() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const history = useHistory();

    const logOut = () => {
        if(user) {
            dispatch(resetPlanInfo()); 
        }
        history.replace('/');
        auth.signOut();
    }

    return (
        <div className="mainHeader">
            <div className="mainHeader__left">
                <img className="mainHeader__logo" 
                src={logo} alt="logo" />
                <h2>The Plan</h2>
            </div>
            
            <div className="mainHeader__right">
                {!user ? ("") : (
                    <>
                    <p onClick={logOut}>Log Out</p>
                    <Avatar 
                        className="mainHeader__avatar"
                        src={user.profilePic}
                        alt="current user avatar"/>
                    </>
                )}
                
            </div>
            
        </div>
    )
}

export default MainHeader;
