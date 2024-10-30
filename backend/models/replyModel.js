const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ReplySchema = new Schema({

    commentId:{

        type: String,
        required: true,
        ref:'Comment'
    },
   
    content: { 
        type: String, required: true 
    },

    user_id:{

        type: String,
        required: true,
        ref:'User'
    },

    name:{

        type:String,
        required:true
    }
    
}, {timestamps: true})

module.exports = mongoose.model('Reply', ReplySchema);

