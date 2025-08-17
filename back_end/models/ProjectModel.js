// let projects=[
//     {id:1,name:"back_end",description:"this is my first back_end project",status:"ongoing"},
//     {id:2, name:"Front_end",description:"this is my  Front_end project",status:"completed"}
// ];
// module.exports=projects;
const mongoose = require("mongoose")

let projectSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        max:256,
        min:1,
    },
    description:{
        type:String,
        required:true,


    },
    status:{
        type:String,
        enum:["Not Started","In Progress","Completed"],
        required:true
    }
})
module.exports = mongoose.model("project",projectSchema)


