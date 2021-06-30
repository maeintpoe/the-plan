import React, { useState, useEffect } from 'react';
import './AddItinerary.css';
import { TextField } from '@material-ui/core';
import {  ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import DateTimePicker from 'react-datetime-picker';
import { db } from '../../firebase/firebase';
import { v4 as uuid } from 'uuid';

// Icons
import FoodIcon from '../../assets/food.svg';
import BeddingIcon from '../../assets/bedding.svg';
import ShoppingIcon from '../../assets/shopping.svg';
import BeachIcon from '../../assets/beach.svg';
import MountainIcon from '../../assets/mountain.svg';
import StationIcon from '../../assets/station.svg';
import OtherIcon from '../../assets/other.svg';

function AddItinerary({ planId, created }) {
    const [titleInput, setTitleInput] = useState("");
    const [noteInput, setNoteInput] = useState("");
    const [dateValue, setDateValue] = useState(new Date());
    const [iconPick, setIconPick] = useState(null);

    const createNewItinerary = (e) => {
        e.preventDefault();
        console.log("uploading new itinerary to firebase");
        const id = uuid();
        db.collection('plans').doc(planId).collection('itinerary').add({
            id: id,
            title: titleInput,
            dateTime: dateValue,
            icon: iconPick,
            note:noteInput
        })
        .catch((error) => { console.error("Error writing document: ", error) }); 
        created(false);
        setTitleInput("");
        setNoteInput("");
        setDateValue(null);
        setIconPick(null);
    }
    

    return (
        <div className="addItinerary">
            <h1>Add new itinerary</h1>
            <form className="addItinerary__form" 
                noValidate 
                onSubmit={createNewItinerary}>
                
                <TextField
                    className="addItinerary__formItem addItinerary__formTitle"
                    variant="outlined"
                    label="Title"
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                />

                <DateTimePicker
                    className="addItinerary__formItem addItinerary__formDate"
                    amPmAriaLabel="Select AM/PM"
                    hourAriaLabel="Hour"
                    maxDetail="minute"
                    minuteAriaLabel="Minute"
                    monthAriaLabel="Month"
                    nativeInputAriaLabel="Date and time"
                    calendarAriaLabel="Toggle calendar"
                    clearAriaLabel="Clear value"
                    dayAriaLabel="Day"
                    onChange={(value) => setDateValue(value)}
                    value={dateValue}
                    yearAriaLabel="Year"
                />
                <ToggleButtonGroup 
                    className="addItinerary__formItem addItinerary__formIcon"
                    value={iconPick} 
                    exclusive
                    size="small"
                    onChange={(e, icon) => setIconPick(icon)}   
                    aria-label="itineraryicon"
                >
                    <ToggleButton value="food" aria-label="food">
                        <img src={FoodIcon} alt="food" />
                    </ToggleButton>
                    <ToggleButton value="bedding" aria-label="bedding">
                        <img src={BeddingIcon} alt="bedding" />
                    </ToggleButton>
                    <ToggleButton value="shopping" aria-label="shopping">
                        <img src={ShoppingIcon} alt="shoppping" />
                    </ToggleButton>
                    <ToggleButton value="beach" aria-label="beach">
                        <img src={BeachIcon} alt="beach" />
                    </ToggleButton>
                    <ToggleButton value="mountain" aria-label="mountain">
                        <img src={MountainIcon} alt="mountain" />
                    </ToggleButton>
                    <ToggleButton value="station" aria-label="station">
                        <img src={StationIcon} alt="station" />
                    </ToggleButton>
                    <ToggleButton value="other" aria-label="other">
                        <img src={OtherIcon} alt="other" />
                    </ToggleButton>
                    
                </ToggleButtonGroup>
                
                <TextField 
                    className="addItinerary__formItem addItinerary__formNote"
                    variant="outlined"
                    label="Note"
                    multiline={true}
                    rowsMax={3}
                    rows={5}
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                />
                <button 
                    className="addItinerary__button"
                    type="submit"
                    onClick={createNewItinerary}>
                    Create Itinerary
                </button>
            </form>
        </div>
       
    )
}

export default AddItinerary;

/*
<div className="addItinerary">
<form>
    <input
        value={titleInput}
        onChange={(e) => setTitleInput(e.target.value)}
        maxLength={20}
    />
    
    <input 
        value={noteInput}
        onChange={(e) => setNoteInput(e.target.value)}
        maxLength={200}
    />
    

    <button 
        className="popup__button"
        type="submit"
        onClick={createNewItinerary}>
        Create Itinerary
    </button>
</form>
</div>
*/