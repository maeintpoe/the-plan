import React, { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './firebase/firebase';
import Layout from './layout/Layout';

// Components
import Sidebar from './components/Sidebar/Sidebar';
import MainHeader from './components/MainHeader/MainHeader';

// Pages
import Login from './pages/Login/Login';
import MainBoard from './pages/MainBoard/MainBoard';
import VisionBoard from './pages/VisionBoard/VisionBoard';
import Logistics from './pages/Logistics/Logistics';
import Itinerary from './pages/Itinerary/Itinerary';

// Redux
import { selectUser, login, logout } from './features/userSlice';


function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        dispatch(login({
          username: authUser.displayName,
          profilePic: authUser.photoURL,
          id: authUser.uid,
        }))
      } else {
        dispatch(logout());
      }
    })
  },[]);

  return (
    <div className="app">
      
      <Router>
      <MainHeader />
        {!user ? (<Login />) : (
          <div className="app__body">
          <Sidebar />
          <Switch>
            <Route path="/*/dashboard/*">
              <Layout>
                <MainBoard />
              </Layout>
            </Route>
            <Route path="/*/visionboard/*">
              <Layout>
                <VisionBoard />
              </Layout>
            </Route>
            <Route path="/*/logistics/*">
              <Layout>
                <Logistics />
              </Layout>
            </Route>
            <Route path="/*/itinerary/*">
              <Layout>
                <Itinerary />
              </Layout>
            </Route>
            <Route exact path="/">
              <Layout>
                <MainBoard />
              </Layout>
            </Route>
          </Switch>
          
          </div>
        )}
        
      </Router>
    </div>
  );
}

export default App;
