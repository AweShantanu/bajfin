const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const userInfo = {
    user_id: "Shantanu_Aditya_21BCE3112", // Adjusted format to match example
    email: "shantanuaditya47@gmail.com",
    roll_number: "21BC3112"
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
        console.error('Error handling POST request:', error); // Added logging
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
