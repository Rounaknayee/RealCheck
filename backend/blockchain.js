const { Network, Alchemy } = require('alchemy-sdk');
require('dotenv').config();
const { ethers } = require('ethers');
const config = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(config);

async function getTokenBalances(walletAddress) {
    try {
        const balances = await alchemy.core.getTokenBalances(walletAddress);
        return balances; // Return the balances
    } catch (error) {
        console.error('Error:', error);
        throw error; // Rethrow the error to handle it in the calling context
    }
}

const walletAddress = '0x1e7C5DCc195d7135ee902453c7753E2DCC07CEC7';
getTokenBalances(walletAddress)
    .then(balances => console.log('Token balances for address:', balances))
    .catch(error => console.error('Failed to get token balances:', error));

// // Connect to the Ethereum network
// const provider = 
new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_URL);

// async function checkBalance(address) {
//     try {
//         const balance = await provider.getBalance(address);
//         const balanceEther = ethers.utils.formatEther(balance);
//         console.log(`The balance of address ${address} is: ${balanceEther} ETH`);
//     } catch (error) {
//         console.error('Error:', error.message);
//     }
// }

// // Replace with the address you want to check
// const address = '0x8FAF3DdE903bFb133b52cF2736154fC77f3D08D0';
// checkBalance(address);


// const alchemy = new Alchemy(settings);

// // get the latest block
// const latestBlock = alchemy.core.getBlock("latest")

// // run this script
// // - node blockchain.js


// function createWallet() {
//     const wallet = ethers.Wallet.createRandom();
//     return wallet;
// }

// newWallet = createWallet();

// console.log(newWallet.address);
// console.log(newWallet.privateKey);
// console.log(newWallet.mnemonic);
// console.log(newWallet.mnemonic.phrase);

