import React from 'react';
import './Plan.css';
import { setPlanInfo } from '../../features/appSlice';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Plan({ id, planName }) {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const updatePlanInfo = () => {
        dispatch(setPlanInfo({
            planId: id,
            planName: planName,
        }));
        history.push(`/${planName}/dashboard/${id}`);
    }

    return (
        <div 
            className="plan" 
            onClick={updatePlanInfo}>
            {planName}
        </div>
    )
}

export default Plan;
