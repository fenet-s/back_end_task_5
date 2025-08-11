const express = require('express');
const cors=require('cors');
const {port,appName}=require('./config/env');
const projectRoutes=require('./routes/projectRoute')

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

app.listen(port,()=>{
        console.log(`${appName} is running at http://localhost:${port}`);
});

module.exports = app;