import { Button } from '@material-ui/core';
import React from 'react';
import './Login.css';
import { auth, provider, db } from '../../firebase/firebase';
import { useDispatch } from 'react-redux';
import { login } from '../../features/userSlice';
import { useHistory } from 'react-router';

function Login() {
    const dispatch = useDispatch();
    const history = useHistory();

    const googleSignIn = () => {
        auth.signInWithPopup(provider)
        .then( result => {
            console.log("result.user: ", result.user.displayName);
            console.log("result.user.photoURL: ", result.user.photoURL);
            console.log("result.user.uid: ", result.user.uid);
            dispatch(login({
                username: result.user,
                profilePic: result.user.photoURL,
                id: result.user.uid
            }))
                
            // Store or update to database
            db.collection('users').doc(result.user.uid).set({
            username: result.user.displayName,
            profilePic: result.user.photoURL,
            id: result.user.uid,
            }, { merge: true })
            .then(() => { console.log("User data stored!") } )
            .catch((error) => { console.error("Error writing document: ", error) });
            
            history.replace('/')
        })
        .catch(error => alert(error.message));
    }

    return (
        <div className="login">
            <div className="login__container">
            <h2>Log In</h2>
            {/* Uncomment later
             <div className="login__username">
                <h4>Username</h4>
                <form className="login__input">
                    <input 
                    // value
                    type="text"
                    placeholer="enter username"/>
                </form>
            </div>

            <div className="login__password">
                <h4>Password</h4>
                <form className="login__input">
                    <input type="password" />
                </form>
            </div>

            <Button
                className="login__button"
                variant="outlined"
            >
                Log In Here
            </Button> */}

            <p className="login__google" 
            onClick={googleSignIn}>Sign in with Google</p>
            </div>
        </div>
    )
}

export default Login;
