import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Alert, Container, Spinner } from "react-bootstrap";

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const city = "Skopje";
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
    const fetchWeather = async () => {
        setError("");
        setLoading(true);
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            setWeatherData(response.data);
        } catch (error) {
            setError("Could not fetch weather data. Please check the city name and your API key.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather();
        const interval = setInterval(fetchWeather, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Container className="mt-4">
            <Card className="text-center shadow-sm weather-card">
                <Card.Body>
                    <h2>Weather in {city}</h2>
                    {loading && <Spinner animation="border" variant="primary" />}
                    {error && <Alert variant="danger">{error}</Alert>}
                    {weatherData && (
                        <div>
                            <p className="temperature">Temperature: {weatherData.main.temp}°C</p>
                            <p>Weather: {weatherData.weather[0].description}</p>
                            <p>Humidity: {weatherData.main.humidity}%</p>
                            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                            <img
                                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                                alt="Weather Icon"
                                className="weather-icon"
                            />
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Weather;
