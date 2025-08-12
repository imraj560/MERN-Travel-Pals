require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const placeRoutes = require('./routes/placeRouter');
const userRoutes = require('./routes/userRouter');
const googleRoutes = require('./routes/googleAuth')
const passport = require('./middleware/passport')
const cors = require('cors')
const app = express();
app.use(cookieParser());
/**Some more changes */

var corsOptions = {
    origin: 'https://travelpals-560.netlify.app',
    //origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(passport.initialize())  

//default middleware
app.use(express.json());


app.use((req, res, next)=>{

    console.log(req.path, req.method);
    next();
})


//googel auth routes
app.use('/auth', cors(corsOptions), googleRoutes);

//routes for workout api
app.use('/api/place', cors(corsOptions), placeRoutes);
//app.use('/api/workout', workoutRoutes);

//routes for user Auth
app.use('/api/user', cors(corsOptions), userRoutes);
//app.use('/api/user', userRoutes);

app.use('/images', cors(corsOptions), express.static('uploads'));
//app.use('/images', express.static('uploads'));

//Database connect
mongoose.connect(process.env.MONGO_URI).then(()=>{

    app.listen(process.env.PORT, ()=>{

        console.log('ConneWctescd ds to DB, port no:', process.env.PORT);
    })

}).catch((error)=>{

    console.log(error);
})

