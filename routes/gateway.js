const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const sdk = require('api')('@developers-2c2p-com/v4.0.2#1mld74kq6whmjv');

const router = express.Router();

// const secret = "CD229682D3297390B9F66FF4020B758F4A5E625AF4992E5D75D311D6458B38E2";
const secret = "10A2528EFCAC6CE1787D3815F58C9C1CF8910B305A397B9E2912AEE8B362D186";

router.get('/v1/clientIncoming', async (req, res) => {
	let incoming = {
			merchantId: "764764000001560",
			// merchantId: "JT04",
			invoiceNo: req.query.invoiceNo,
			description: req.query.description,
			amount: Number(req.query.amount),
			currencyCode: req.query.currencyCode,
			paymentChannel: ["CC"]
	}
	const data = jwt.sign(incoming, secret )

	// sdk.post('/payment/4.1/PaymentToken', { "payload": data }, { Accept: 'text/plain' }).then(r => {
	// 		// res.send(response.payload)
	// 	const success = r.payload;
	// 	var decoded = jwt.verify(success, secret);
	// 	res.send(decoded);
	// })

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
})

router.get('/v1/clientOutgoing', (req, res) => { })

module.exports = router;



