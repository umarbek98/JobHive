import { useState, useEffect, useContext } from "react";
import { db } from "../firebase";
import styles from "./SavedJobs.module.css";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { savedJobsCollection } from "../firebase";
import moment from "moment";
import { Modal, ModalBody } from "react-bootstrap";
import AppContext from "./AppContext";

function SavedJobs() {
  const { authUser } = useContext(AppContext);
  const [savedJobs, setSavedJobs] = useState([]);
  const [showJob, setShowJob] = useState(false);
  const [currJob, setCurrJob] = useState([]);

  function formatCurrency(str) {
    const formattedCurrency = str.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
    return formattedCurrency;
  }

  function salary(min, max) {
    if (min === max) {
      return `Estimated salary ${formatCurrency(min)}`;
    } else {
      return `Estimated salary from ${formatCurrency(min)} to ${formatCurrency(
        max
      )}`;
    }
  }

  function handleShowJob(job) {
    setCurrJob(job);
    setShowJob(true);
  }

  function handleCloseJob() {
    setShowJob(false);
  }

  function handleRemoveJob() {
    deleteDoc(doc(savedJobsCollection, currJob.id))
      .then(() => {
        console.log("Job removed from saved jobs");
        setSavedJobs(savedJobs.filter((job) => job.id !== currJob.id));
      })
      .catch((error) => {
        console.error("Error removing job from saved jobs: ", error);
      });
  }

  useEffect(() => {
    const fetchData = async () => {
      const jobsRef = collection(db, "saved-jobs");
      const q = query(jobsRef, where("userId", "==", authUser.uid));
      const querySnapshot = await getDocs(q);
      const savedJobsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSavedJobs(savedJobsList);
    };
    fetchData();
  }, [authUser]);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {savedJobs.map((job) => (
        <div key={job.id}>
          <div onClick={() => handleShowJob(job)} id={styles.card} key={job.id}>
            <h1 className={styles.title}>{job.title}</h1>
            <h3 className={styles.title}>{job.company}</h3>
            <p>
              {job.location} | {moment(job.created).utc().format("MM/DD/YYYY")}
            </p>
            {job.sal_min
              ? salary(job.sal_min, job.sal_max)
              : `Salary undisclosed`}
          </div>
        </div>
      ))}
      <Modal className="modal-lg" show={showJob} onHide={handleCloseJob}>
        <ModalBody>
          <div>
            <h1 className={styles.titleModal}>{currJob.title}</h1>
            <h3 className={styles.titleModal}>{currJob.company}</h3>
            <p className={styles.info}>
              {currJob.location} |{" "}
              {moment(currJob.created).utc().format("MM/DD/YYYY")}
            </p>
            <p className={styles.info}>
              {currJob.sal_min
                ? salary(currJob.sal_min, currJob.sal_max)
                : `Salary undisclosed`}
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
              <button
                className="btn ms-2 btn-primary btn-lg active"
                onClick={handleRemoveJob}
              >
                Remove
              </button>
              <br />
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default SavedJobs;
