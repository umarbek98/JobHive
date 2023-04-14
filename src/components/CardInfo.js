import React, { useContext, useEffect, useState } from "react";
import styles from "./CardInfo.module.css";
import moment from "moment";
import { savedJobsCollection, where, query, getDocs  } from "../firebase";
import SaveButton from "./SaveButton";
import { Modal } from "react-bootstrap";
import AppContext from "./AppContext";

function CardInfo() {
  const {currJob, jobCardModal, setJobCardModal} = useContext(AppContext)
  const [saved, setSaved] = useState(false);
  const job = currJob

  useEffect(() => {
    // Check if job is already saved
    const q = query(savedJobsCollection, where("job_id", "==", job.id))
    getDocs(q)
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          // Job is already saved
          setSaved(true);
        }else {
          setSaved(false)
        }

      })
      .catch((error) => {
        console.log('Error getting saved jobs:', error)
      })
  }, [job.id]);

  const job_contract = job.contract_time;
  let contract_time;
  if (job_contract === "full_time") {
    contract_time = "Full Time";
  } else if (job_contract === "part_time") {
    contract_time = "Part Time";
  } else {
    contract_time = null;
  }

  function handleCardHide(){
    setJobCardModal(false)
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
    <Modal  className="modal-xl" show={jobCardModal} onHide={handleCardHide}>
      <div className={styles.cardInfo}>
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
          <SaveButton onClick={handleSave} job={job} isSaved={saved} setSaved={setSaved} />
          <br />
        </div>
        <br></br>
        <p className={styles.info}>
          For some useful tips please head over to Tips section of our page, to
          help get a better idea of what you should do for applying
        </p>
      </div>
    </Modal>
  );
}

export default CardInfo;
