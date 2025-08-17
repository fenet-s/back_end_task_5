const projectService=require('../services/projectService')
const mongoose = require("mongoose")

async function getAll(req,res) {
   try {
      const result=await projectService.getAllProjects();
    res.json(result);
      
   } catch (error) {
      res.status(500).json({message:"server error",error:error.message})
      
   }
  
   
} 
 async function getOne(req,res) {
   try {
      const id=req.params.id;
      const project=await projectService.getProjectById(id);
      if(!project) return res.status(404).json({message:'Project not found'});
      res.json(project)
      
   } catch (error) {
      res.status(500).json({message:"server error", error:error.message})
      
   }
 }
async function create(req,res) {
   try {
      const{name,description,status}=req.body;
      if(!name || !description || !status) return res.status(400).json({message:'missing full info'});
      const newProject=await projectService.addProject(name,description,status);
      res.status(201).json(newProject);
      
   } catch (error) {
      res.status(500).json({message:"server error", error:error.message})
      
   }

   
}
async function remove(req,res) {
   try {
      const id=req.params.id;
      const deleted=await projectService.deleteProject(id);
      if(!deleted) return res.status(404).json({message:'Project not found'});
      res.json({message:'Project deleted'});
      
   } catch (error) {
      res.status(500).json({message:"server error", error:error.message})

      
   }
   
}
async function update(req,res) {
   try {
      const id=req.params.id;
      const updated=await projectService.updateProject(id,req.body);
      if(!updated) return res.status(404).json({message:'Project not found'});
      res.json({message:'updated', project:updated})
      
   } catch (error) {
      res.status(500).json({message:"server error",error:error.message})
      
   }
      

   
}

module.exports={
    getAll,
    getOne,
    create,
    remove,
    update,

}