import React from "react";
import styles from "./JobCard.module.css"
import moment from "moment";

function JobCard({ job, setCurrJob, setJobCardModal}){
    function handleclick(e){
        setCurrJob(job)
        setJobCardModal(true)
        // console.log(job)
    }
    return(
        <div className="col-sm-2" id={styles.card} onClick={handleclick}>
            <div >
                <h1 className={styles.title}>{job.title}</h1>
                <h3 className={styles.title}>{job.company.display_name}</h3>
                <p>{job.location.display_name} | {moment(job.created).utc().format('MM/DD/YYYY')}</p>
                <p>Salary: Estimated ${job.salary_min} to ${job.salary_max}</p>
            </div>
        </div>
    );
}

export default JobCard;
