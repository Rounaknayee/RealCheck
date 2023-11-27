import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Scan = () => {
  const [productId, setProductId] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState([]);

  const handleScan = (data) => {
    if (data) {
      setProductId(data);
      setError('');
      setUserDetails([]);
      setIsScanning(false); 
      return;
    }
  }

  const handleError = (err) => {
    console.error(err);
    setError('Scanning failed, please try again.');
  }

  const validateProductId = (id) => {
    const regex = /^RC-\d{13}-\d{1,20}$/;
    return regex.test(id);
  };

  const toggleScanner = () => {
    setIsScanning(!isScanning);
    if (isScanning) {
      setProductId(''); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productId) {
      setError('Please enter a product ID or scan a QR code.');
      return;
    }

    if (!validateProductId(productId)) {
      setError('Invalid format. Please use the format RC-XXXXXXXXXXXXX-XXXXX');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await axios.post('/api/public/scan', { productcode: productId });
      if (response.data.length === 0) {
        setError('Invalid product. No Details found.');
        setUserDetails([]);
      } else {
        setUserDetails(response.data);
        setError('');
      }
    } catch (error) {
      console.error(error);
      setError('Error fetching product details.');
    } finally {
      setIsLoading(false);
      setProductId('');
    }
  }


  return (
    <div className="p-4 bg-teal-50">
      {/* <h2 className="text-lg font-bold mb-4 text-teal-800">Scan Product</h2> */}

      <form onSubmit={handleSubmit} className="mb-4">
        <input 
          type="text" 
          value={productId} 
          onChange={(e) => {
            setProductId(e.target.value);
            setError('');
          }} 
          placeholder="Enter Product ID"
          className="p-2 m-2 border border-teal-300 rounded focus:outline-none focus:ring focus:border-teal-500"
        />
        
        <button 
          type="submit" 
          className="p-2 bg-teal-600 text-white rounded hover:bg-teal-700 focus:outline-none focus:ring"
          disabled={isLoading}
        >
          {isLoading ? 'Loading' : 'Submit'}
        </button>

        {/* <button 
          onClick={() => toggleScanner()}
          type="button"
          className="p-2 mx-2 bg-teal-600 text-white rounded hover:bg-teal-700 focus:outline-none focus:ring"
        >
          <FontAwesomeIcon icon={faQrcode} /> {isScanning ? 'Close Scanner' : 'Scan'}
        </button> */}

      </form>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      {userDetails.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-bold text-teal-800">Supply Chain Details:</h3>
          <ul className="list-disc ml-5">
            {userDetails.map((detail, index) => (
              <li key={index} className="text-teal-700">
                {detail.email} - {detail.walletAddress}
              </li>
            ))}
          </ul>
        </div>
      )}

      {isScanning && (
        <div className="mb-4">
          <QrReader
            key={isScanning} // Force re-mount on re-render
            delay={300}
            onError={handleError}
            onResult={handleScan}
            // onScan={handleScan}
            style={{ width: '100%' }}
          />
        </div>
      )}
    </div>
  );
};

export default Scan;
