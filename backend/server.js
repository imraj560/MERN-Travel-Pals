require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workoutRouter');
const userRoutes = require('./routes/userRouter');
const cors = require('cors')
const app = express();
/**Some more changes */

const corsOptions = {
    origin: "http://localhost:3000" // frontend URI (ReactJS)
}

function setCorsHeaders(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  }
//default middleware
app.use(express.json());


app.use((req, res, next)=>{

    console.log(req.path, req.method);
    next();
})

app.use(cors(corsOptions));

app.use(setCorsHeaders);

//routes for workout api
app.use('/api/workout', workoutRoutes);

//routes for user Auth
app.use('/api/user', userRoutes);

//Database connect
mongoose.connect(process.env.MONGO_URI).then(()=>{

    app.listen(process.env.PORT, ()=>{

        console.log('Connected to DB, port no:', process.env.PORT);
    })

}).catch((error)=>{

    console.log(error);
})