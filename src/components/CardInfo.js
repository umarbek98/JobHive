import React, { useEffect, useState } from "react";
import styles from "./CardInfo.module.css";
import moment from "moment";
import { savedJobsCollection } from "../firebase";
import SaveButton from "./SaveButton";

function CardInfo({ job, data }) {
  const [saved, setSaved] = useState(false);

  const job_contract = job.contract_time;
  let contract_time;
  if (job_contract === "full_time") {
    contract_time = "Full Time";
  } else if (job_contract === "part_time") {
    contract_time = "Part Time";
  } else {
    contract_time = null;
  }

  const handleSave = () => {
    savedJobsCollection
      .add({
        job: job,
        created_at: new Date(),
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        setSaved(true);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <div className={styles.cardInfo}>
      <SaveButton onClick={handleSave} job={job} saved={saved} />
      <h1 className={styles.title}>{job.title}</h1>
      <h3 className={styles.title}>{job.company.display_name}</h3>
      <p className={styles.info}>
        {job.location.display_name} |{" "}
        {moment(job.created).utc().format("MM/DD/YYYY")}
      </p>
      <p className={styles.info}>
        Salary: from ${job.salary_min} to ${job.salary_max}
      </p>
      <p className={styles.info}>{contract_time}</p>
      <h1 className={styles.title}>Short Description</h1>
      <p className={styles.description}>{job.description}</p>
      <div style={{ textAlign: "center" }}>
        <a
          href={job.redirect_url}
          className="btn btn-primary btn-lg active"
          role="button"
          aria-pressed="true"
        >
          More Details
        </a>
        <br />
      </div>
      <br></br>
      <p className={styles.info}>
        For some useful tips please head over to Tips section of our page, to
        help get a better idea of what you should do for applying
      </p>
    </div>
  );
}

export default CardInfo;
