import React , {useState,useEffect} from 'react';
import axios from 'axios';
import AddJobForm from "./components/AddJobForm";
import JobList from './components/JobList';
import JobControls from './components/JobControls';


const App = ()=>{
  const [jobs, setJobs] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' = Newest First
  const [refresh , setRefresh] = useState(false);


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
  }, [refresh]);


  // const handleAddJob = (data) =>{
  //   console.log("New Job Added" , data);
    
  // }
  const handleAddJob = async (jobData) => {
    try {
      const res = await axios.post('https://potential-space-zebra-gjq4rpwj6x72jw5-5000.app.github.dev/api/jobs', jobData);
      // console.log('✅ Job saved:', res.data);
      // alert("job added successfully ! ");
      setRefresh(prev => !prev);
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
      <h1> Job Tracking System</h1>
      <div style={{display:'flex'}}>
        <div style={{width:"50%"}}>
        <JobControls
      filterStatus={filterStatus}
      setFilterStatus={setFilterStatus}
      sortOrder={sortOrder}
      setSortOrder={setSortOrder}
      />
      <div style={{
        height:'100%',
        overflowY:'auto'}}>
        <JobList
      // jobs={jobs}
      jobs={filteredJobs}
      onUpdateStatus={handleUpdateStatus}
      onDelete={handleDeleteJob}
      />
      </div>
        </div>
        <div style={{width:"50%"}}>
        <AddJobForm onAdd={handleAddJob} />

        </div>
      </div>
    
     



    </div>
  );
};
export default App;