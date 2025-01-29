const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const gallerySchema = new Schema({

    place_id:{

        type: String,
        required: true
    },
  

    image:{

        type: String,
        required: true
    },


    user_id:{

        type: String,
        required: true
    }

    
}, {timestamps: true})

module.exports = mongoose.model('Gallery', gallerySchema);

