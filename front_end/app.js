const form = document.getElementById('projectForm');
const projectList = document.getElementById('projectList');

const API_URL = 'http://localhost:3000/api/projects';

// Load all projects
async function loadprojects() {
    const res = await fetch(API_URL);
    const projects = await res.json();
    projectList.innerHTML = '';

    projects.forEach(project => {
        const li = document.createElement('li');
        li.textContent = `Project_Name: ${project.name}-- Description: ${project.description} -- Status: ${project.status} `;


        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.style.marginLeft = '10px';
        editBtn.addEventListener('click', () => editProject(project));

        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.marginLeft = '5px';
        deleteBtn.addEventListener('click', () => deleteProject(project.id));

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        projectList.appendChild(li);
    });
}

// Add new project
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('projectName').value;
    const description = document.getElementById('projectDescription').value;
    const status = document.getElementById('projectStatus').value;

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, status })
    });

    form.reset();
    loadprojects();
});

// Delete project
async function deleteProject(id) {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    loadprojects();
}

// Edit project
async function editProject(project) {
    const newName = prompt('Enter new name', project.name);
    const newDescription = prompt('Enter new description', project.description);
    const newStatus = prompt('Enter new status', project.status);

    if (newName && newDescription && newStatus) {
        await fetch(`${API_URL}/${project.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: newName,
                description: newDescription,
                status: newStatus
            })
        });
        loadprojects();
    }
}

loadprojects();
