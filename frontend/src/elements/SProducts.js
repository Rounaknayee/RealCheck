import { React, useEffect } from 'react';
import axios from 'axios';
import QRCodeModal from '../QRCodeModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode, faEdit, faCopy } from '@fortawesome/free-solid-svg-icons';
import STransferModal from './STransferModal';
import { useReducer } from 'react';



const initialState = {
    products: [],
    isLoading: true,
    error: null,
    isModalOpen: false,
    selectedProductId: '',
    isTransferModalOpen: false,
    selectedProduct: null,
  };
  
  function reducer(state, action) {
    switch (action.type) {
      case 'SET_PRODUCTS':
        return { ...state, products: action.payload, isLoading: false };
      case 'SET_LOADING':
        return { ...state, isLoading: action.payload };
      case 'SET_ERROR':
        return { ...state, error: action.payload };
      case 'OPEN_MODAL':
        return { ...state, isModalOpen: true, selectedProductId: action.payload };
      case 'CLOSE_MODAL':
        return { ...state, isModalOpen: false };
      case 'OPEN_TRANSFER_MODAL':
        return { ...state, isTransferModalOpen: true, selectedProduct: action.payload };
      case 'CLOSE_TRANSFER_MODAL':
        return { ...state, isTransferModalOpen: false };
      default:
        return state;
    }
  }
  

const SProducts = () => {

   const [state, dispatch] = useReducer(reducer, initialState);

   useEffect(() => {
    fetchProducts();
    }
    , []);

    const fetchProducts = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const response = await axios.get('/api/supplier/productlist');
            dispatch({ type: 'SET_PRODUCTS', payload: response.data });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Error fetching products' });
            console.error('Error fetching products:', error);
        }
    };  

    const openModal = (productId) => {
        dispatch({ type: 'OPEN_MODAL', payload: productId });
    };

    const closeModal = () => {
        dispatch({ type: 'CLOSE_MODAL' });
    };

    const openTransferModal = (product) => {
        dispatch({ type: 'OPEN_TRANSFER_MODAL', payload: product });
    };

    const closeTransferModal = () => {
        dispatch({ type: 'CLOSE_TRANSFER_MODAL' });
    };

    const truncateString = (str, len) => {
        if (str.length <= len) {
          return str;
        }
        return str.slice(0, len) + '...';
      };

    const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard');
    }).catch((err) => {
        console.error('Could not copy text: ', err);
    });
    };



  return (
    <div className="p-4 bg-teal-50">
      <h2 className="text-lg font-bold mb-4">Supplier Products</h2>
      {state.isLoading ? (
        <div>Loading products...</div>
      ) : state.error ? (
        <div className="text-red-600">{state.error}</div>
      ) : (
        <table className="min-w-full">
          <thead className="bg-teal-700 text-white">
            <tr>
              <th className="p-2">Product ID</th>
              <th className="p-2">QR</th>
              <th className='p-2'>Transfer</th>
              <th className="p-2">Product Name</th>
              <th className="p-2">Description</th>
              <th className="p-2">Manufacturer</th>
              <th className="p-2">Transaction Hash</th>
            </tr>
          </thead>
          <tbody>
            {state.products.map((product, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{product.productId}</td>

                {/* QR CODE DISPLAY BUTTON */}
                <td className="p-2">
                  <button 
                    className="px-2 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
                    onClick={() => openModal(product.productId)}
                  >
                    <FontAwesomeIcon icon={faQrcode} />
                  </button>
                </td>

                {/* TRANSFER BUTTON */}
                <td className="p-2">
                  <button 
                    className="px-2  py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
                    onClick={() => openTransferModal(product.productId)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </td>

                <td className="p-2">{product.name}</td>
                <td className="p-2">{product.description}</td>
                <td className="p-2">{product.manufacturer_email }</td>
                <td className="p-2 cursor-pointer flex items-start" title="Click to copy">
                <button 
                  className="px-2 py-1 bg-teal-600 hover:bg-teal-800 rounded text-white" 
                  onClick={() => copyToClipboard(product.product_transaction)}
                >
                  <FontAwesomeIcon icon={faCopy} />
                </button>
                <span className="ml-2">
                  {truncateString(product.product_transaction, 20)}
                </span>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <QRCodeModal 
        isOpen={state.isModalOpen} 
        onRequestClose={closeModal}
        productId={state.selectedProductId}
        color="#004d40"
      />

      <STransferModal
        isOpen={state.isTransferModalOpen}
        onRequestClose={closeTransferModal}
        product={state.selectedProduct}
        />
    </div>
  );
};

export default SProducts;
