import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
    school:{
        type: String,
        default :''
    },
    degree:{
        type: String,
        default :'',
    },
    fieldofStudy:{
        type:String,
        default :'',
    },
});

const workSchema = new mongoose.Schema({
    comapny :{
        type:String ,
        default :'',
    },
    position: {
        type:String,
        default :'',
    },
    years:{
        type:String, 
        default :''
    },

});

const ProfileSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    bio:{
        type:String,
        default :'',

    },
    currentPost: {
        type:String,
        default :'',

    },
    pastwork:{
        type: [workSchema],
        default:[],
    },
    eduacation: {
        type:[educationSchema],
        default:[],
    }
});

const Profile = mongoose.model('Profile',ProfileSchema);

export default Profile;