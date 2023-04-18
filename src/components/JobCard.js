import React, { useState, useEffect } from "react";
import styles from "./JobCard.module.css"
import moment from "moment";

function JobCard({ job, setCurrJob, setJobCardModal, data}){
    const [companyImage, setCompanyImage] = useState(null);
    function handleclick(e){
        setCurrJob(job)
        setJobCardModal(true)
        // console.log(job)
    }


  useEffect(() => {
    // Search for company image using Pexels API
    const apiKey = data.REACT_APP_PEXEL
    const query = job.title;
    const url = `https://api.pexels.com/v1/search?query=${query}&per_page=1`;
    fetch(url, {
      headers: {
        Authorization: apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.photos.length > 0) {
          setCompanyImage(data.photos[0].src.medium);
        }
      })
      .catch((error) => {
        console.log("Error searching for company image:", error);
      });
  }, [job.company.display_name]);


    return(
        <div className="col-sm-2" id={styles.card} onClick={handleclick}>
            <div >
                <h1 className={styles.title}>{job.title}</h1>
                <h3 className={styles.title}>{job.company.display_name}</h3>
                <p>{job.location.display_name} | {moment(job.created).utc().format('MM/DD/YYYY')}</p>
                <p>Salary: Estimated ${job.salary_min} to ${job.salary_max}</p>
                {companyImage && (
          <img
            src={companyImage}
            alt={job.company.display_name}
            className={styles.companyImage}
          />
        )}
            </div>
        </div>
    );
}

export default JobCard;
