import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import JobListings from './components/JobListings';
import NavBar from './components/NavBar';
import CardInfo from './components/CardInfo';
import data from "./env.js"
import Tips from './components/Tips';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [what, setWhat] = useState('Developer');
  const [where, setWhere] = useState('Denver');
  const [currJob, setCurrJob] = useState(jobs[Math.floor(Math.random() * jobs.length)]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const appId = data.REACT_APP_APPID 
    const appKey = data.REACT_APP_APPKEY;
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
  }, [what, where, page]);

  function handlePageChange(direction){
    if (direction === 'next') {
      setPage(prevV => prevV + 1)
    } else if (direction === 'prev') {
      setPage(prevV => prevV - 1)
    }
  }


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <BrowserRouter>
     <div>
       <NavBar what={what} setCurrJob={setCurrJob} setWhat={setWhat} where={where} setWhere={setWhere}/>
       <Routes>

         <Route exact path="/" element={<JobListings
          jobs={jobs}
          currJob={currJob} 
          setCurrJob={setCurrJob} 
          onPageChange={handlePageChange}
          page={page}
          />}/>

         <Route path="/tips" element={<Tips />}/>
       </Routes>
       {currJob ? <CardInfo data={data} job={currJob}/> : null}
     </div>
   </BrowserRouter>
  );
}

export default App;

