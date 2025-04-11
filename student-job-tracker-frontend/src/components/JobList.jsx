import React from 'react';

const JobList = ({ jobs, onUpdateStatus, onDelete }) => {
  return (
    <div className="job-list-wrapper ">
      <h2>📋 Job Applications</h2>
      {jobs.length === 0 ? (
        <p className="no-jobs">No jobs found.</p>
      ) : (
        <div className="job-list">
          {jobs.map(job => (
            <div key={job._id} className="job-card">
              <div className="job-card-header">
                <p style={{textAlign:"center",fontSize:"24px"}}>{job.company}</p>
                <button onClick={() => onDelete(job._id)} className="delete-btn">
                  ❌
                </button>
              </div>
              <div style={{display:'flex',justifyContent:"space-between"}}>
              <p><strong>Date:</strong> {new Date(job.dateOfApplication).toLocaleDateString()}</p>
              <div className="status-row">
                {/* <label><strong>Status:</strong></label> */}
                <select
                  value={job.status}
                  onChange={(e) => onUpdateStatus(job._id, e.target.value)}
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>  </div>
              <p><strong>Role:</strong> {job.role}</p>

             

             

              {job.link && (
                <a href={job.link} target="_blank" rel="noopener noreferrer" className="job-link">
                  🔗 View Job Posting
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
