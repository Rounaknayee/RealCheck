// Class to interact with smart contract

const { ethers } = require('ethers');
require('dotenv').config();

class smartContractHelper {
    constructor(privateKey) {

        this.contractABI = require('./contractABI.json');
        this.alchemyProvider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_URL);
        this.signer = new ethers.Wallet(privateKey, this.alchemyProvider);
        this.contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, this.contractABI, this.signer);
    }

    async addProduct(productId, name, manufacturer) {

        
        const tx = await this.contract.addProduct(productId, name, manufacturer, {
            gasLimit: 1000000,        
        });
        return await tx.wait();
    }

    async alterProductHolder(productId, newHolder) {
        const tx = await this.contract.alterProductHolder(productId, newHolder);
        return await tx.wait();
    }

    async transferProduct(productId, nextHolder) {
        const tx = await this.contract.transferProduct(productId, nextHolder);
        return await tx.wait();
    }

    async finalizeProduct(productId) {
        const tx = await this.contract.finalizeProduct(productId);
        return await tx.wait();
    }

    async getProductChain(productId) {
        return await this.contract.getProductChain(productId);
    }

    async getProduct(productId) {
        return await this.contract.getProduct(productId);
    }
}

module.exports = smartContractHelper;

