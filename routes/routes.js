const express = require('express');
const router = express.Router();
const _ = require('lodash');

router.post('/findMissingNumber', (req, res, next) => {
	const { data } = req.body;
	/** Validate input **/
	if (!data || data.length > 100 || data.length == 0 || !data.every((e) => { return (typeof e === "number" && e >= 1 && e <= 100) })) {
		return res.status(400).json({ message: "Array is not valid !!!" });
	} else if (new Set(data).size != data.length) {
		return res.status(400).json({ message: "Array has duplicate !!!" });
	} else {
		/************* Handle data *************/
		/** Solution 1: **/
		let missingNumber = Array.from({ length: 100 }, (a, b) => b + 1);
		let tmp;
		for (let i = 0; i < data.length; i++) {
			for (let j = i + 1; j < data.length; j++) {
				if (data[i] < data[j]) {
					tmp = data[i];
					data[i] = data[j];
					data[j] = tmp;
				}
			}
			missingNumber.splice(data[i] - 1, 1);
		}

		/** Solution 2: **/
		// data.sort();
		// let missingNumber = [];
		// for (let i = 1, j = 0; i <= 100; i++) {
		// 	if (data[j] === i) j++;
		// 	else missingNumber.push(i);
		// }

		/** Solution 3: Using lodash **/
		// let array = Array.from({ length: 100 }, (a, b) => b + 1);
		// let missingNumber = _.difference(array, data);

		return res.status(200).json({ missingNumber: missingNumber });

	}
});

module.exports = router