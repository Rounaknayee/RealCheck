import React, { useReducer, useEffect } from 'react';
import axios from 'axios';

const initialState = {
  products: [],
  newProduct: { name: '', description: '' },
  message: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'UPDATE_NEW_PRODUCT':
      return { ...state, newProduct: { ...state.newProduct, ...action.payload } };
    case 'SET_MESSAGE':
      return { ...state, message: action.payload };
    default:
      return state;
  }
}

const ManufacturerDashboard = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/manufacturer/productlist', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming the token is stored with the key 'token'
        }
      });
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
    try {
      await axios.post('/api/manufacturer/createproduct', state.newProduct, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming the token is stored with the key 'token'
        }
      });
      dispatch({ type: 'SET_MESSAGE', payload: 'Product added successfully' });
      dispatch({ type: 'UPDATE_NEW_PRODUCT', payload: { name: '', description: '' } });
      // add a wait
            
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      dispatch({ type: 'SET_MESSAGE', payload: 'Failed to add product' });
    }
  };

  return (
    <div className="p-4 bg-teal-50">
      {/* Add Product Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input type="text" name="name" placeholder="Name" onChange={handleInputChange} className="p-2 m-2" />
        <input type="text" name="description" placeholder="Description" onChange={handleInputChange} className="p-2 m-2" />
        <button type="submit" className="p-2 bg-teal-600 text-white">Add Product</button>
      </form>

      {/* Message Display */}
      {state.message && <div className="mb-4 text-red-600">{state.message}</div>}

      {/* Products Table */}
      <table className="min-w-full">
        <thead>
          <tr className="bg-teal-700 text-white">
            <th className="p-2">Name</th>
            <th className="p-2">Description</th>
            <th className="p-2">Product ID</th>
          </tr>
        </thead>
        <tbody>
          {state.products.map((product, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">{product.name}</td>
              <td className="p-2">{product.description}</td>
              <td className="p-2">{product.productId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManufacturerDashboard;
