import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

/*
    This component is a modal that allows the user to edit or transfer a product.
    It is used in MProducts.js
*/
const MEditTransferModal = ({ isOpen, onRequestClose, product }) => {
    const [selectedSupplier, setSelectedSupplier] = useState('');   // Used to store the selected supplier
    const [suppliers, setSuppliers] = useState([]);                 // Used to store the list of suppliers
    const [error, setError] = useState(null);                       // Used to display error message
    const [isLoading, setIsLoading] = useState(false);              // Used to disable the buttons while the request is being made
    const [success, setSuccess] = useState(null);                   // Used to display success message
    const [currentHolder, setCurrentHolder] = useState(null);       // Used to store the current holder of the product

    useEffect(() => {
      if (isOpen) {
        fetchSuppliers();
        setCurrentHolder(product?.current_holder);
      }
      if (product) {
        setSelectedSupplier('');
      }
    }, [isOpen, product]);

    useEffect(() => {
        if (error) {
          const timer = setTimeout(() => setError(null), 5000);
          return () => clearTimeout(timer);
        }
      }, [error]);
  
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('/api/manufacturer/supplierlist'); // Adjust the endpoint as necessary
        setSuppliers(response.data);
      } catch (error) {
        setError('Failed to fetch suppliers');
        console.error('Error fetching suppliers:', error);
        // Handle the error appropriately
      }
    };

    const handleSupplierChange = (e) => {
        setSelectedSupplier(e.target.value);
      };


    const handleTransfer = async () => {
        console.log(`Transferring ${product.productId} to supplier ${selectedSupplier} `);
        setIsLoading(true);
        try {
          const response = await axios.post('/api/manufacturer/transferproduct', {
            product_id: product.productId,
            supplier_email : selectedSupplier,
          });
          console.log(response.data);
          setIsLoading(false);
          setSuccess('Product transferred with Tx :  ' + response.data.product_transaction);
          // Clear success message after 5 seconds
          setCurrentHolder(response.data.current_holder)
            setTimeout(() => setSuccess(null), 15000);
          // Handle the response
        } catch (error) {
            setError('Failed to transfer product');
            console.error('Error during product transfer:', error);
            setIsLoading(false);    
          // Handle the error appropriately
        }
    };

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={() => !isLoading && onRequestClose()}
      className="mx-auto my-8 p-4 max-w-lg bg-white rounded-lg shadow"
      overlayClassName="fixed inset-0 bg-black bg-opacity-30"
    >
      <div className="text-teal-800">
        <h2 className="text-xl font-bold mb-4">Edit or Transfer Product</h2>
        <p className="mb-2">Product ID: <span className="font-semibold">{product?.productId}</span></p>
        <p className="mb-4">Current Holder: <span className="font-semibold">{ currentHolder }</span></p>

        <div className="mb-4">
          <label htmlFor="supplierSelect" className="block mb-2">Transfer to Supplier:</label>
          <select 
            id="supplierSelect" 
            value={selectedSupplier} 
            onChange={handleSupplierChange}
            className="block w-full p-2 border border-teal-300 rounded focus:outline-none focus:ring focus:border-teal-500"
          >
            <option value="">Select a Supplier</option>
            {suppliers.map((supplier, index) => (
              <option key={index} value={supplier.email}>
                {supplier.email}
              </option>
            ))}
          </select>
        </div>

        {error && <div className="text-red-600 mb-4">{error}</div>}
        {isLoading && <div className="text-teal-600 mb-4">Loading...</div>}
        {success && <div className="text-teal-600 mb-4">{success}</div>}

        <div className="flex justify-end space-x-2">
          <button 
            onClick={handleTransfer}
            disabled={isLoading}
            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 focus:outline-none focus:ring"
          >
            Transfer
          </button>
          <button 
            onClick={onRequestClose}
            disabled={isLoading}
            className="px-4 py-2 bg-gray-300 text-teal-800 rounded hover:bg-gray-400 focus:outline-none focus:ring"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default MEditTransferModal;
