import { useState, useEffect } from "react";
import { auth, db, savedJobsCollection, addDoc } from "../firebase";

function SaveButton({ job, isSaved, setSaved }) {
  // const [isSaved, setIsSaved] = useState(false);


  const handleClick = () => {
    if (!isSaved) {
      handleSaveJob()
    }
  }

  const handleSaveJob = async () => {
    if (!auth.currentUser) {
      alert("Please sign in first.");
      return;
    }

    try {
      const docRef = await addDoc(savedJobsCollection, {
        userId: auth.currentUser.uid,
        title: job.title,
        url: job.redirect_url,
        description: job.description,
        location: job.location.display_name,
        company: job.company.display_name,
        created: job.created,
        sal_min: job.salary_min,
        sal_max: job.salary_max,
        job_id: job.id

      });
      setSaved(true);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };


  return (
    <button className="btn btn-success btn-lg active" style={{ marginLeft: '10px' }} onClick={handleClick} disabled={isSaved}>
      {isSaved ? "Saved!" : "Save Job"}
    </button>
  );
}

export default SaveButton;
