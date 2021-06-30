import React, { useState } from 'react';
import './Popup.css';
import { db } from '../../firebase/firebase';
import { useHistory } from 'react-router-dom';

function Popup({user, setShowPopup}) {
    const history = useHistory();
    const [planInput, setPlanInput] = useState("");
    const [showError, setShowError] = useState(false);
    let planId = "";

    const createNewPlan = (e) => {
        e.preventDefault();
        console.log("creating new plan");
        if(planInput) {
            // Store to user's plan list
            db.collection('users').doc(user.id).collection('plans').add({
                planName: planInput,
            }).then((docRef) => {
                planId = docRef.id;
 
                // Store to plans collection
                if(planId){
                    db.collection('plans').doc(planId).set({
                        planId: planId,
                        planName: planInput,
                    })
                    .then(() => {
                        setPlanInput("");
                        history.push(`/${planInput}/dashboard/${planId}`);
                    })
                    .catch((error) => { console.error("Error writing document: ", error) });
                }
            })
            .catch((error) => { console.error("Error writing document: ", error) }); 
        }
        
    }

    const joinExistingPlan = (e) => {
        e.preventDefault();
        console.log("joining existing plan");
        if(planInput) {
            // Check if the document exists firsts
            db.collection('plans').doc(planInput).get().then((doc) => {
                if(doc.exists){
                    // Store it to the user's list 
                    db.collection('users').doc(user.id)
                    .collection('plans').doc(planInput).set({
                        planId: planInput,
                        planName: doc.data()['planName'],
                    }, { merge: true})
                    .then(() => { 
                        console.log("User plan data stored!");
                        setPlanInput("");
                        history.replace(`/${planInput}/dashboard`); } )
                    .catch((error) => { console.error("Error writing document: ", error) });
                } else {
                    setShowError(true);
                }
            })     
        }
    }

    return (
        <div className="popup">
            <p className="popup__prompt">Enter id to join an existing plan or create a new plan: </p>
            
            {showError ? ( 
                <p className="popup__errorMsg">Couldn't find plan, try again.</p>
            ) : (" ")}
            
            <form>
                <input 
                    value={planInput}
                    onChange={(e) => setPlanInput(e.target.value)}
                    maxLength={25}
                />
                <div className="popup__buttons">
                    <button                   
                        className="popup__button"
                        id="popup__joinButton"
                        type="submit" 
                        onClick={joinExistingPlan}>
                            Join Plan
                    </button>
                    <button 
                        className="popup__button"
                        id="popup__createButton"
                        type="submit" 
                        onClick={createNewPlan}>
                            Create Plan
                    </button>
                </div>

                
            </form>
            
        </div>
    )
}

export default Popup;
