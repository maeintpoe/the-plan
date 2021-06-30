import React, { useState, useEffect } from 'react';
import './VisionBoard.css';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectPlanId, selectPlanName } from '../../features/appSlice';
import { storage, db } from '../../firebase/firebase';
import { v4 as uuid } from 'uuid';
import firebase from 'firebase';
import { CircularProgress, Grid, Card, CardMedia } from '@material-ui/core';

// Icons
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

function VisionBoard() {
    const planId = useSelector(selectPlanId);
    const planName = useSelector(selectPlanName);
    // const history = useHistory();
    const [imageClicked, setImageClicked] = useState(false);
    const [images, setImages] = useState(null);
    const [file, setFile] = useState(null);

    // console.log("history.location.pathname: ", history.location.pathname);
    
    // Display stored images
    useEffect(() => {
        if(planId) {
            db.collection('plans')
            .doc(planId)
            .collection("images")
            .orderBy("timestamp")
            .onSnapshot((snapshot) =>
                setImages(snapshot.docs.map((doc) => 
                    doc.data())
                )
            )
        }
    }, [planId]);


    const selectImage = () => {
        setImageClicked(true);
        setFile(null);
    }

    const uploadImage = (e) => {
        setImageClicked(false);
        e.preventDefault();

        if(file) {
            const imageId = uuid();
            const uploadTask = storage.ref(`${planId}/${imageId}`).put(file);

            uploadTask.on("state_change", null, (error) => {
                console.log(error);
                },
                // On complete function
                () => {
                    storage.ref(planId)
                    .child(imageId)
                    .getDownloadURL()
                    .then((url) => {
                        console.log("store to firestore too")
                        db.collection('plans')
                        .doc(planId)
                        .collection("images")
                        .add({
                            imageUrl: url,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        })
                        });
                    }
            );
        } 

    }

    return (
        <div className="visionBoard">
            <div className="visionBoard__addImage">
                {!imageClicked ? (
                    <AddPhotoAlternateIcon className="visionBoard__icon" onClick={selectImage}/>
                ) : (
                    <>
                    <form onSubmit={uploadImage}>
                        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                    </form>
                    <CloseIcon className="visionBoard__icon" onClick={() => setImageClicked(false)} />
                    <DoneIcon className="visionBoard__icon" onClick={uploadImage} />
                    </>
                )}
            </div>

            <div className="visionBoard__gallery">
                
                {images === null ? (
                    <CircularProgress className="visinBoard__icon"/>
                 ) : (
                     <Grid container  
                    //  className="visionBoard__gallery"
                     direction="row"
                     justify="space-evenly"
                     alignItems="center"> 
                     {images.map((image) => (
                        <Card className="visionBoard__card" key={image.imageUrl} > 
                            <CardMedia className="visionBoard__cardImage" 
                            style={{height: "200px", width: "200px",}}
                            image={image.imageUrl} alt="image"/>  
                        </Card>
                     ))}
                     </Grid>
                 ) }
            </div>
        </div>
    )
}

export default VisionBoard;
