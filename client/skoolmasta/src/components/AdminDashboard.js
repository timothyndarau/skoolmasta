import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  // State to store the data fetched from the backend
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  const fetchData = () => {
    // Make a GET request to fetch data from the backend
    fetch('/admin/dashboard', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Include credentials if necessary
        // credentials: 'include',
      },
    })
      .then(response => response.json())
      .then(data => {
        // Update the state with the fetched data
        setData(data);
      })
      .catch(error => {
        // Handle any errors
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.availability ? 'Available' : 'Not Available'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
