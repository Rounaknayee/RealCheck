// this route just takes a scanned barcode from
// the frontend and returns the product info after checking the transaction hjistory from the supplier
// and the manufacturer
//
// The route is NOT protected by a JWT token
const express = require('express');
const router = new express.Router();
const productAuthenticityContract = require('../SmartContracts/smartContractHelper');
const User = require('../models/User');

/*
    POST Scan a product
    POST /api/public/scan
    {
        "productcode": "Product code"
    }
*/
router.post('/scan', async (req, res) => {
    try {
        console.log("Entered: Scan product");
        const barcode = req.body.productcode;
        console.log(barcode);

        // Initialize contract instance with your private key
        const contractInstance = new productAuthenticityContract(process.env.ROUNAK_PRIVATE_KEY);

        // Retrieve product information from the blockchain
        const productchain = await contractInstance.getProductChain(barcode);

        // Check if the product was not found or has an invalid address
        if (!productchain) {
            return res.status(404).send({ error: 'Invalid or not found product' });
        }

        // Retrieve email IDs and wallet addresses for each item in the product chain
        const userDetails = await Promise.all(productchain.map(async (walletAddress) => {
            const user = await User.findOne({ walletAddress });
            return {
                email: user ? user.email : null,
                walletAddress: walletAddress
            };
        }));

        // Filter out entries where the user is not found
        const validUserDetails = userDetails.filter(detail => detail.email != null);


        // Send email IDs if valid
        res.status(200).send(validUserDetails);
    } catch (error) {
        console.error('Error scanning product:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
});

module.exports = router;

