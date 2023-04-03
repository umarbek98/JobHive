import React, { useEffect } from "react";
import styles from "./CardInfo.module.css"
import moment from "moment";

function CardInfo({ job }){

    
    useEffect(() =>{
        const yelp_api = 'nr9RggSEc5oAJy2gWCKPo1Ca_eY2KPGBc7dK7G4LkAuUDmUI9ugK3l_EjW7724rrT8lHsw_t1wtxiPSEPHT2qpkS9jfb6U-cefLhKgJY1-Xqhd7ZLygmn6XaXSErZHYx'
        fetch(`https://api.yelp.com/v3/businesses/search?term=${job.company.display_name}&location=${job.location.display_name}`, {
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
        </div>
    )
}

export default CardInfo;

