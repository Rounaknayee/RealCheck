// this route just takes a scanned barcode from
// the frontend and returns the product info after checking the transaction hjistory from the supplier
// and the manufacturer
//
// The route is NOT protected by a JWT token
const express = require('express');

const router = new express.Router();
router.post('/scan', async (req, res) => {

    console.log("scan product")
    res.status(200).send('scan route successful');
    // Get the barcode from the request body
    // const barcode = req.body.productcode;
});



module.exports = router;