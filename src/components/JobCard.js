import React from "react";
import styles from "./JobCard.module.css";
import moment from "moment";

function JobCard({ job, setCurrJob, setJobCardModal, data }) {
  function handleclick(e) {
    setCurrJob(job);
    setJobCardModal(true);
  }

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
      return `Estimated salary: ${formatCurrency(min)}`;
    } else {
      return `Estimated salary from ${formatCurrency(min)} to ${formatCurrency(
        max
      )}`;
    }
  }

  const { title, company, created, salary_min, salary_max, location } = job;
  return (
    <div className="col-sm-2" id={styles.card} onClick={handleclick}>
      <div>
        <h1 className={styles.title}>{title}</h1>
        <h3 className={styles.title}>{company.display_name}</h3>
        <p>
          {location.display_name} | {moment(created).utc().format("MM/DD/YYYY")}
        </p>
        {salary_min ? salary(salary_min, salary_max) : `Salary undisclosed`}
      </div>
    </div>
  );
}

export default JobCard;
