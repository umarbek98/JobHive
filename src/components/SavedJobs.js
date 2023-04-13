import { useState, useEffect } from "react";
import { db } from "../firebase";
import styles from "./SavedJobs.module.css"
import { collection, query, where, getDocs } from "firebase/firestore";
import moment from "moment";
import { Modal, ModalBody } from "react-bootstrap";


function SavedJobs({ currentUser }) {
  const [savedJobs, setSavedJobs] = useState([]);
  const [showJob, setShowJob] = useState(false);
  const [currJob, setCurrJob] = useState([])

  function handleShowJob(job){
    setCurrJob(job)
    setShowJob(true)
    console.log(currJob)
  }
  
  function handleCloseJob(){
    setShowJob(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      const jobsRef = collection(db, "saved-jobs");
      const q = query(jobsRef, where("userId", "==", currentUser.uid));
      console.log(currentUser)
      const querySnapshot = await getDocs(q);
      const savedJobsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSavedJobs(savedJobsList);
    };
    fetchData();
  }, [currentUser]);

  return (
    <div style={{display: 'flex', flexWrap: "wrap"}}>
        {savedJobs.map((job) => (
          <div >
            <div onClick={() => handleShowJob(job)} id={styles.card} key={job.id}>
                  <h1 className={styles.title}>{job.title}</h1>
                  <h3 className={styles.title}>{job.company}</h3>
                  <p>{job.location} | {moment(job.created).utc().format('MM/DD/YYYY')}</p>
                  <p>Salary: Estimated ${job.sal_min} to ${job.sal_max}</p>
            </div>
          </div>
        ))}
        <Modal className="modal-lg" show={showJob} onHide={handleCloseJob}>
          <ModalBody>
          <div >
            <h1 className={styles.titleModal}>{currJob.title}</h1>
            <h3 className={styles.titleModal}>{currJob.company}</h3>
            <p className={styles.info}>
              {currJob.location} |{" "}
              {moment(currJob.created).utc().format("MM/DD/YYYY")}
            </p>
            <p className={styles.info}>
              Salary: from ${currJob.sal_min} to ${currJob.sal_max}
            </p>
            <h1 className={styles.titleModal}>Short Description</h1>
            <p className={styles.description}>{currJob.description}</p>
            <div style={{ textAlign: "center" }}>
              <a
                href={currJob.url}
                className="btn btn-primary btn-lg active"
                role="button"
                aria-pressed="true"
              >
                More Details
              </a>
              <br />
            </div>
          </div>
          </ModalBody>
        </Modal>
    </div>
  );
}

export default SavedJobs;
