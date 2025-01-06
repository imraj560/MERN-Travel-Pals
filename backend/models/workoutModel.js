const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const workoutSchema = new Schema({

    title:{

        type: String,
        required: true
    },


    wdate:{

        type: Date,
        required: true
    },

    wtype:{

        type: String,
        required: true
    },

    image:{

        type: String,
        required: true
    },

    likes:[

        {type:String, unique:true, default:[]}

    ],

    dislikes:[
        
        {type:String, unique:true, default:[]}

    ]
    ,
    user_id:{

        type: String,
        required: true
    },

    location_lat:{

        type: String,
        required: true
    },

    location_lng:{

        type: String,
        required: true
    },
    
}, {timestamps: true})

module.exports = mongoose.model('Workout', workoutSchema);

