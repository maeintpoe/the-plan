import React from 'react';
import './MainBoard.css';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { selectPlanId, selectPlanName } from '../../features/appSlice';
// import { db } from '../../firebase/firebase';
import DateCountdown from '../../components/DateCountdown/DateCountdown';

// Images
import itinerary from '../../assets/Itinerary.svg';
import visionboard from '../../assets/Visionboard (1).svg';
import logistics from '../../assets/Logistics.svg';

function MainBoard() {    
    const history = useHistory();
    const planId = useSelector(selectPlanId);
    const planName = useSelector(selectPlanName);
   console.log("in mainboard")
    return (
        <div className="mainBoard">
            {!planId ? ("") : (
                <>
            <div className="mainBoard__countdown">
               <DateCountdown planId={planId} />
            </div>

            <div className="mainBoard__cards">
                <div 
                    className="mainBoard__card"
                    id="mainBoard__visionBoard"
                    onClick={() => history.push(`/${planName}/visionboard/${planId}`)}>
                    <img className="mainBoard__image" src={visionboard} alt="visionboard" />
                    <h2 className="mainBoard__text">Vision Board</h2>
                </div>
                <div 
                    className="mainBoard__card"
                    onClick={() => history.push(`/${planName}/logistics/${planId}`)}>
                    <img className="mainBoard__image" src={logistics} alt="logistics" />
                    <h2 className="mainBoard__text">Logistics</h2>
                </div>
                <div 
                    className="mainBoard__card"
                    onClick={() => history.push(`/${planName}/itinerary/${planId}`)}>
                    <img className="mainBoard__image" id="mainboard__itinerary" src={itinerary} alt="" />
                    <h2 className="mainBoard__text">Itinerary</h2>
                </div>
            </div>
                </>
            )}
            
        </div>
        
    )
}

export default MainBoard;
