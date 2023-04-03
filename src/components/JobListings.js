import React from "react";
import styles from "./JobCard.module.css"
import JobCard from "./JobCard";
import 'bootstrap/dist/css/bootstrap.min.css';

function JobListings({jobs, setCurrJob}){
    return(
        <>
            <div className="column">
                {jobs.map(job => <JobCard key={job.id} id={job.id} job={job} setCurrJob={setCurrJob}/>)}
            </div>
        </>
    );
}

export default JobListings;