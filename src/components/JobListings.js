import React, { useContext } from "react";
import styles from "./JobCard.module.css";
import JobCard from "./JobCard";
import "bootstrap/dist/css/bootstrap.min.css";
import AppContext from "./AppContext";

function JobListings({ onPageChange, data }) {
  const { jobs, setCurrJob, page, setJobCardModal } = useContext(AppContext);

  function handlePageChange(direction) {
    onPageChange(direction);
  }

  return (
    <>
      <div className="row" style={{ marginTop: "60px", marginLeft: "20px" }}>
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            id={job.id}
            job={job}
            setCurrJob={setCurrJob}
            setJobCardModal={setJobCardModal}
            data={data}
          />
        ))}
      </div>
      <div className={styles.paginationContainer}>
        <div className="d-flex justify-content-center">
          <nav aria-label="...">
            <ul className="pagination">
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <a
                  className="page-link"
                  href="#"
                  onClick={() => handlePageChange("prev")}
                >
                  Previous
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  {page} <span className="sr-only"></span>
                </a>
              </li>
              <li className="page-item">
                <a
                  className="page-link"
                  href="#"
                  onClick={() => handlePageChange("next")}
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default JobListings;
