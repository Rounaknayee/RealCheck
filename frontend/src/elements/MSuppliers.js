import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Or your method to interact with the blockchain or backend

const MSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    // Fetch suppliers data
    // Replace this with actual data fetching logic
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('/api/manufacturer/supplierlist');
        setSuppliers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
        // Handle the error appropriately
      }
    };

    fetchSuppliers();
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">List of Suppliers</h2>
      {suppliers.length > 0 ? (
        <table className="min-w-full">
          <thead>
            <tr className="bg-teal-700 text-white">
              <th className="p-2">Name</th>
              {/* <th className="p-2">Details</th> */}
              {/* Add more headers if needed */}
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{supplier.email}</td>
                {/* <td className="p-2">{supplier.details}</td> */}
                {/* Render other supplier properties as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-teal-700">No suppliers found</div>
      )}
    </div>
  );
};

export default MSuppliers;
