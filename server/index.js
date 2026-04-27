const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const verifyToken = require('./routes/protectedRoutes');
// const authMiddleware = require('./middleware/authMiddleware');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const PORT = 3030;
const MONGO_URI = 'mongodb://localhost:27017/DemoDB';

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/home', verifyToken, require('./routes/protectedRoutes'));
mongoose.connect(MONGO_URI);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
