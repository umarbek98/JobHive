import { useState } from "react";
import { auth, db, savedJobsCollection, addDoc } from "../firebase";

function SaveButton({ job }) {
  const [isSaved, setIsSaved] = useState(false);

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
        description: job.description

      });
      setIsSaved(true);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <button onClick={handleSaveJob} disabled={isSaved}>
      {isSaved ? "Saved!" : "Save Job"}
    </button>
  );
}

export default SaveButton;
