import { Schema, model } from "mongoose";

const pointSchema =  Schema({
    busId:                   String,
    latitude:                Number,
    longitude:               Number,
    date:                    String,
},
{
    timestamps: false
});
export default model('Point', pointSchema);