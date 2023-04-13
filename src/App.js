import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import JobListings from './components/JobListings';
import NavBar from './components/NavBar';
import CardInfo from './components/CardInfo';
import data from "./env.js"
import Tips from './components/Tips';
import SavedJobs from './components/SavedJobs';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged} from "firebase/auth";
import { auth } from "./firebase";



function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [what, setWhat] = useState('Developer');
  const [where, setWhere] = useState('Denver');
  const [currJob, setCurrJob] = useState(jobs[Math.floor(Math.random() * jobs.length)]);
  const [page, setPage] = useState(1);
  const [authUser, setAuthUser] = useState(null)
  const [jobCardModal, setJobCardModal] = useState(false)

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


  useEffect(() => {
    const linsten = onAuthStateChanged(auth, (user) => {
        if (user) {
            setAuthUser(user)
        } else {
            setAuthUser(null)
        }
    } )
    
    return () => {
        linsten();

    }
},[])

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
     <div style={{ overflowX: "hidden" }}>
       <NavBar 
       what={what} 
       setCurrJob={setCurrJob} 
       setWhat={setWhat} 
       where={where} 
       setWhere={setWhere}
       authUser={authUser}
       setAuthUser={setAuthUser}
       />
       <Routes>

         <Route exact path="/" element={<JobListings
          jobs={jobs}
          currJob={currJob} 
          setCurrJob={setCurrJob} 
          onPageChange={handlePageChange}
          page={page}
          setJobCardModal={setJobCardModal}
          />}/>

         <Route path="/tips" element={<Tips />}/>
         <Route path="/saved-jobs" element={<SavedJobs currentUser={authUser}/>}/>
       </Routes>
       {currJob ? <CardInfo 
       data={data} 
       job={currJob}
       setJobCardModal={setJobCardModal}
       show={jobCardModal}
       /> : null}
     </div>
   </BrowserRouter>
  );
}

export default App;

