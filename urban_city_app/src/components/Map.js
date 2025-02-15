import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MarkerClusterGroup from "react-leaflet-cluster";
import '../App.css';
import { firestore, auth } from "../firebase";
import firebase from 'firebase/compat/app';
import SavedSpots from "./SavedSpots";

const touristLocations = [
    { lat: 42.00731524440518, lng: 21.4171703713854951, name: 'City Zoo', link: 'https://mk.wikipedia.org/wiki/%D0%97%D0%BE%D0%BE%D0%BB%D0%BE%D1%88%D0%BA%D0%B0_%D0%B3%D1%80%D0%B0%D0%B4%D0%B8%D0%BD%D0%B0_%D0%A1%D0%BA%D0%BE%D0%BF%D1%98%D0%B5' },
    { lat: 41.95911055959176, lng: 21.295517535397214, name: 'Matka', link: 'https://mk.wikipedia.org/wiki/%D0%9C%D0%B0%D1%82%D0%BA%D0%B0_(%D0%BA%D0%B0%D1%9A%D0%BE%D0%BD)' },
    { lat: 41.96809794425433, lng: 21.40207710668113, name: 'Mt. Vodno', link: 'https://mk.wikipedia.org/wiki/%D0%92%D0%BE%D0%B4%D0%BD%D0%BE' },
    { lat: 42.010189025256516, lng: 21.417240499845164, name: 'City Park', link: 'https://mk.wikipedia.org/wiki/%D0%93%D1%80%D0%B0%D0%B4%D1%81%D0%BA%D0%B8_%D0%BF%D0%B0%D1%80%D0%BA_(%D0%A1%D0%BA%D0%BE%D0%BF%D1%98%D0%B5)'  },
    { lat: 41.994766443556, lng: 21.432348788047005, name: 'Triumph Arc', link: 'https://mk.wikipedia.org/wiki/%D0%9F%D0%BE%D1%80%D1%82%D0%B0_%D0%9C%D0%B0%D0%BA%D0%B5%D0%B4%D0%BE%D0%BD%D0%B8%D1%98%D0%B0'  },
    { lat: 41.997233866934735, lng: 21.432854011058843, name: 'Stone Bridge', link: 'https://mk.wikipedia.org/wiki/%D0%9A%D0%B0%D0%BC%D0%B5%D0%BD_%D0%BC%D0%BE%D1%81%D1%82_(%D0%A1%D0%BA%D0%BE%D0%BF%D1%98%D0%B5)'  },
    { lat: 41.996348823883075, lng: 21.4317172592457, name: 'Macedonia Square', link: 'https://mk.wikipedia.org/wiki/%D0%9F%D0%BB%D0%BE%D1%88%D1%82%D0%B0%D0%B4_%D0%9C%D0%B0%D0%BA%D0%B5%D0%B4%D0%BE%D0%BD%D0%B8%D1%98%D0%B0'  },
    { lat: 42.00161962376448, lng: 21.43836792863539, name: 'Old Bazaar - Carsija', link: 'https://mk.wikipedia.org/wiki/%D0%A1%D1%82%D0%B0%D1%80%D0%B0_%D1%81%D0%BA%D0%BE%D0%BF%D1%81%D0%BA%D0%B0_%D1%87%D0%B0%D1%80%D1%88%D0%B8%D1%98%D0%B0'  },
    { lat: 42.0015370468299, lng: 21.43375707723018, name: 'Skopje Fortress - Kale', link: 'https://mk.wikipedia.org/wiki/%D0%A1%D0%BA%D0%BE%D0%BF%D1%81%D0%BA%D0%BE_%D0%9A%D0%B0%D0%BB%D0%B5'  },
    { lat: 42.02302045452052, lng: 21.42112902982041, name: 'Skopje Aqueduct', link: 'https://mk.wikipedia.org/wiki/%D0%A1%D0%BA%D0%BE%D0%BF%D1%81%D0%BA%D0%B8_%D0%B0%D0%BA%D0%B2%D0%B0%D0%B4%D1%83%D0%BA%D1%82'  }
];

const nightlifeLocations = [
    { lat: 42.00638982780656, lng: 21.406614578604074, name: 'Minus One (Minus Eden)', socialMediaLink: 'https://www.instagram.com/club_minuseden/' },
    { lat: 42.007040085445944, lng: 21.42056241601531, name: 'Pure', socialMediaLink: 'https://www.instagram.com/club.pure.skopje/' },
    { lat: 42.007566248232294, lng: 21.42225757211816, name: 'Havana', socialMediaLink: 'https://www.instagram.com/havana.summer.club/' },
    { lat: 42.00648202921153, lng: 21.42384543980479, name: 'Marakana', socialMediaLink: 'https://www.instagram.com/clubmarakana/' },
    { lat: 42.008031113198825, lng: 21.423224272690963, name: 'Privilege', socialMediaLink: 'https://www.instagram.com/club_centralpark_official/' },
    { lat: 41.994101079905654, lng: 21.42492823420446, name: 'Saloon', socialMediaLink: 'https://www.instagram.com/nightclubsaloon/' },
    { lat: 41.996206164751555, lng: 21.42681653771717, name: 'Epicenter', socialMediaLink: 'https://www.instagram.com/club_epicentar/' },
    { lat: 41.99214388335274, lng: 21.44770009135166, name: 'House of Legends', socialMediaLink: 'https://www.instagram.com/hol_club/' },
    { lat: 41.991073744399436, lng: 21.425535141918967, name: 'Stanica 26', socialMediaLink: 'https://www.instagram.com/stanica26/' }
];

const servicesLocations = [
    { lat: 41.99276625913203, lng: 21.44888443325037, name: 'Post', phoneNumber: '+ 389 (0) 2/3105-105' },
    { lat: 41.99277976656208, lng: 21.434793502245462, name: 'City hospital', phoneNumber: '+389 (0) 2/3235-000' },
    { lat: 41.98907034985788, lng: 21.436495790134575, name: 'Public Revenue Office', phoneNumber: '+389 (0) 2/3163-411' },
    { lat: 41.992895787985454, lng: 21.43325755940939, name: 'Parliament building', phoneNumber: '+389 (0) 2/3112-255' },
    { lat: 42.00452946974185, lng: 21.421638184130025, name: 'Administration building of the City', phoneNumber: '+389 (0) 2/3297-255' },
    { lat: 42.0005151207828, lng: 21.42865163652782, name: 'Government building', phoneNumber: '+389 (0) 2/3118-022' },
    { lat: 41.990688395083986, lng: 21.445473855190006, name: 'Central train station', phoneNumber: '+389 (0) 2/3164-255' },
    { lat: 41.99109142255905, lng: 21.445595063863863, name: 'Intercity bus station', phoneNumber: '+389 (0) 2/2466-313' },
    { lat: 41.96123128604962, lng: 21.627223969013112, name: 'Airport', phoneNumber: '+389 (0) 2/3148-333' },
];

const customIcon = L.icon({
    iconUrl: require("../assets/images/mkd.png"),
    iconSize: [28, 28],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

const createCustomClusterIcon = (cluster) => {
    return L.divIcon({
        html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
        className: 'marker-cluster',
        iconSize: L.point(40, 40, true),
    });
};

function App() {
    const [mode, setMode] = useState('tourist');
    const [savedSpots, setSavedSpots] = useState([]);

    const saveSpot = async (location) => {
        const user = auth.currentUser;
        if (!user) {
            alert('You must be logged in to save a spot.');
            return;
        }

        const userId = user.uid;
        const userDocRef = firestore.collection('savedSpots').doc(userId);
        const spotToSave = { ...location, type: mode };

        const isAlreadySaved = savedSpots.some(
            (spot) => spot.name === location.name
        );

        if (isAlreadySaved) {
            alert('This spot is already saved.');
            return;
        }

        try {
            await userDocRef.set(
                {
                    spots: firebase.firestore.FieldValue.arrayUnion(spotToSave),
                },
                { merge: true }
            );
            alert('Spot saved successfully!');
            fetchSavedSpots();
        } catch (error) {
            console.error('Error saving spot:', error);
            alert('Error saving spot.');
        }
    };

    const fetchSavedSpots = async () => {
        const user = auth.currentUser;
        if (!user) return;

        const userId = user.uid;
        const userDocRef = firestore.collection('savedSpots').doc(userId);

        try {
            const doc = await userDocRef.get();
            if (doc.exists) {
                const data = doc.data();
                setSavedSpots(data.spots || []);
            } else {
                setSavedSpots([]);
            }
        } catch (error) {
            console.error('Error fetching saved spots:', error);
        }
    };

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            fetchSavedSpots();
        }
    }, []);
    const handleModeChange = (event) => {
        setMode(event.target.value);
    };

    const removeSpot = async (spotToRemove) => {
        const user = auth.currentUser;
        if (!user) {
            alert('You must be logged in to remove a spot.');
            return;
        }

        const userId = user.uid;
        const userDocRef = firestore.collection('savedSpots').doc(userId);

        try {
            await userDocRef.update({
                spots: firebase.firestore.FieldValue.arrayRemove(spotToRemove),
            });
            alert('Spot removed successfully!');
            fetchSavedSpots();
        } catch (error) {
            console.error('Error removing spot:', error);
            alert('Error removing spot.');
        }
    };

    return (
        <div className="App">
            <select className="dropdown" onChange={handleModeChange} value={mode}>
                <option value="tourist">Tourist Mode</option>
                <option value="nightlife">Nightlife Mode</option>
                <option value="services">Services Mode</option>
            </select>

            <MapContainer className="map-container" center={[41.9981, 21.4254]} zoom={13} scrollWheelZoom={true}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <MarkerClusterGroup
                    chunkedLoadingEnabled={true}
                    iconCreateFunction={createCustomClusterIcon}
                >
                    {mode === 'tourist' && touristLocations.map((location, index) => (
                        <Marker
                            key={index}
                            position={[location.lat, location.lng]}
                            icon={customIcon}
                        >
                            <Popup className="custom-popup">
                                <div className="popup-content">
                                    <h3 className="popup-title">{location.name}</h3>
                                    <button className="popup-save-button" onClick={() => saveSpot(location)}>Save</button>
                                </div>
                            </Popup>
                        </Marker>
                    ))}

                    {mode === 'nightlife' && nightlifeLocations.map((location, index) => (
                        <Marker
                            key={index}
                            position={[location.lat, location.lng]}
                            icon={customIcon}
                        >
                            <Popup className="custom-popup">
                                <div className="popup-content">
                                    <h3 className="popup-title">{location.name}</h3>
                                    <button className="popup-save-button" onClick={() => saveSpot(location)}>Save</button>
                                </div>
                            </Popup>
                        </Marker>
                    ))}

                    {mode === 'services' && servicesLocations.map((location, index) => (
                        <Marker
                            key={index}
                            position={[location.lat, location.lng]}
                            icon={customIcon}
                        >
                            <Popup className="custom-popup">
                                <div className="popup-content">
                                    <h3 className="popup-title">{location.name}</h3>
                                    <button className="popup-save-button" onClick={() => saveSpot(location)}>Save</button>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MarkerClusterGroup>
            </MapContainer>

            <SavedSpots savedSpots={savedSpots} removeSpot={removeSpot} />
        </div>
    );
}

export default App;
