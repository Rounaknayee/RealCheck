import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCodeModal from '../QRCodeModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';

const SProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/supplier/productlist');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (productId) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 bg-teal-50">
      <h2 className="text-lg font-bold mb-4">Supplier Products</h2>
      {isLoading ? (
        <div>Loading products...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <table className="min-w-full">
          <thead className="bg-teal-700 text-white">
            <tr>
              <th className="p-2">Product ID</th>
              <th className="p-2">QR</th>
              <th className="p-2">Product Name</th>
              <th className="p-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{product.productId}</td>
                <td className="p-2">
                  <button 
                    className="p-2 bg-teal-600 text-white rounded hover:bg-teal-700"
                    onClick={() => openModal(product.productId)}
                  >
                    <FontAwesomeIcon icon={faQrcode} />
                  </button>
                </td>
                <td className="p-2">{product.name}</td>
                <td className="p-2">{product.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <QRCodeModal 
        isOpen={isModalOpen} 
        onRequestClose={closeModal}
        productId={selectedProductId}
        color="#004d40"
      />
    </div>
  );
};

export default SProducts;
