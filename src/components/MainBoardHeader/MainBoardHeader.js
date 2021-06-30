import React from 'react';
import './MainBoardHeader.css';
import { Avatar } from '@material-ui/core';

import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { selectPlanId, selectPlanName } from '../../features/appSlice';

function MainBoardHeader() {
    const user = useSelector(selectUser);
    // const planId = useSelector(selectPlanId);
    const planName = useSelector(selectPlanName);
    //  console.log("To share plan with others for later, planId: ", planId);

    return (
        <div className="mainBoardHeader">
            <h3>{planName}</h3>
            {/* Map through list of collaborators here */}
            <div className="mainBoardHeader__avatars">
                <Avatar 
                    className="mainBoardHeader__avatar"
                    src={user.profilePic}
                    alt="user1"
                />
            </div>
            
        </div>
    )
}

export default MainBoardHeader;
