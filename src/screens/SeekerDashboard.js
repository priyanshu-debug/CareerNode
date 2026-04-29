import React, { useEffect, useState } from 'react';

const SeekerDashboard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('http://YOUR_IP_ADDRESS:5000/api/jobs')
      .then(res => res.json())
      .then(data => setJobs(data));
  }, []);

  return (
    
  );
};