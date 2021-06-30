import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { db } from '../../firebase/firebase';
import Plan from './Plan';

// Icons
import AddIcon from '@material-ui/icons/Add';
import Popup from './Popup';
import CloseIcon from '@material-ui/icons/Close';

function Sidebar() {
    const user = useSelector(selectUser);
    const [showPopup, setShowPopup] = useState(false);
    const [plans, setPlans] = useState([]);

    // Retrieve user's list of plans
    useEffect(() => {
        db.collection('users').doc(user.id)
        .collection('plans').orderBy('planName')
        .onSnapshot( (snapshot) => (
            setPlans(snapshot.docs.map((doc) => ({
                id: doc.id,
                plan: doc.data(),
            })))
        ))
    }, [user]);


    return (
        <div className="sidebar">
            
            <div className="sidebar__header">
                <h3>Plans</h3>
                {!showPopup ? (
                    <AddIcon 
                        className="sidebar__icon"
                        onClick={() => setShowPopup(true)}
                        fontSize="small"/>) : (
                    <CloseIcon 
                        className="sidebar__icon"
                        onClick={() => setShowPopup(false)}
                        fontSize="small"/>
                    )
                }
            </div>

            {showPopup ? 
                (<Popup user={user} />) :
                 (" ")
            }

            <div className="sidebar__plans">
                {plans.map(({ id, plan }) => (
                    <Plan 
                        key={id}
                        id={id} 
                        planName={plan.planName}
                        />
                ))}
            </div>
        </div>
    )
}

export default Sidebar;
