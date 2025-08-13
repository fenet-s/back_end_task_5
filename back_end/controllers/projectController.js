const projectService=require('../services/projectService')
 const getAll=(req,res)=>{
    const result=projectService.getAllProjects();
    res.json(result);
 };

 const getOne=(req,res)=>{
    const id=parseInt(req.params.id);
    const project=projectService.getProjectById(id);
    if(!project) return res.status(404).json({message:'Project not found'});
    res.json(project)
 }

 const create=(req,res)=>{
    const{name,description,status}=req.body;
    if(!name || !description || !status) return res.status(400).json({message:'missing full info'});
    const newProject=projectService.addProject(name,description,status);
    res.status(201).json(newProject);
 };
 const remove=(req,res)=>{
    const id=parseInt(req.params.id);
    const deleted=projectService.deleteProject(id);
    if(!deleted) return res.status(404).json({message:'Project not found'});
    res.json({message:'Project deleted'});
}
const update=(req,res)=>{
    const id=parseInt(req.params.id);
    const updated=projectService.updateProject(id,req.body);
    if(!updated) return res.status(404).json({message:'Project not found'});
    res.json({message:'updated', project:updated})
}
module.exports={
    getAll,
    getOne,
    create,
    remove,
    update,

}