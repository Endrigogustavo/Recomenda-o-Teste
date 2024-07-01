import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [jobTitle, setJobTitle] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/recommend', { job_title: jobTitle });
      //const response = await axios.post('http://localhost:5000/recommend', { job_id: parseInt(jobId) });
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Job Recommendation System</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Job Title:
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </label>
          <button type="submit">Get Recommendations</button>
        </form>
        <div>
          <h2>Recommendations:</h2>
          <ul>
            {recommendations.map((rec) => (
              <li key={rec.id}>
                <h3>{rec.title}</h3>
                <p>{rec.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
