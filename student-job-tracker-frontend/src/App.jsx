import React from 'react';
import axios from 'axios';
import AddJobForm from "./components/AddJobForm";

const App = ()=>{

  // const handleAddJob = (data) =>{
  //   console.log("New Job Added" , data);
    
  // }
  const handleAddJob = async (jobData) => {
    try {
      const res = await axios.post('https://potential-space-zebra-gjq4rpwj6x72jw5-5000.app.github.dev/api/jobs', jobData);
      console.log('✅ Job saved:', res.data);
      // You can also update a job list here after adding
    } catch (err) {
      console.error('❌ Error saving job:', err.response?.data || err.message);
    }
  };
  return(
    <div className="app-container">
      <h1> Student job tracker</h1>
      <AddJobForm onAdd={handleAddJob} />

    </div>
  );
};
export default App;