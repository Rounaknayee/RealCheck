require('dotenv').config();
const productAuthenticityContract = require('./SmartContracts/smartContractHelper');
const { events } = require('./models/Product');

const privateKey = '0x4ed6024a2a45bf0628850d93c32480e5257b84ad0f607ebee745e9087a786236' //process.env.ROUNAK_PRIVATE_KEY;
console.log(privateKey);

const contractInstance = new productAuthenticityContract(privateKey);

async function main() {
    try {
        // ro_P_1 , Test_product_1 , test1, test2, RC-1700491339597-56879
        // const result = await contractInstance.addProduct('rex2', 'name2' , 'manufacturo_manufacturererer2');
        // const result = await contractInstance.getProductChain('');

        const result = await contractInstance.getProduct('RC-1700494226533-3598');
        // const result = await contractInstance.transferProduct('RC-1700491339597-56879', '0xD50EBa0F3E0BfcaA4d05e5af51F760152bA0C3C3');
        // const result = await contractInstance.alterProductHolder('test1', process.env.PREV_ROUNAK_ADDRESS);
        // const result = await contractInstance.finalizeProduct('');
        console.log(result);
        // console.log(result['events'][0]['transactionHash']);
    } catch (error) {
        console.error(error);
    }
}
main();