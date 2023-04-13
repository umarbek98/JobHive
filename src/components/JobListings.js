import React from "react";
import styles from "./JobCard.module.css"
import JobCard from "./JobCard";
import 'bootstrap/dist/css/bootstrap.min.css';

function JobListings({jobs, setCurrJob, currJob, onPageChange, page, setJobCardModal}){
    return(
        <>
            <div className="row" style={{marginTop: '60px', marginLeft: '20px'}}>

                {jobs.slice(0,9).map(job => <JobCard 
                key={job.id} 
                id={job.id} 
                job={job} 
                setCurrJob={setCurrJob}
                setJobCardModal={setJobCardModal}
                />)}

            </div>
            <div className="pagination-container fixed-bottom d-flex justify-content-center align-items-center">
                <button className="btn btn-primary me-2" onClick={() => onPageChange('prev')} disabled={page === 1}>Previous</button>
                <div className={styles.pageNumber}>{page}</div>
                <button className="btn btn-primary ms-2" onClick={() => onPageChange('next')}>Next</button>
            </div>
        </>
    );
}

export default JobListings;