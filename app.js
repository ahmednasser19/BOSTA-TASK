const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/user');
const dotenv = require('dotenv');
const checkRoute = require('./routes/check');
const reportRoute = require('./routes/report');
dotenv.config();

//connect to DB 
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) console.log(err)
        else console.log("mongdb is connected");
    }
);

//middleware
app.use(express.json());
app.use(cors());

//route middleware

app.use('/api/user', authRoutes);
app.use('/api/check', checkRoute);
app.use('/api/report', reportRoute);


const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Up and running on port ${port}`));

