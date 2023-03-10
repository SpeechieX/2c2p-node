const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const sdk = require('api')('@developers-2c2p-com/v4.0.2#1mld74kq6whmjv');

const router = express.Router();


const secret = process.env.SECRET;
const merchant = process.env.MERCHANT_ID;

router.get('/v1/clientIncoming', async (req, res) => {
	let incoming = {
			merchantId: merchant,
			// merchantId: "JT04",
			invoiceNo: req.query.invoiceNo,
			description: req.query.description,
			amount: Number(req.query.amount),
			currencyCode: req.query.currencyCode,
			paymentChannel: ["CC"]
	}
	const data = jwt.sign(incoming, secret)
	
	axios({
		method: 'POST',
		headers: {
			Accept: 'application/json, text/plain, */*'
		},
		url: "https://pgw.2c2p.com/payment/4.1/PaymentToken",
		data: {
			payload: data
		},
	}).then(response => {
		const success = response.data.payload;
		var decoded = jwt.verify(success, secret);
		res.redirect(decoded.webPaymentUrl);
	})
});

module.exports = router;



