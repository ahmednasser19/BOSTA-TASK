const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const dotenv = require('dotenv');


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

app.listen(3000, () => console.log("Up and running"));

