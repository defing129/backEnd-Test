import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
        nickname: {
        type: String,
        required: true,
    },
        real_name: {
        type: String,
        required: true,
        unique: true,
    },
        origin_description: {
            type: String,
            required: true,
    },
        superpowers: {
            type: String,
            required: true,
    },
        catch_phrase: {
            type: String,
            required: true,
    },

    imageUrl: String,
},
    {
    timestamps: true,
},
);


export  default  mongoose.model('Post', PostSchema)