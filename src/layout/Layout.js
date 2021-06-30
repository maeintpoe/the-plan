import React from 'react';
import './Layout.css';
import { useSelector } from 'react-redux';
import { selectPlanId } from '../features/appSlice';
import Chat from '../components/Chat/Chat';
import MainBoardHeader from '../components/MainBoardHeader/MainBoardHeader';


function Layout(props) {
    const planId = useSelector(selectPlanId);
    
    return (
        <div className="layout">
            {!planId ? (
                <h1 className="layout__welcome">Start planning!</h1>
                ) : (
                <>
                <MainBoardHeader />
                <div className="layout__body">
                    <div className="layout__board">
                        {props.children}
                    </div>
                    
                    <Chat />
                </div>
                </>
            )}
            
        </div>
    )
}

export default Layout;
