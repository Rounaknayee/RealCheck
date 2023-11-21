require('dotenv').config();
const productAuthenticityContract = require('./SmartContracts/smartContractHelper');
const { events } = require('./models/Product');

const privateKey = process.env.PREV_ROUNAK_PRIVATE_KEY;
console.log(privateKey);

const contractInstance = new productAuthenticityContract(privateKey);

async function main() {
    try {
        // ro_P_1 , Test_product_1 , test1, test2, RC-1700491339597-56879
        // const result = await contractInstance.addProduct('test2', 'name2' , 'manufacturer2');
        // const result = await contractInstance.getProductChain('');

        const result = await contractInstance.getProduct('RC-1700495192904-83412');
        // const result = await contractInstance.transferProduct('test1', process.env.PREV_ROUNAK_ADDRESS);
        // const result = await contractInstance.alterProductHolder('test1', process.env.PREV_ROUNAK_ADDRESS);
        // const result = await contractInstance.finalizeProduct('');
        console.log(result);
        // console.log(result['events'][0]['transactionHash']);
    } catch (error) {
        console.error(error);
    }
}
main();