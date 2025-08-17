const form = document.getElementById('projectForm');
const projectList = document.getElementById('projectList');
const API_URL = 'http://localhost:3000/api/projects';

// Load all projects
async function loadprojects() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Failed to fetch projects');
        const projects = await res.json();
        projectList.innerHTML = '';

        projects.forEach(project => {
            const li = document.createElement('li');
            li.textContent = `Project_Name: ${project.name} -- Description: ${project.description} -- Status: ${project.status}`;

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.style.marginLeft = '10px';
            editBtn.addEventListener('click', () => editProject(project));

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.style.marginLeft = '5px';
            deleteBtn.addEventListener('click', () => deleteProject(project._id));

            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
            projectList.appendChild(li);
        });
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

// Add new project
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('projectName').value;
    const description = document.getElementById('projectDescription').value;
    const status = document.getElementById('projectStatus').value;

    if (!name || !description || !status) {
        alert('Please fill all fields');
        return;
    }

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, description, status })
        });

        if (!res.ok) throw new Error('Failed to add project');

        form.reset();
        loadprojects();
    } catch (error) {
        console.error('Error adding project:', error);
    }
});

// Delete project
async function deleteProject(_id) {
    try {
        const res = await fetch(`${API_URL}/${_id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete project');
        loadprojects();
    } catch (error) {
        console.error('Error deleting project:', error);
    }
}

// Edit project
async function editProject(project) {
    const newName = prompt('Enter new name', project.name);
    const newDescription = prompt('Enter new description', project.description);
    const newStatus = prompt('Enter new status', project.status);

    if (newName && newDescription && newStatus) {
        try {
            const res = await fetch(`${API_URL}/${project._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newName,
                    description: newDescription,
                    status: newStatus
                })
            });
            if (!res.ok) throw new Error('Failed to update project');
            loadprojects();
        } catch (error) {
            console.error('Error updating project:', error);
        }
    }
}

loadprojects();
