import React, { useReducer, useEffect} from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import QRCode from 'qrcode.react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faQrcode } from '@fortawesome/free-solid-svg-icons';


const initialState = {
  products: [],
  filteredProducts: [],
  newProduct: { name: '', description: '' },
  message: '',
  isLoading: false,
  isModalOpen: false,
  selectedProductId: null,
  searchQuery: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload, filteredProducts: action.payload };
    case 'UPDATE_NEW_PRODUCT':
      return { ...state, newProduct: { ...state.newProduct, ...action.payload } };
    case 'SET_MESSAGE':
      return { ...state, message: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_MODAL_OPEN':
      return { ...state, isModalOpen: action.payload };
    case 'SET_SELECTED_PRODUCT_ID':
      return { ...state, selectedProductId: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
      case 'FILTER_PRODUCTS':
        const searchQueryLower = state.searchQuery.toLowerCase();
        return {
          ...state,
          filteredProducts: state.products.filter(product =>
            product.name.toLowerCase().includes(searchQueryLower) ||
            product.description.toLowerCase().includes(searchQueryLower)
          )
        };
    default:
      return state;
  }
}

const MProducts = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/manufacturer/productlist');
      dispatch({ type: 'SET_PRODUCTS', payload: response.data });
    } catch (error) {
      console.error('Error fetching products:', error);
      dispatch({ type: 'SET_MESSAGE', payload: 'Failed to fetch products' });
    }
  };

  const handleInputChange = (e) => {
    dispatch({ type: 'UPDATE_NEW_PRODUCT', payload: { [e.target.name]: e.target.value } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_MESSAGE', payload: 'Please Wait, Building the contract for New Product' });
    try {
      await axios.post('/api/manufacturer/createproduct', state.newProduct);
      dispatch({ type: 'SET_MESSAGE', payload: 'Product added successfully' });
      dispatch({ type: 'UPDATE_NEW_PRODUCT', payload: { name: '', description: '' } });
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      dispatch({ type: 'SET_MESSAGE', payload: 'Failed to add product' });
    }
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  const openModal = (productId) => {
    dispatch({ type: 'SET_SELECTED_PRODUCT_ID', payload: productId });
    dispatch({ type: 'SET_MODAL_OPEN', payload: true });
  };

  const closeModal = () => {
    dispatch({ type: 'SET_MODAL_OPEN', payload: false });
  };

  const handleSearchChange = (e) => {
    const newSearchQuery = e.target.value;
    dispatch({ type: 'SET_SEARCH_QUERY', payload: newSearchQuery });
    dispatch({ type: 'FILTER_PRODUCTS' });
  };

  return (
    <div className="p-4 bg-teal-50">
      {/* Add Product Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input type="text" name="name" placeholder="Name" value={state.newProduct.name} onChange={handleInputChange} className="p-2 m-2" />
        <input type="text" name="description" placeholder="Description" value={state.newProduct.description} onChange={handleInputChange} className="p-2 m-2" />
        <button type="submit" className="p-2 bg-teal-600 text-white" disabled={state.isLoading}>Add Product</button>
      </form>

      {/* Message Display */}
      {state.message && <div className="mb-4 text-red-600">{state.message}</div>}

      <div className="flex justify-end">
        {/* Search Input with Icon */}
        <div className="relative">
          <FontAwesomeIcon icon={faSearch} className="px-3 absolute text-teal-600 left-2 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search products..."
            value={state.searchQuery}
            onChange={handleSearchChange}
            className={`pl-8 pr-2 py-2 m-2 ${state.searchQuery ? 'border-2 border-teal-800' : 'border border-gray-300'}`}
          />
        </div>
      </div>
      
      {/* Products Table */}
      <table className="min-w-full">
        <thead>
          <tr className="bg-teal-700 text-white">
            <th className="p-2">Name</th>
            <th className="p-2">Description</th>
            <th className="p-2">Product ID</th>
            <th className="p-2">QR</th>
            <th className="p-2">Product Transaction</th>
            
          </tr>
        </thead>
        <tbody>
        {state.filteredProducts.map((product, index) => (
            <tr key={index} className="border-b">
              {/* ... [product data cells] */}
              <td className="p-2">{product.name}</td>
              <td className="p-2">{product.description}</td>
              <td className="p-2">{product.productId}</td>
              <td className="p-2">
                <button className="px-2 py-1 bg-teal-600 hover:bg-teal-800 rounded text-white" onClick={() => openModal(product.productId)}>
                <FontAwesomeIcon icon={faQrcode} />       
                </button>
              </td>
              <td className="p-2">{product.product_transaction}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* QR Code Modal */}
      <Modal 
        isOpen={state.isModalOpen} 
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-white bg-opacity-75"
      >
        <div className="bg-white border-2 border-teal-600 rounded-lg shadow-xl p-3 items-center justify-center">
        <div className='justify-end'>
        <button 
            onClick={closeModal} 
            className=" absolright-0 mb-2 px-2 py-1 border border-teal-600 text-teal-600 hover:bg-teal-700 hover:text-white transition-colors rounded"
          >
            X
        </button>
        </div>
        {state.selectedProductId && <QRCode value={ state.selectedProductId} fgColor="#004d40" />}
        </div>
      </Modal>
    </div>
  );
};

export default MProducts;
