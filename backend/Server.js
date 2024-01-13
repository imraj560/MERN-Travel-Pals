require('dotenv').config();

const express = require('express');
const workoutRoutes = require('./routes/Workout');

//lets instantiate express

const app = express();

//now listen to this port

app.listen(process.env.PORT, ()=>{

    console.log('listening to home made port', process.env.PORT);
})


//default middleware
app.use(express.json());
app.use((req, res, next)=>{

    console.log(req.path, req.method);
    next();
})


//routes
app.use('/api/workout', workoutRoutes);