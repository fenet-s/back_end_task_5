const express = require('express');
const cors=require('cors');
const {port,appName}=require('./config/env');
const projectRoutes=require('./routes/projectRoute')
const mongoose=require("mongoose")


const app = express();
//middleware
app.use(express.json());
app.use(cors());


//routes
app.use('/',projectRoutes);

//root route
app.get('/',(req,res)=>{
    res.send(`${appName} is running... `);
});
async function startServer() {
    try {
        mongoose.connect("mongodb://localhost:27017/projectmanagementdb");
            console.log("connected")
        app.listen(port,()=>{
        console.log(`${appName} is running at http://localhost:${port}`)})
        
    } catch (error) {
        console.error("❌ Server start failed:", error);

        
        
    }
    
}
startServer();


module.exports = app;