import React from 'react';

const JobList = ({ jobs, onUpdateStatus, onDelete }) => {
  return (
    <div className="job-list">
      <h2>📋 Job Applications</h2>
      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        jobs.map(job => (
          <div key={job._id} className="job-card">
            <h3>{job.company}</h3>
            <p><strong>Role:</strong> {job.role}</p>
            <p>
              <strong>Status:</strong>{' '}
              <select
                value={job.status}
                onChange={(e) => onUpdateStatus(job._id, e.target.value)}
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </p>
            <p><strong>Date:</strong> {new Date(job.dateOfApplication).toLocaleDateString()}</p>
            {job.link && (
              <p>
                <a href={job.link} target="_blank" rel="noopener noreferrer">
                  View Job Posting
                </a>
              </p>
            )}
            <button onClick={() => onDelete(job._id)} style={{ marginTop: '10px' }}>
              ❌ Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default JobList;
