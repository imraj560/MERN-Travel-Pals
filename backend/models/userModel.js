const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new Schema({
    name:{

        type: String,
        required: true,
        min: [6, 'Too small'],
        max: 12
        
    },
    email:{

        type: String,
        required: true,
        unique:true
    },

    password:{

        type: String,
        required: true,
       
    }

   
})

userSchema.statics.signup = async function(name, email, password, cPassword){

    if(!email || !password || !name || !cPassword){

        throw Error('All fields must be filled');
    }

    if(!validator.isEmail(email)){

        throw Error('Wrong Email Format');
    }

    const exists = await this.findOne({email})

    if(exists){

        throw Error('This email is already taken');
    }

    // if(!validator.isStrongPassword(password)){

    //     throw Error('Min 6 Char Uper Lower Symbols');
    // }

    

    if(password !== cPassword){

        throw Error('Password does not match')
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({name, email, password: hash})

    return user;
}

userSchema.statics.login = async function(email, password){

    if(!email || !password){

        throw Error('All fields must be filled');
    }

    if(!validator.isEmail(email)){

        throw Error ('The email is not proper');
    }

    const user = await this.findOne({email});

    if(!user){

        throw Error('This Email does not exist');
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match){

        throw Error ('Wrong Password');
    }

    return user;
}

module.exports = mongoose.model('user', userSchema);