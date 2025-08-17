const Project = require('../models/ProjectModel');
async function getAllProjects() {
    return  await Project.find()
};
async function getProjectById(id) {
    return await Project.findById(id)
    
} 
async function addProject(name,description,status) {
    
        const newProject = new Project({ name, description, status });
        return await newProject.save();
    
};
async function deleteProject(id) {
    const deleted = await Project.findByIdAndDelete(id);
    return deleted;
} 
async function updateProject(id,project) {
    const updated = await Project.findByIdAndUpdate(id, project, { new: true });
    return updated;
}
module.exports={
    getAllProjects,
    getProjectById,
    addProject,
    deleteProject,
    updateProject,
};
