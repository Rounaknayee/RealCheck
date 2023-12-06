import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const initialState = {
  user: { email: '', walletAddress: '', ethBalance: 0 },
  marketValues: { ethToUsd: 0, ethToBtc: 0 },
  showWallet: false
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_MARKET_VALUES':
      return { ...state, marketValues: action.payload };
    case 'TOGGLE_WALLET_DISPLAY':
      return { ...state, showWallet: !state.showWallet };
    default:
      return state;
  }
}

const MDashboardHome = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const { user } = state;

  useEffect(() => {
    const fetchUserDetails = async () => {
      let user = sessionStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
      } else {
        try {
          const response = await axios.get('/api/users/userdetails');
          user = response.data;
          sessionStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
      if (user) {
        dispatch({ type: 'SET_USER', payload: user });
      }
    };

    const fetchEthBalanceAndMarketValues = async () => {
      const storedMarketValues = sessionStorage.getItem('marketValues');
      if (storedMarketValues) {
        dispatch({ type: 'SET_MARKET_VALUES', payload: JSON.parse(storedMarketValues) });
      } else {
        try {
          const marketData = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,btc');
          const marketValues = {
            ethToUsd: marketData.data.ethereum.usd,
            ethToBtc: marketData.data.ethereum.btc
          };
          sessionStorage.setItem('marketValues', JSON.stringify(marketValues));
          dispatch({ type: 'SET_MARKET_VALUES', payload: marketValues });
        } catch (error) {
          console.error('Error fetching market values:', error);
        }
      }
    };

    
    fetchUserDetails();
    fetchEthBalanceAndMarketValues();
  }, []);

  if (!state.user) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" flex flex-col ">
      {/* Greeting with User's Email */}
      <h1 className="my-6 w-full border-l-4 border-teal-800 bg-teal-50 p-3 flex">
        
        Hi, <span className="font-bold text-teal-700">{state.user.email}</span> !
      </h1>

      {/* Wallet Address Display */}
      <div className="mb-3 w-full border-l-4 border-teal-800 bg-teal-50 p-3 flex items-center">
        <button 
          onClick={() => dispatch({ type: 'TOGGLE_WALLET_DISPLAY' })}
          className="mr-2 text-teal-600 hover:text-teal-800"
        >
          {state.showWallet ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
        </button>
        <span className="text-md text-teal-600">
          {state.showWallet ? 'Your Wallet : '+state.user.walletAddress : 'Your Wallet : *****************************************************'}
        </span>
      </div>

      {/* ETH Balance and Market Values */}
      <p className="mb-3 w-full border-l-4 border-teal-800 bg-teal-50 p-3 text-md text-teal-600 flex">
        ETH Balance:<span className="font-semibold">  {state.user.ethBalance} ETH</span>
      </p>
      <p className="w-full border-l-4 border-teal-800 bg-teal-50 p-3 text-md text-teal-600">
        ETH to USD: <span className="font-semibold">{state.marketValues.ethToUsd} USD</span>
      </p>
      <p className="w-full border-l-4 border-teal-800 bg-teal-50 p-3 text-md text-teal-600">
        ETH to BTC: <span className="font-semibold">{state.marketValues.ethToBtc} BTC</span>
      </p>
    </div>
  );
};

export default MDashboardHome;
