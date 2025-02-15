import React from 'react';
import '../App.css';
import instagramLogo from '../assets/images/instagram.png';


function SavedSpots({ savedSpots, removeSpot }) {
    const groupedSpots = savedSpots.reduce((acc, spot) => {
        if (spot.type) {
            (acc[spot.type] = acc[spot.type] || []).push(spot);
        }
        return acc;
    }, {});

    return (
        <div className="saved-spots">
            <h2>Your Saved Spots:</h2>
            {Object.keys(groupedSpots).length === 0 ? (
                <p id="no-spots-message">No saved spots yet.</p>
            ) : (
                <div className="spot-columns">
                    {Object.entries(groupedSpots).map(([type, spots]) => (
                        <div key={type} className="spot-column">
                            <h3>{type.charAt(0).toUpperCase() + type.slice(1)} Spots</h3>
                            <ul className="spot-list">
                                {spots.map((spot, index) => (
                                    <li key={index} className="spot-item">
                                        <h4>{spot.name}</h4>

                                        {type === 'tourist' && spot.link && (
                                            <div className="tourist-website">
                                                <a href={spot.link} target="_blank" rel="noopener noreferrer">
                                                    Visit Wikipedia
                                                </a>
                                            </div>
                                        )}

                                        {type === 'nightlife' && (
                                            <div className="nightlife-social">
                                                <a href={spot.socialMediaLink} target="_blank" rel="noopener noreferrer">
                                                    <img
                                                        src={instagramLogo}
                                                        alt="Instagram Logo"
                                                        className="social-media-icon"
                                                    />
                                                </a>
                                            </div>
                                        )}

                                        {type === 'services' && spot.phoneNumber && (
                                            <p>Phone: <a href={`tel:${spot.phoneNumber}`}>{spot.phoneNumber}</a></p>
                                        )}

                                        <button onClick={() => removeSpot(spot)}>Remove</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SavedSpots;
