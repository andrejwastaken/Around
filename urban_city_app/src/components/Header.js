import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Header({ loggedIn }) {
    return (
        <header>
            <nav className="navbar">
                <div className="navbar-container">
                    <ul className="number-list">
                        <li>
                            <span className="label">European Emergency Number: </span>
                            <span className="number">112</span>
                        </li>
                        <li>
                            <span className="label">Police: </span>
                            <span className="number">192</span>
                        </li>
                        <li>
                            <span className="label">Fire Brigade: </span>
                            <span className="number">193</span>
                        </li>
                        <li>
                            <span className="label">Ambulance: </span>
                            <span className="number">194</span>
                        </li>
                    </ul>
                    <ul className="navbar-menu">
                        <li className="navbar-btn">
                            {loggedIn ? (
                                <Link to= "/dashboard" className="button">Dashboard</Link>
                            ) : (
                                <Link to="/login" className="button">Log in/Register</Link>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;
