import React from "react";
import styles from "./JobCard.module.css"
import JobCard from "./JobCard";
import 'bootstrap/dist/css/bootstrap.min.css';

function JobListings({jobs, setCurrJob, currJob, onPageChange, page}){
    return(
        <>
            <div className={currJob ? "column": "row"}>
                {jobs.map(job => <JobCard key={job.id} id={job.id} job={job} setCurrJob={setCurrJob}/>)}
            </div>
            <div className="d-flex justify-content-center">
                <button className="btn btn-primary me-2" onClick={() => onPageChange('prev')} disabled={page === 1}>Previous</button>
                <div className={styles.pageNumber}>{page}</div>
                <button className="btn btn-primary" onClick={() => onPageChange('next')}>Next</button>
            </div>
        </>
    );
}

export default JobListings;