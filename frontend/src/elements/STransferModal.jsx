import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const STransferModal = ({ isOpen, onRequestClose, product }) => {
    const [supplierEmail, setSupplierEmail] = useState('');
    const [suppliers, setSuppliers] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchSuppliers();
        }
    }, [isOpen]);

    const fetchSuppliers = async () => {
        try {
            const response = await axios.get('/api/supplier/supplierlist');
            setSuppliers(response.data);
        } catch (error) {
            console.error('Error fetching suppliers:', error);
            setError('Failed to fetch suppliers');
        }
    };

    const handleSupplierChange = (e) => {
        setSupplierEmail(e.target.value);
    };

    const handleTransfer = async () => {
        setIsLoading(true);
        setError('');
        setMessage('');
        try {
            await axios.post('/api/supplier/transferproduct', {
                product_id: product,
                supplier_email: supplierEmail,
            });
            setMessage('Product transferred successfully');
            setTimeout(() => {
                setMessage('');
                onRequestClose();
            }, 3000); // Clear message and close modal after 3 seconds
        } catch (error) {
            console.error('Error during product transfer:', error);
            setError(error.response?.data || 'Failed to transfer product');
            setTimeout(() => setError(''), 3000); // Clear error message after 3 seconds
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onRequestClose}
            className="mx-auto my-8 p-4 max-w-lg bg-white rounded-lg shadow"
            overlayClassName="fixed inset-0 bg-black bg-opacity-30"
        >
            <div className="text-teal-800">
                <h2 className="text-xl font-bold mb-4">Transfer Product</h2>
                <p className="mb-2">Product ID: <span className="font-semibold">{product}</span></p>

                <div className="mb-4">
                    <label htmlFor="supplierSelect" className="block mb-2">Transfer to Supplier:</label>
                    <select 
                        id="supplierSelect" 
                        value={supplierEmail} 
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
                {message && <div className="text-green-600 mb-4">{message}</div>}

                <div className="flex justify-end space-x-2">
                    <button 
                        onClick={handleTransfer}
                        disabled={isLoading}
                        className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 focus:outline-none focus:ring"
                    >
                        {isLoading ? 'Transferring...' : 'Transfer'}
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

export default STransferModal;