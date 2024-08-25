const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const userInfo = {
    user_id: "john_doe_17091999",
    email: "john@xyz.com",
    roll_number: "ABCD123"
};

// POST /bfhl
app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data;
        if (!Array.isArray(data)) {
            throw new Error("Invalid input format, expected an array");
        }

        const numbers = [];
        const alphabets = [];
        let highestLowercaseAlphabet = null;

        data.forEach(item => {
            if (!isNaN(item)) {
                numbers.push(item);
            } else if (typeof item === 'string') {
                alphabets.push(item);
                if (item === item.toLowerCase()) {
                    if (!highestLowercaseAlphabet || item > highestLowercaseAlphabet) {
                        highestLowercaseAlphabet = item;
                    }
                }
            }
        });

        res.status(200).json({
            is_success: true,
            user_id: userInfo.user_id,
            email: userInfo.email,
            roll_number: userInfo.roll_number,
            numbers,
            alphabets,
            highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
        });
    } catch (error) {
        res.status(400).json({ is_success: false, error: error.message });
    }
});

// GET /bfhl
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
