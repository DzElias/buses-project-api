import { Schema, model } from "mongoose";

const waitSchema =  Schema({
    stopId:                  String,
    date:                    String,
},
{
    timestamps: false
});
export default model('Wait', waitSchema);