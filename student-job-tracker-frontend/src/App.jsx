import React , {useState,useEffect} from 'react';
import axios from 'axios';
import AddJobForm from "./components/AddJobForm";
import JobList from './components/JobList';


const App = ()=>{
  const [jobs, setJobs] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' = Newest First


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('https://potential-space-zebra-gjq4rpwj6x72jw5-5000.app.github.dev/api/jobs');
        console.log(res ," api response");
        setJobs(res.data);
      } catch (err) {
        console.error("❌ Error fetching jobs:", err);
      }
    };

    fetchJobs();
  }, []);


  // const handleAddJob = (data) =>{
  //   console.log("New Job Added" , data);
    
  // }
  const handleAddJob = async (jobData) => {
    try {
      const res = await axios.post('https://potential-space-zebra-gjq4rpwj6x72jw5-5000.app.github.dev/api/jobs', jobData);
      console.log('✅ Job saved:', res.data);
      // You can also update a job list here after adding
      alert("job added successfully ! ");
    } catch (err) {
      console.error('❌ Error saving job:', err.response?.data || err.message);
      alert("Error saving job ! ");

    }
  };
  // 🟡 Update Job Status
const handleUpdateStatus = async (id, newStatus) => {
  try {
    const res = await axios.patch(`https://potential-space-zebra-gjq4rpwj6x72jw5-5000.app.github.dev/api/jobs/${id}`, { status: newStatus });
    setJobs(prev =>
      prev.map(job => (job._id === id ? { ...job, status: res.data.status } : job))
    );
  } catch (err) {
    console.error('❌ Error updating job status:', err);
  }
};

// 🗑️ Delete Job
const handleDeleteJob = async (id) => {
  try {
    await axios.delete(`https://potential-space-zebra-gjq4rpwj6x72jw5-5000.app.github.dev/api/jobs/${id}`);
    setJobs(prev => prev.filter(job => job._id !== id));
  } catch (err) {
    console.error('❌ Error deleting job:', err);
  }
};

const filteredJobs = jobs
  .filter(job => filterStatus === 'All' || job.status === filterStatus)
  .sort((a, b) => {
    const dateA = new Date(a.dateOfApplication);
    const dateB = new Date(b.dateOfApplication);
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });


  return(
    <div className="app-container">
      <h1> Student job tracker</h1>
      <AddJobForm onAdd={handleAddJob} />

      <div style={{ marginTop: '1.5rem' }}>
        <label>Filter by Status: </label>
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
      <div style={{ marginTop: '1rem' }}>
  <label>Sort by Date: </label>
  <select
    value={sortOrder}
    onChange={(e) => setSortOrder(e.target.value)}
  >
    <option value="desc">Newest First</option>
    <option value="asc">Oldest First</option>
  </select>
</div>


      <JobList
      // jobs={jobs}
      jobs={filteredJobs}
      onUpdateStatus={handleUpdateStatus}
      onDelete={handleDeleteJob}
      />



    </div>
  );
};
export default App;