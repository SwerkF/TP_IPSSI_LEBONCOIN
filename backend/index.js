const express = require('express');
const cors = require('cors');
const app = express();
const { connect } = require('./database/db');
app.use(cors());
app.use(express.json());
connect();

PORT = 8081;

const userRouter = require('./routes/userRoutes');
const annonceRouter = require('./routes/annonceRoutes');

app.use('/users', userRouter);
app.use('/annonces', annonceRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





