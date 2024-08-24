import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  // Replace with your actual API key from OpenWeatherMap
  const apiKey = 'YOUR_API_KEY';

  const fetchWeather = async (e) => {
    e.preventDefault();

    if (!location) {
      setError('Please enter a location');
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
      setError(''); // Clear any previous errors
    } catch (err) {
      setWeatherData(null);
      setError('Unable to fetch weather for this location');
    }
  };

  return (
    <div className="App" style={styles.app}>
      <h1 style={styles.header}>Weather App</h1>
      <form onSubmit={fetchWeather} style={styles.form}>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Get Weather</button>
      </form>

      {error && <p style={styles.error}>{error}</p>}

      {weatherData && (
        <div style={styles.weatherDisplay}>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  app: { textAlign: 'center', marginTop: '50px' },
  header: { fontSize: '2rem', marginBottom: '20px' },
  form: { display: 'inline-flex', gap: '10px' },
  input: { padding: '10px', fontSize: '16px' },
  button: { padding: '10px 20px', fontSize: '16px', cursor: 'pointer' },
  weatherDisplay: { marginTop: '20px', fontSize: '18px' },
  error: { color: 'red', marginTop: '10px' },
};

export default App;
