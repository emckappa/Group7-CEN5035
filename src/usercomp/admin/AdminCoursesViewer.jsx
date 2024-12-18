import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminCoursesViewer = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/courses/', {
          headers: {'Content-Type': 'application/json',},
        });

        if (response.status === 200) {
          const data = response.data;
          setData(data);
        } else {
          setError('Failed to fetch data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h3>Courses from Database</h3><p>
      <table border="1" style={{width: '100%' }}>
        <thead>
          <tr>
            {data.length > 0 && 
              Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {Object.values(item).map((value, idx) => (
                <td key={idx}>{value !== null ? value.toString() : 'N/A'}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </p>
    </div>
  );
};

export default AdminCoursesViewer;