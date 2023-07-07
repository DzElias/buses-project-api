import { Schema, model } from "mongoose";

const   driverSchema =  Schema({
    busId:                  String,
    ci:                     String,
    name:                   String,
    password:               String,
    token: String
},

{
    timestamps: false,
    versionKey: false
});

export default model('Driver', driverSchema);