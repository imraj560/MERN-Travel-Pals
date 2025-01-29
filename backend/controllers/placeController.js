const Place = require('../models/placeModel');
const Gallery = require('../models/galleryModel')
const Comment = require('../models/commentModel')
const User = require('../models/userModel')
const Reply = require('../models/replyModel')
const mongoose = require('mongoose');
const fs = require('fs')
const path = require('path');
const { error } = require('console');
const nodemailer = require('nodemailer');



/**All place  */

const homePlace = async(req, res) => {

    await Place.aggregate([
        {
          $project: {
            _id: 1,
            title: 1,
            wtime:1,
            wdate:1,
            wtype:1,
            image:1,
            likes:1,
            dislikes:1,
            user_id:1,
            location_lat:1,
            location_lng:1,
            description:1,
            // If 'friends' doesn't exist, treat it as an empty array
            likesCount: { $size: { $ifNull: ["$likes", []] } },
            dislikesCount: { $size: { $ifNull: ["$dislikes", []] } },
            
          }
        },
        {
            $sort:{_id: -1}
        }
      ])
        .then(results => {
            res.status(200).json(results);

        })
        .catch(err => {
          console.error(err);
        });
   
}

/**Contact Traveller */
const mailOwner = async(req, res) => {

    const {subject, message, email, owner} = req.body;

    const id = new mongoose.Types.ObjectId(owner);

    const ownerEmail = await User.findOne({_id:id}).select('email');

      const transporter = nodemailer.createTransport({
    
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
    
            auth:{
    
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })
    
        const mailOptions = {
    
            from: email,
            to: ownerEmail,
            subject: subject,
            text:message
        }

        try{

             const sendMail = await transporter.sendMail(mailOptions);

             if(sendMail){

                res.status(200).json({'message':'Message Sent to Traveller'})
             }
        }catch(error){

            res.status(400).json({'message':'Email Non-Existent'})
        }
    
       


}



/**Add a single Gallery image */
const galleryImage = async(req, res)=>{

    const image = req.file.filename;
    const place_id = req.params.id;
    const user_id = req.user._id


    try{

        const gallery = await Gallery.create({place_id, image, user_id});
        res.status(200).json({'message':'Image Added', gallery});

   }catch(error){

       res.status(400).json({error:error.message});

       console.log(error.message)
   }
    

}

/**Fetch Gallery Image */

const fetchGallery = async(req, res)=>{

    const place_id = req.params.id;

    console.log("Your place id:", place_id)

    try{

        const gallery = await Gallery.find({place_id:place_id})

        res.status(200).json(gallery)

    }catch(error){

        res.status(400).json(error);
    }

    
}

/**Delete Gallery Image */
const deleteGallery = async(req, res)=>{

    const place_id = req.params.id;

    try{

        const gallery = await Gallery.findOneAndDelete({_id:place_id})

        if(gallery){

            res.status(200).json(gallery)
        }

    }catch(error){

        res.status(400).json(error)

    }
}



/**Add a single place */
const newPlace = async(req, res) => {


   const image = req.file.filename

   const user_id = req.user._id

   const {title, wdate, wtype, location_lat, location_lng, description} = req.body;

   

    try{

         const place = await Place.create({title, wdate, wtype, image, user_id, location_lat, location_lng, description});
         res.status(200).json(place);

    }catch(error){

        res.status(400).json({error:error.message});

        console.log(error.message)
    }
   
}

/**Add a single comment */
const postComment = async(req, res) => {

    const user_id = req.user._id;
    const {comment, postId} = req.body;

    try{

        const name = await User.findById(user_id).select('name -_id');
      
        const postComment = await Comment.create({user_id, comment, postId, name:name.name});

        if(postComment){

            res.status(200).json({'message':'Comment Added', postComment}) 
        }
        

    }catch(error){

        res.status(400).json({error})
    }


   
}

/**Get comments */
const getComment =  async(req, res)=>{

    const {id} = req.params;

    try{

        const comments = await Comment.find({postId : id})

        if(comments){

            res.status(200).json({comments})

          
        }

    }catch(error){

        res.status(400).json({error})
    }

   
}

const destroyComment = async(req, res)=>{

   const {id} = req.params;//commentId
   const user_id = req.user._id;

   const comDel = await Comment.findOne({_id:id}).select('user_id');

   if(comDel.user_id == user_id){

       if(!mongoose.Types.ObjectId.isValid(id)){

        return res.status(404).json({error: 'Invalid mongoId'});
        }

        const comments = await Comment.findOneAndDelete({_id: id});
        const reply = await Reply.deleteMany({commentId: id});

        if(comments && reply){

            const message = "Comment Deleted";
           res.status(200).json({message, comments})
        }
        
   }else{

   
          const message = "Invalid Auth";
          res.status(400).json({message})
        
   }

   
}

/**Post Reply */
const replyComment = async(req, res)=>{

    const {commentId, content} = req.body;
    const user_id = req.user._id;
   

    try{
        
        const name = await User.findById(user_id).select('name -_id');
        const reply = await Reply.create({commentId, content, user_id, name:name.name});

        if(reply){

            await Comment.findByIdAndUpdate(commentId, {$push: {replies: reply._id} });
            const message = "Reply Posted";
            res.status(200).json({message, reply})
        }

    }catch(error){

        res.status(400).json({error});
    }
    

   


   

}


/**Get reply */
const getReply =  async(req, res)=>{

    const {id} = req.params;

    try{

        const reply = await Reply.find({commentId : id})

        if(reply){

            res.status(200).json({reply})

          
        }

    }catch(error){

        res.status(400).json({error})
    }

   
}

/**Delete reply */
const destroyReply = async(req, res)=>{

    const {id} = req.params;//ReplyId
    const user_id = req.user._id;
 
    const repDel = await Reply.findOne({_id:id}).select('user_id');
 
    if(repDel.user_id == user_id){
 
        if(!mongoose.Types.ObjectId.isValid(id)){
 
         return res.status(404).json({error: 'Invalid mongoId'});
         }
 
         const reply = await Reply.findOneAndDelete({_id: id});
 
         if(reply){
 
             const message = "Reply Deleted";
            res.status(200).json({message, reply})
         }
         
    }else{
 
    
           const message = "Invalid Auth";
           res.status(400).json({message})
         
    }
}

/**Like a post */
const likePost = async(req, res) => {

    const user_id = req.user._id;
    const {postId} = req.body
    const placeId = await Place.findById(postId);

    const unique = placeId.likes.some(likeid => likeid == user_id)
    if(!unique){

        try{
        
            const place = await Place.findByIdAndUpdate(postId, {
                
                $push:{likes:user_id},  $pull:{dislikes:user_id}
            }, {new: true})

            const likesCount = place.likes.length
            const dislikesCount = place.dislikes.length


                const placeArray = {'_id':place._id, 'title': place.title,'wdate': place.wdate, 'wtype':place.wtype,'image': place.image,
                    'likes':place.likes, 'dislikes':place.dislikes, 'likesCount':likesCount, 'dislikesCount':dislikesCount, 'location_lat':place.location_lat,
                'location_lng':place.location_lng}  

                // console.log(workoutArray)    
                    
                res.status(200).json({"message":'Post liked','placeArray':placeArray})

                

            

        }catch(error){

            res.status(400).json({error:error.message});

        }

    }else{

        const likesCount = placeId.likes.length
        const dislikesCount = placeId.dislikes.length
        const placeArray = {'_id':placeId._id, 'title': placeId.title,'wdate': placeId.wdate, 'wtype':placeId.wtype,'image': placeId.image,
        'likes':placeId.likes, 'dislikes':placeId.dislikes, 'likesCount':likesCount, 'dislikesCount':dislikesCount, 'location_lat':placeId.location_lat,
        'location_lng':placeId.location_lng} 

        res.status(200).json({"message":'Already Liked','placeArray':placeArray})

    }

}

/**Dislike Post */
const dislikePost = async(req, res) => {

    const user_id = req.user._id;
    const {postId} = req.body
    const placeId = await Place.findById(postId);

    const unique = placeId.dislikes.some(likeid => likeid == user_id)

    if(!unique){

        try{
        
        const place = await Place.findByIdAndUpdate(postId, {
            
            $pull:{likes:user_id},  $push:{dislikes:user_id}
        }, {new: true}) 
        

        const likesCount = place.likes.length
        const dislikesCount = place.dislikes.length


        const placeArray = {'_id':place._id, 'title': place.title,'wdate': place.wdate, 'wtype':place.wtype,'image': place.image,
        'likes':place.likes, 'dislikes':place.dislikes, 'likesCount':likesCount, 'dislikesCount':dislikesCount, 'location_lat':place.location_lat,
        'location_lng':place.location_lng}

        res.status(200).json({"message":'Post Disliked','placeArray':placeArray})

        }catch(error){

            res.status(400).json({error:error.message});

        }
    }else{

        const likesCount = placeId.likes.length
        const dislikesCount = placeId.dislikes.length
        const placeArray = {'_id':placeId._id, 'title': placeId.title,'wdate': placeId.wdate, 'wtype':placeId.wtype,'image': placeId.image,
        'likes':placeId.likes, 'dislikes':placeId.dislikes, 'likesCount':likesCount, 'dislikesCount':dislikesCount, 'location_lat':placeId.location_lat,
        'location_lng':placeId.location_lng}  
        
        res.status(200).json({"message":'Already Disliked','placeArray':placeArray})
    }
    
   
}

/**Get total reaction */

const totalReactions = async(req, res)=>{

   const user_id = await req.user._id;
   const objectString = `${user_id}`

   await Place.aggregate([

    {
        $match: { user_id: objectString }
    },
   
    {
      $project: {

        totalLikes: { $size: { $ifNull: ["$likes", []] } },
        totalDislikes: { $size: { $ifNull: ["$dislikes", []] } }

      }
    },
    {
        $group: {
          _id: null, 
          totalLikeslength: { $sum: "$totalLikes" },  
          totalDislikeslength: { $sum: "$totalDislikes" }  
        }
      },

      {
        $project: {
          _id: 0,  
           totalLikeslength:1,
           totalDislikeslength:1,

        }
      }  


  ])
    .then(results => {
        res.status(200).json(results);
        console.log(results)

    })
    .catch(err => {
      console.error(err);
    });



   
}

/**Count Types */
const totalTypes = async(req, res)=>{

    const user_id = req.user._id;

        const vacation = await Place.countDocuments({['wtype']: 'vacation'})
        const restaurant = await Place.countDocuments({['wtype']: 'restaurant'})
        const hiking = await Place.countDocuments({['wtype']: 'hiking'})

        const arrayData = [];

        arrayData.push(vacation, restaurant, hiking)

       

            res.status(200).json({arrayData})
            console.log(arrayData)
        
  
    
}


/**Place view by id */
const viewplace = async(req, res)=>{

   const {id} = req.params;
   const objectId = new mongoose.Types.ObjectId(id);

   console.log('paramsid',id)

   await Place.aggregate([

    {
        $match: { _id: objectId }
    },
       
    {
      $project: {
        _id: 1,
        title: 1,
        wdate:1,
        wtype:1,
        image:1,
        likes:1,
        dislikes:1,
        user_id:1,
        location_lat:1,
        location_lng:1,
        description:1,
        likesCount: { $size: { $ifNull: ["$likes", []] } },
        dislikesCount: { $size: { $ifNull: ["$dislikes", []] } },

      }
    }
  ])
    .then(results => {
        
        res.status(200).json(results);
        //console.log('Your ressults',results)

    })
    .catch(err => {
      console.error(err);
    });


}


/**All places by user */
const userPlace = async(req, res) => {

    const user_id = await req.user._id;
    const objectString = `${user_id}`
    
    await Place.aggregate([
       
        {
          $project: {
            _id: 1,
            title: 1,
            wdate:1,
            wtype:1,
            image:1,
            likes:1,
            dislikes:1,
            user_id:1,
            location_lat:1,
            location_lng:1,
            description:1,
            likesCount: { $size: { $ifNull: ["$likes", []] } },
            dislikesCount: { $size: { $ifNull: ["$dislikes", []] } },

          }
        },

        {
            $match: { user_id: objectString }

        }
      ])
        .then(results => {
            res.status(200).json(results);
            console.log(results)

        })
        .catch(err => {
          console.error(err);
        });

   
}



/**Grab single place for Edit */
const findPlace = async(req, res)=>{

    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){

        return res.status(404).json({error: 'Invalid mongoId'});
    }

    const place = await Place.findById(id);

    if(!place){

        return res.status(404).json({error:'No such place found'});
    }

    return res.status(200).json(place);


}

/**location list */

const locationList = async(req, res)=>{

    await Place.aggregate([
        {
          $group: {
            
            _id: "$location",
           
            
          }
        },
        {
            $sort:{_id: -1}
        }
      ])
        .then(results => {
            res.status(200).json(results);

        })
        .catch(err => {
          console.error(err);
        });


}


/**Delete a workout */
const deletePlace = async(req, res)=>{

    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){

        return res.status(404).error({error: 'Invalid mongoose Id'})
    }

    const {image} = await Place.findOne({_id: id}).select('image');
   
    const place = await Place.findOneAndDelete({_id: id});
    

    if(!place){

    res.status(400).json({error: 'No such Rercord Found'});

    return

    }


    fs.unlink(`./uploads/${image}`, (error)=>{

        console.log(error)
        return
    })
    

    

    res.status(200).json(place);
}


/**Update a workout */
const updatePlace = async(req, res)=>{

    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){

        res.status(404).error({error: "Invalid mongoose Id"});
    }

    const {title, wdate, wtype, oldimage, location_lat, location_lng, description} = req.body

    //if there is no new image file for edit
    if(!req.file){

        const place = await Place.findOneAndUpdate({_id: id}, {title, wdate, wtype, location_lat, location_lng, description});

        if(!place){

            return res.status(400).json({error: 'Update unsuccessfull'});
            }   

        return res.status(200).json(place);
    }

    //if there is new image file for edit
    if(req.file){

        const image = req.file.filename

        const place = await Place.findOneAndUpdate({_id: id}, {title, wdate, wtype, image});

        fs.unlink(`./uploads/${oldimage}`, (error)=>{

                 console.log(error)
               
             })

          if(!place){

         return res.status(400).json({error: 'Update unsuccessfull'});
         }   

         return res.status(200).json(place);
    }




}


const downloadImage = async(req, res) =>{


    const fileName = req.params.filename
    const filePath = path.join(__dirname, '../uploads', fileName)

    try{

        if(fs.existsSync(filePath)){

            res.sendFile(filePath)
           
        }else{

            res.status(404).send('File not found')
        }

    }catch(error){

        console.log(error)
    }

    
}


module.exports = {

    newPlace,
    userPlace,
    homePlace,
    findPlace,
    deletePlace,
    updatePlace,
    downloadImage,
    likePost,
    dislikePost,
    totalReactions,
    postComment,
    getComment,
    destroyComment,
    replyComment,
    getReply,
    destroyReply,
    totalTypes,
    locationList,
    viewplace,
    galleryImage,
    fetchGallery,
    deleteGallery,
    mailOwner
}