const fetchLanguages = async () => {
  const response = await fetch('/api/v1/languages');
  return response.json();
};

const fetchProjects = async (lang) => {
  const response = await fetch(`/api/v1/projects?lang=${lang}`);
  return response.json();
};

const fetchProject = async (id, lang) => {
  const response = await fetch(`/api/v1/projects/${id}?lang=${lang}`);
  return response.json();
};

document.addEventListener('DOMContentLoaded', async () => {
  let selectedLang;
  const languageSelectElement = document.getElementById('language-select');
  
  const languages = await fetchLanguages();
  
  languages.forEach((language) => {
    const languageOption = document.createElement('option');
    languageOption.value = language;
    languageOption.textContent = language;
    languageSelectElement.appendChild(languageOption);
  });

  languageSelectElement.addEventListener('change', async (event) => {
    selectedLang = event.target.value;
    const projectsListElement = document.getElementById('projects-list');
    const projectPanelElement = document.getElementById('project-panel');
    projectsListElement.replaceChildren();
    projectPanelElement.replaceChildren();

    const projects = await fetchProjects(selectedLang);
  
    projects.forEach((project) => {
      const projectItem = document.createElement('li');
      projectItem.textContent = project.title;
      projectItem.dataset.pnId = project.id;
      projectsListElement.appendChild(projectItem);

      projectItem.addEventListener('click', async (event) => {
        const selectedProject = document.querySelector('.selected');
        selectedProject?.classList.remove('selected');
        event.target.classList.add('selected');

        const project = await fetchProject(event.target.dataset.pnId, selectedLang);
        
        projectPanelElement.replaceChildren();
        const projectTitle = document.createElement('h2');
        projectTitle.textContent = project.title;
        const projectDescription = document.createElement('p');
        projectDescription.textContent = project.description;
        projectPanelElement.appendChild(projectTitle);
        projectPanelElement.appendChild(projectDescription);
      });
    });
  });
});