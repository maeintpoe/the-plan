import React, { useState, useEffect } from 'react';
import './DateCountdown.css';
import Countdown from 'react-countdown';
import DatePicker from 'react-date-picker';
import { db } from '../../firebase/firebase';

// Icons
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';


function DateCountdown({ planId }) {
    const [showPicker, setShowPicker] = useState(false);
    // const [planDate, setPlanDate] = useState(null);
    const [pickerValue, setPickerValue] = useState(null);
    const [showCountdown, setShowCountdown] = useState(false);

    // useEffect(() => {
    //     db.collection('plans').doc(planId)
    //     .get().then((doc) => {
    //         if(doc.exists){
    //             setPlanDate(doc.data().planDate);
    //             setPickerValue(doc.data().planDate);
    //             console.log("planDate: ", planDate, "   pickerValue: ", pickerValue);
    //             if(pickerValue) {
    //                 setShowCountdown(true);
    //             }
    //         }
    //         }
    //     )
    // }, []);

    const updateDate = (e) => {
        e.preventDefault();
        //store to data
        setShowCountdown(true);
        setShowPicker(false);
        console.log("date changed to: ", pickerValue);
        db.collection('plans')
        .doc(planId).set({
            planDate: pickerValue,
        }, { merge: true })
    }

    const renderer = ( { days, hours, completed } ) => {
        // console.log("days: ", days, "hours: ", hours, "completed: ", completed);
        if (completed) {
            return <h1>It's D-Day!! </h1>
        } else {
            if(!days) {
                return <span className="countdown__timerSpan">
                    Only {hours}
                    {hours > 1 ? (<p>hours</p>) : (<p>hour</p>)} 
                    left!</span>
            } else {
                return <span className="countdown__timerSpan">{days} {" "} {days > 1 ? (<p>days </p>) : (<p>day </p>)} left!</span>
            }
            
        }
    }
 
    return (
        <div className="countdown">
            {showCountdown ? ( 
                <Countdown 
                className="countdown__timer"
                date={pickerValue}
                renderer={renderer} />  ) : ( 
                <h2> Select date </h2>
            )}
            

            {showPicker ? ( 
                <div className="countdown__picker">
                {/* <DateTimePicker
                calendarAriaLabel="Toggle calendar"
                clearAriaLabel="Clear value"
                dayAriaLabel="Day"
                monthAriaLabel="Month"
                nativeInputAriaLabel="Date"
                onChange={}
                value={pickerValue}
                yearAriaLabel="Year"
                /> */}

                <DatePicker
                calendarAriaLabel="Toggle calendar"
                clearAriaLabel="Clear value"
                dayAriaLabel="Day"
                monthAriaLabel="Month"
                nativeInputAriaLabel="Date"
                onChange={(value) => setPickerValue(value)}
                value={pickerValue}
                yearAriaLabel="Year"
                />
                <DoneIcon onClick={updateDate} />
                </div>
            ) : (
                <EditIcon 
                className="countdown__edit"
                onClick={() => setShowPicker(true)}
                fontSize="small"/>
            )}
        </div>
    )
}

export default DateCountdown;
