import { Schema, model } from "mongoose";

const stopSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    latitude:{
        type        : Number,
        required    : true
    },

    longitude:{
        type        : Number,
        required    : true
    },

    waiting:  {
        type: Number,
        default: 0,
    },
    
},
{
    timestamps: true
});

export default model('Stop', stopSchema);
