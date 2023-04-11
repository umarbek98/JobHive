import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function SavedJobs({ currentUser }) {
  const [savedJobs, setSavedJobs] = useState([]);

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
    <div>
      <h2>Saved Jobs</h2>
      <ul>
        {savedJobs.map((job) => (
          <li key={job.id}>
            <a href={job.url} target="_blank" rel="noopener noreferrer">
              {job.title} @ {job.company}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SavedJobs;
