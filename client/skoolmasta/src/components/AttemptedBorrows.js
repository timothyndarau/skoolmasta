// AttemptedBorrows.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttemptedBorrows = () => {
  const [attemptedBorrows, setAttemptedBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttemptedBorrows = async () => {
      try {
        const response = await axios.get('/api/attempted-borrows');
        setAttemptedBorrows(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching attempted borrows');
        setLoading(false);
      }
    };

    fetchAttemptedBorrows();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
