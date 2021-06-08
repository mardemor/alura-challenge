import { ProjectStorage } from '../storage/project-storage.js';

export class ComunityController {

    constructor() {
        this.projectsContainer = document.querySelector('#projectsContainer');
        this._storage = new ProjectStorage();
        this._projects = this._storage.list();

        this._showProjectsView();
    }

    /**
     * Public method, shows a project list from storage. 
     */
    _showProjectsView() {

        this._projects.forEach(project => {

            const template = this._getProjectTemplate(project);
            const element = this._createProjectCardElement(template, project);
            this.projectsContainer.appendChild(element);
        });
    }

    /** 
     * Private method, returns a project template without the "codeContent" element.
     * */
    _getProjectTemplate(project) {

        return `
<div class="project-snapshot">
    <div class="code-component" id="codeComponent" style="background-color: ${project.color}">
        <div class="code-subcontainer">
            <div class="code-subcontainer-header">
                <ul class="mac-buttons-component" aria-hidden="true">
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <div class="code-buttons">
                </div>
            </div>
            <div id="codeWrapper">
            </div>
        </div>
    </div>
</div>
<div class="project-details">
    <h3 class="project-title">${project.title}</h3>
    <p class="project-description">${project.description}</p>
    <div class="project-footer">
        <div class="project-interaction">
            <div class="action-button">
                <i class="fas fa-heart icon"></i>
                <div class="project-likes">${project.likes}</div>
            </div>
            <div class="action-button">
                <i class="fas fa-comment icon"></i>
                <div class="project-comments">${project.comments}</div>
            </div>
        </div>
        <figure class="user-button ub-small">
            <img class="user-photo up-small" src="./images/photo-profile.jpg" alt="">
            <figcaption class="user-name">@${project.author}</figcaption>
        </figure>
    </div>
</div>
        `;
    }

    /**
     * Receives a template string and a project item from storage. Creates an HtmlElement. 
     * This element is a "projectCard" that receive all project data and the highlighted 
     * code. 
     */
    _createProjectCardElement(template, project) {

        const element = document.createElement('a');
        element.classList.add('project-card');
        element.setAttribute('href', './edit-view.html?id=' + project.id);
        element.setAttribute('aria-label', 'Clique para editar ' + project.title)
        element.innerHTML = template;
        const codeWrapper = element.querySelector('#codeWrapper');
        codeWrapper.innerHTML = `<code class="code-content cc-small hljs ${project.language}" id="codeContent" contenteditable="false"></code>`;
        codeWrapper.firstChild.innerText = project.code;
        hljs.highlightElement(codeWrapper.firstChild);

        return element;
    }
}

const comunityController = new ComunityController();