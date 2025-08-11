
const form = document.getElementById('projectForm');
const projectList=document.getElementById('projectList');

const API_URL = 'http://localhost:3000/api/projects';

async function loadprojects() {
    const res = await fetch(API_URL);
    const projects = await res.json()
    projectList.innerHTML=''
    projects.forEach(project =>{
        const li =document.createElement('li');
        li.textContent =`Project_Name: ${project.name}--Description: ${project.description} --Status: ${project.status}`;
        projectList.appendChild(li);
    });
    
}
 form.addEventListener('submit', async(e)=>{
    e.preventDefault();
    const name = document.getElementById('projectName').value;
    const description=document.getElementById('projectDescription').value;
    const status= document.getElementById('projectStatus').value;

    await fetch(API_URL, {
        method:'POST',
        headers:{'Content-Type' : 'application/json'},
        body:JSON.stringify({name,description, status})
    })
    form.reset();
    loadprojects();

 })
 loadprojects();