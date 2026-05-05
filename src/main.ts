import { getPortProjects, type SanitizedRepo } from "snapport";
import { renderComponent } from "./utils";
import { Wrapper } from "./components/sessionStacks/Wrapper";

const projectsList = document.querySelector(".projects-list")!;
const projectName = document.getElementById("project-name")!;
const projectDescription = document.getElementById("project-description")!;
const projectImage = document.getElementById("project-image") as HTMLImageElement;
const imageContainer = document.getElementById("image-container")!;
 
let selectedProject: Element | null = null;

async function init() {
    try {
        const projects = await getPortProjects("guilhermegodoydev", "port-project");

        if (projects && projects.length > 0) {
            projectsList.innerHTML = "";
            imageContainer.classList.remove("loading");
            renderProjects(projects);
        } else {
            handleError();
        }
    } catch (error) {
        handleError();
    }
}

function handleError() {
    projectName.textContent = "Não foi possível carregar o projeto";
    projectsList.innerHTML = "<li>Erro ao carregar lista de projetos</li>";
    projectDescription.textContent = "Não foi possível carregar a descrição do projeto";
    imageContainer.classList.remove("loading");
    
    const message = document.createElement("p");
    message.textContent = "Nenhuma visualização disponível";
    imageContainer.appendChild(message);
}

function updateProjectDisplay(project: SanitizedRepo) {
    const formattedName = project.name.charAt(0).toUpperCase() + project.name.slice(1);
    
    projectName.textContent = formattedName;
    projectName.setAttribute("title", project.name);
    projectDescription.textContent = project.description || "Nenhuma descrição disponível para este projeto.";
    
    projectImage.src = `src/assets/projects/${project.name}.webp`;
    projectImage.alt = `Thumbnail do projeto ${project.name}`;
    
    projectImage.onerror = () => {
        projectImage.src = "src/assets/projects/default.webp";
    };
}

function renderProjects(projects: SanitizedRepo[]) {
    projects.forEach((project, index) => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.id = String(project.id);

        const spanName = document.createElement("span");
        spanName.className = "span-name";
        spanName.textContent = project.name.charAt(0).toUpperCase() + project.name.slice(1);
        spanName.setAttribute("title", project.name);

        const spanDots = document.createElement("span");
        spanDots.className = "pontos";
        spanDots.setAttribute("aria-hidden", "true");

        const spanNumber = document.createElement("span");
        spanNumber.className = "numero";
        spanNumber.textContent = String(index + 1).padStart(2, "0");
        spanDots.setAttribute("aria-hidden", "true");

        btn.append(spanName, spanDots, spanNumber);
        
        btn.addEventListener('click', () => {
            selectedProject?.classList.remove("selected-project");
            selectedProject = btn;
            selectedProject.classList.add("selected-project");
            updateProjectDisplay(project);
        });

        li.appendChild(btn);
        projectsList.appendChild(li);
    });

    const firstButton = projectsList.querySelector("button");
    if (firstButton) firstButton.click();
}

init();

function setMobileVersion() {
    const projectDisplay = document.querySelector(".project-display")!;
    const containerDescriptionProject = document.querySelector(".description-box")!;
    const originalContainer = document.querySelector(".projects-sidebar")!;

    if (window.innerWidth < 768) {
        projectDisplay.appendChild(containerDescriptionProject);
    } else {
        originalContainer.appendChild(containerDescriptionProject);
    }
}

window.addEventListener('resize', () => {
    renderComponent('#stacks', () => Wrapper());
    setMobileVersion();
});
window.addEventListener('DOMContentLoaded', () => {
    renderComponent('#stacks', () => Wrapper());
    setMobileVersion();
});