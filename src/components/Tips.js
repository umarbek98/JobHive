import React from "react";
import styles from "./Tips.module.css";

function Tips() {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <h3 className="text-center text-primary">
          Steps that you should take before applying for a Job
        </h3>
        <ul>
          <li>
            <b>Proofread Everything a Few Times</b>
          </li>
          <ul>
            Before submitting your resume, cover letter, or any other
            application materials, read it over a few times, then a few more
            times. Beyond looking for common typos and spelling errors, ask
            yourself, does everything make sense? Are there too many buzzwords
            and not enough keywords? Then, ask someone you trust to read it
            over. Ask them how it reads and if there are any improvements you
            could make.
          </ul>
          <br></br>
          <li>
            <b>Tailor Your Resume and Cover Letter</b>
          </li>
          <ul>
            Your resume might be perfect, but not necessarily perfect for this
            job. A resume with nice formatting and no typos will only get you so
            far. If you’re missing relevant experience or lack some crucial
            keywords from the job posting, your application might not make it
            through the company’s applicant tracking system.
            <h6>
              {" "}
              Tweak your resume and cover letter for every job you apply to!
              Incorporate the keywords from the job listing and highlight the
              skills and experiences that are relevant to this job at this
              company.
            </h6>
          </ul>
          <br></br>
          <li>
            <b>Optimize Your LinkedIn Profile</b>
          </li>
          <ul>
            Your LinkedIn profile is a supplement to your resume and is
            something hiring managers will read over after your resume to better
            figure out if you’re a fit for the role. And while your resume is
            generally one to two pages, your LinkedIn profile can be much
            longer. So, update your experience, professional qualifications,
            certifications, awards, volunteer experience, and work
            samples—anything that’s relevant to your professional success and
            can help you stand out as a candidate.
          </ul>
          <li>
            <b>Check Your Network</b>
          </li>
          <ul>
            Before applying for a job, research the company to see if you have
            any connections there or if any of your connections are connected to
            current or former employees. This can help you get direct contact
            information for the hiring manager or more information about the
            position. If you have a friend or professional colleague at the
            company, even better—and check to see if the company has a referral
            program. Employers often welcome referrals and sometimes prioritize
            them when calling in candidates for interviews.
          </ul>
          <li>
            <b>Follow the Instructions</b>
          </li>
          <ul>
            Read the application instructions very carefully. If the application
            asks for a resume in PDF format, don’t send it as a .doc file. If it
            asks for a cover letter, don’t just send a resume. Read every detail
            and follow instructions closely because not following them will
            almost guarantee you won’t get the interview.
          </ul>
          <li>
            <b>Imagine Yourself in the Role</b>
          </li>
          <ul>
            Before you go through all the trouble of applying for a job, make
            sure it’s something you really, truly want.
          </ul>
          <ul>Ask yourself:</ul>
          <ul>
            <ul>
              <li>
                Is this a company I admire or would be proud to be part of?
              </li>
              <li>
                Do I know enough about the company’s culture, and am I confident
                I’ll be happy there?
              </li>
              <li>Is the job a stepping-stone or a long-term commitment?</li>
              <li>Are there any red flags I should worry about?</li>
            </ul>
          </ul>
        </ul>
      </div>
    </div>
  );
}

export default Tips;
