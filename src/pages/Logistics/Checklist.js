import React, { useEffect, useState } from 'react';
import './Checklist.css';
import firebase from 'firebase';
import { db } from '../../firebase/firebase';
import { v4 as uuid } from 'uuid';
import { List, ListItem, ListItemText, Checkbox} from '@material-ui/core';
// Icons
import AddIcon from '@material-ui/icons/Add';

function Checklist({ planId }) {
    const [uncheckedlist, setUncheckedlist] = useState(null);
    const [checkedlist, setCheckedlist] = useState(null);
    const [checklistInput, setChecklistInput] = useState("");

     // Get checklist
     useEffect(() => {
        db.collection('plans')
            .doc(planId)
            .collection('logistics')
            .doc('checklist')
            .collection('unchecked')
            .orderBy('timestamp')
            .onSnapshot((snapshot) =>
                setUncheckedlist(snapshot.docs.map((doc) => 
                    doc.data())
                )
            );
        db.collection('plans')
            .doc(planId)
            .collection('logistics')
            .doc('checklist')
            .collection('checked')
            .orderBy('timestamp', "desc")
            .onSnapshot((snapshot) => {
                setCheckedlist(snapshot.docs.map((doc) => 
                    doc.data())
                )
            });
    }, [planId]);

    const addToChecklist = (e) => {
        e.preventDefault();

        const itemId = uuid();
        db.collection('plans')
            .doc(planId).collection('logistics').doc('checklist').collection('unchecked')
            .doc(itemId).set({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                itemId: itemId,
                itemDesc: checklistInput,
            });
        setChecklistInput("");
    }

    const updateChecklist = (item, toChecked) => {

        if(toChecked) {
            // Move from unchecked to checked
            db.collection('plans').doc(planId).collection('logistics').doc('checklist')
                .collection('checked').doc(item.itemId).set({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    itemId: item.itemId,
                    itemDesc: item.itemDesc,
            })
            db.collection('plans').doc(planId).collection('logistics').doc('checklist')
                    .collection('unchecked').doc(item.itemId).delete();
        } 
        else {
            // Move from checked to unchecked
            console.log("insided to unchecked")
            console.log("crossed out text is: ", item.itemDesc);
            db.collection('plans').doc(planId).collection('logistics').doc('checklist')
                .collection('unchecked').doc(item.itemId).set({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    itemId: item.itemId,
                    itemDesc: item.itemDesc,
            })
            db.collection('plans').doc(planId).collection('logistics').doc('checklist')
                .collection('checked').doc(item.itemId).delete();
        }
    }


    return (
        <div className="checklist">
                    <div className="checklist__title">
                        <h3>Checklist</h3>
                    </div>
                    
                    <div className="checklist__lists">
                        <List className="checklist__unchecked">
                            {uncheckedlist ? (uncheckedlist.map((item) => (
                                <ListItem className="checklist__uncheckedItem" key={item.itemId}>
                                    <Checkbox 
                                        edge="start"
                                        checked={false}
                                        onClick={() => {updateChecklist(item, true)}}
                                    />
                                    <ListItemText 
                                        primary={item.itemDesc}
                                    />
                                </ListItem>))
                                ) : (<p> No item in checklist </p>)
                            }
                        </List>
                        <List className="checklist__checked">
                        {checkedlist ? (checkedlist.map((item) => (
                            <ListItem className="checklist__checkedItem" key={item.itemId}>
                                <Checkbox 
                                    edge="start" color="default"
                                    checked={true}
                                    onClick={() => {updateChecklist(item, false)}}
                                />
                                <ListItemText 
                                    className="checklist__checkedText" primary={item.itemDesc}
                                />
                            </ListItem>
                        ))
                        ): ("")} 
                    </List>
                    </div>

                    <div className="checklist__input">
                        <form>
                            <input value={checklistInput}
                            onChange={(e) => setChecklistInput(e.target.value)}
                            placeholder={`Enter new item`}
                            />
                            <button
                                className="checklist__inputButton"
                                type="submit"
                                onClick={addToChecklist}
                            >
                                <AddIcon className="checklist__addChecklistIcon" fontSize="small" />
                            </button>
                        </form>
                    </div>        
        </div>
    )
}

export default Checklist;
