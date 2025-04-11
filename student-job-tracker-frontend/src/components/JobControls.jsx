// src/components/JobControls.jsx
import React from 'react';
import '../styles/app.css'; 

const JobControls = ({ filterStatus, setFilterStatus, sortOrder, setSortOrder }) => {
  return (
    <div className="job-controls">
      <div className="control-group">
        <label>📌 Filter by Status:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="control-group">
        <label>🗂️ Sort by Date:</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>
    </div>
  );
};

export default JobControls;
