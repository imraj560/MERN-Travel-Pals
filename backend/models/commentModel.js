const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CommentSchema = new Schema({

    comment:{

        type: String,
        required: true
    },
   
    replies:[
        
        {type:String, ref:'Reply'}

    ]
    ,
    user_id:{

        type: String,
        required: true
    },

    postId:{

        type: String,
        required: true
    }
    
}, {timestamps: true})

module.exports = mongoose.model('Comment', CommentSchema);

