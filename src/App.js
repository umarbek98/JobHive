import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import JobListings from './components/JobListings';
import NavBar from './components/NavBar';
import CardInfo from './components/CardInfo';
import data from "./env.js"


function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [what, setWhat] = useState('');
  const [where, setWhere] = useState('');
  const [currJob, setCurrJob] = useState(jobs[Math.floor(Math.random() * jobs.length)]);

  useEffect(() => {
    const appId = data.REACT_APP_APPID 
    const appKey = data.REACT_APP_APPKEY;
    let page = 1
    const endpoint = `https://api.adzuna.com/v1/api/jobs/us/search/${page}?app_id=${appId}&app_key=${appKey}&what=${what}&where=${where}`;

    setLoading(true);

    fetch(endpoint)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setJobs(data.results);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [what, where]);


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <NavBar what={what} setWhat={setWhat} where={where} setWhere={setWhere}/>
      <JobListings jobs={jobs}  setCurrJob={setCurrJob}/>
      {currJob ? <CardInfo  job={currJob}/> : null}
    </div>
  );
}

export default App;

