require('dotenv').config();
const productAuthenticityContract = require('./SmartContracts/smartContractHelper');

const contractAddress = process.env.CONTRACT_ADDRESS;
const providerUrl = process.env.ALCHEMY_API_URL;
const privateKey = '0x8972f0cfb43c19b9c9882cf52cc8594f20eb6e970fe7252df682a983235309b1' //.env.ROUNAK_PRIVATE_KEY;
console.log(contractAddress);
console.log(providerUrl);
console.log(privateKey);

const contractInstance = new productAuthenticityContract(contractAddress, providerUrl, privateKey);

async function main() {
    try {
        // const result = await contractInstance.addProduct('Test_product_1', 'abc' , 'manufacturer1');
        // const result = await contractInstance.getProductChain('Test_product_1');
        // const result = await contractInstance.getProduct('Test_product_1');
        // const result = await contractInstance.finalizeProduct('Test_product_1');

        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

main();

// async function main() {
//     try{
//     const result = await contractInstance.addProduct('Test_product_1', 'abc' , 'manufacturer1');
//     console.log('Product Added:', result);
//     }
//     catch(error){
//         console.error('Error:', error);
//     }
// }

// main();