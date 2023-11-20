// Class to interact with smart contract

const { ethers } = require('ethers');

class smartContractHelper {
    constructor(contractAddress, providerUrl, privateKey) {

        this.contractABI = require('./contractABI.json');
        this.alchemyProvider = new ethers.providers.JsonRpcProvider(providerUrl);
        this.signer = new ethers.Wallet(privateKey, this.alchemyProvider);
        this.contract = new ethers.Contract(contractAddress, this.contractABI, this.signer);
    }

    async addProduct(productId, name, manufacturer) {
        const tx = await this.contract.addProduct(productId, name, manufacturer);
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

