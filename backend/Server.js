require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/Workout');

//lets instantiate express

const app = express();

// //now listen to this port

// app.listen(process.env.PORT, ()=>{

//     console.log('listening to home made port', process.env.PORT);
// })


//default middleware
app.use(express.json());
app.use((req, res, next)=>{

    console.log(req.path, req.method);
    next();
})


//routes for workout api
app.use('/api/workout', workoutRoutes);

//Database connect
mongoose.connect(process.env.MONGO_URI).then(()=>{

    app.listen(process.env.PORT, ()=>{

        console.log('Connected to DB, port no:', process.env.PORT);
    })

}).catch((error)=>{

    console.log(error);
})