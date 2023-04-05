import React, { useEffect } from "react";
import styles from "./CardInfo.module.css"
import moment from "moment";

function CardInfo({ job, data }){

    
    useEffect(() =>{
        const yelp_api = data.REACT_APP_YELPAPI 
        fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${job.company.display_name}&location=${job.location.display_name}`, {
            headers: {
                'Authorization': `Bearer ${yelp_api}`
            }
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
        
    }, [])
    
    const job_contract = job.contract_time
    let contract_time;
    if (job_contract === "full_time"){
        contract_time = 'Full Time'
    } else if(job_contract === "part_time" ){
        contract_time = "Part Time"
    } else{
        contract_time = null
    }


    return(
            <div className={styles.cardInfo}>
                <h1 className={styles.title}>{job.title}</h1>
                <h3 className={styles.title}>{job.company.display_name}</h3>
                <p className={styles.info}>{job.location.display_name} | {moment(job.created).utc().format('MM/DD/YYYY')}</p>
                <p className={styles.info}> Salary: from ${job.salary_min} to ${job.salary_max}</p>
                <p className={styles.info}>{contract_time}</p>
                <h1 className={styles.title}>Short Description</h1>
                <p className={styles.description}>{job.description}</p>
                <div style={{textAlign: 'center'}}>
                <a href={job.redirect_url} class="btn btn-primary btn-lg active" role="button" aria-pressed="true">More Details</a>
                </div>
            </div>
    )
}

export default CardInfo;

