let projects=require('../data/projectsData');
const getAllProjects=()=>projects;
const getProjectById=(id)=>projects.find(s=>s.id===id);
const addProject=(name,description,status)=>{
    const newProject={
        id:projects.length +1,
        name,
        description,
        status
    };
    projects.push(newProject)
    return newProject;
};
const deleteProject=(id)=>{
    const initialLength=projects.length;
    projects=projects.filter(s=>s.id!==id);
    return projects.length<initialLength;
};
const updateProject=(id,project)=>{
    const to_be_updated_project=projects.findIndex(p => p.id ===id);
    if (to_be_updated_project===-1)
    return null;
    projects[to_be_updated_project] = {...projects[to_be_updated_project], ...project};
    return projects[to_be_updated_project];
}
module.exports={
    getAllProjects,
    getProjectById,
    addProject,
    deleteProject,
    updateProject,
};
