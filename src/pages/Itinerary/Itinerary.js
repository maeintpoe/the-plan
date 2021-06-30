import React, { useEffect, useState } from 'react';
import './Itinerary.css';
import { useSelector } from 'react-redux';
import { selectPlanId, selectPlanName } from '../../features/appSlice';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import "react-vertical-timeline-component/style.min.css";
import { db } from '../../firebase/firebase';
import AddItinerary from './AddItinerary';
import { Modal } from '@material-ui/core';


// Icons
import AddIcon from '@material-ui/icons/Add';
import { ReactComponent as FoodIcon } from "../../assets/food.svg";
import { ReactComponent as BeddingIcon } from "../../assets/bedding.svg";
import { ReactComponent as ShoppingIcon } from '../../assets/shopping.svg';
import { ReactComponent as BeachIcon } from '../../assets/beach.svg';
import { ReactComponent as MountainIcon } from '../../assets/mountain.svg';
import { ReactComponent as StationIcon } from '../../assets/station.svg';
import { ReactComponent as OtherIcon } from '../../assets/other.svg';


function Itinerary() {
    const planId = useSelector(selectPlanId);
    const planName = useSelector(selectPlanName);
    const [itineraries, setItineraries] = useState(null);
    const [showAddItinerary, setShowAddItinerary] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    // Get plan's itinerary from db
    useEffect(() => {
        if(planId) {
            db.collection('plans').doc(planId)
            .collection("itinerary")
            .orderBy("dateTime")
            .onSnapshot((snapshot) =>
                setItineraries(snapshot.docs.map((doc) => 
                doc.data())
                )
            )
        }

    }, [planId]);


    return (
        <div className="itinerary">
            <div className="itinerary__header">
            {showAddItinerary ? (
                    <AddIcon 
                        className="itinerary__Addicon"
                        onClick={() => {setShowAddItinerary(false); setOpenModal(true)}}
                        fontSize="large"
                    />) : (   
                    <Modal 
                        className="itinerary__modal"
                        open={openModal}
                        onClose={() => {setShowAddItinerary(true); setOpenModal(false)}}
                    >
                        <AddItinerary 
                            created={(status) => {setOpenModal(status); setShowAddItinerary(true)}}
                            planId={planId} />
                    </Modal>    
                    )
                }
            </div>

      {/* <CloseIcon 
            className="sidebar__icon"
            onClick={() => setShowAddItinerary(true)}
            fontSize="large"/> */}


            <VerticalTimeline className="itinerary__timeline" >
                {itineraries ? (
                    <div>
                    {itineraries.map((itinerary) => {
                        
                        const selectedIcon = (icon) => {
                            switch (icon) {
                                case "food":
                                    return <FoodIcon />
                                case "bedding":
                                    return <BeddingIcon />
                                case "shopping":
                                    return <ShoppingIcon />
                                case "station":
                                    return <StationIcon />
                                case "beach" :
                                    return <BeachIcon />
                                case "mountain":
                                    return <MountainIcon />
                                default:
                                    return <OtherIcon />
                            }
                        }

                        const contentStyle = (icon) => {
                            switch (icon) {
                                case "food":
                                    return  { background: "#EFDDB7" }
                                case "bedding":
                                    return  { background: "#EFDDB7" }
                                case "shopping":
                                    return  { background: "#9DD9E3" }
                                case "station":
                                    return  { background: "#9DD9E3" }
                                case "beach" :
                                    return  { background: "#9DD9E3" }
                                case "mountain":
                                    return  { background: "#9AB4A9" }
                                default:
                                    return  { background: "#06D6A0" }
                            }
                        }
                     
                        return (
                            <VerticalTimelineElement 
                                className="itinerary__element"
                                key={itinerary.id} 
                                icon={selectedIcon(itinerary.icon)}
                                date={new Intl.DateTimeFormat('en-US', 
                                    {year: 'numeric', month: '2-digit', day: '2-digit', 
                                     hour: '2-digit', minute: '2-digit'})
                                     .format(new Date(itinerary.dateTime?.toDate()))}
                                contentStyle={contentStyle(itinerary.icon)}
                                contentArrowStyle={ {backgroundColor: "red"} }
                                >
                                    <h2>{itinerary.title}</h2>
                                    <p>{itinerary.note}</p>
                            </VerticalTimelineElement>
                            )
                        })
                    }
                    </div>
                ) : (
                    <p>No itineraries added</p>
                )}
                
            </VerticalTimeline>

        </div>
    )
}

export default Itinerary;
