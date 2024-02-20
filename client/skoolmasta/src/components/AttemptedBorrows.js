import React, { useEffect, useState } from 'react';

const AttemptedBorrows = () => {
  // State to store the attempted borrows data
  const [attemptedBorrows, setAttemptedBorrows] = useState([]);

  useEffect(() => {
    // Fetch attempted borrows data from the backend
    fetch('/admin/attempts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Include credentials if necessary
        // credentials: 'include',
      },
    })
      .then(response => response.json())
      .then(data => {
        // Set the attempted borrows data in the state
        setAttemptedBorrows(data);
      })
      .catch(error => {
        // Handle any errors
        console.error('Error fetching attempted borrows:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return (
    <div>
      <h2>Attempted Borrows</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Borrower</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {attemptedBorrows.map((borrow) => (
            <tr key={borrow.id}>
              <td>{borrow.itemName}</td>
              <td>{borrow.borrowerName}</td>
              <td>
                {/* Add buttons or actions for handling borrows */}
                <button>Approve</button>
                <button>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttemptedBorrows;
