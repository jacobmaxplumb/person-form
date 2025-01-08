const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/api/people', (req, res) => {
    const {fullName} = req.body;
    res.send({ message: `Hello, ${fullName}!` });
})

app.listen(9000, () => console.log('Server is running on port 9000'));