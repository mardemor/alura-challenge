import { Project } from '../model/project.js';
import { ProjectStorage } from '../storage/project-storage.js';

export class EditController {

    constructor() {

        const $ = document.querySelector.bind(document);

        this.colorInput = $('#colorPicker');
        this.languageSelect = $('#languageSelect');
        this.saveButton = $('#saveButton');
        this.projectTitle = $('#projectTitle');
        this.projectDescription = $('#projectDescription');
        this.codeComponent = $('#codeComponent');
        this.codeContent = $('#codeContent');
        this.codeWrapper = $('#codeWrapper');
        this.highlightButton = $('#highlightButton');

        this._setEventListeners();

        this.storage = new ProjectStorage();
    }

    /**
     * Private method. Set all event listeners once.
     */
    _setEventListeners() {

        this.colorInput.addEventListener('change', this.setCodeContainerBgColor.bind(this));
        this.languageSelect.addEventListener('change', this.changeLanguage.bind(this));
        this.highlightButton.addEventListener('click', this.highlightCode.bind(this));
        this.saveButton.addEventListener('click', this.saveProject.bind(this));
    }

    /**
     * Set the codeComponent's background color.
     */
    setCodeContainerBgColor() {

        this.codeComponent.style['background-color'] = this.colorInput.value;
    }

    /**
     * Highlight the code in codeContent element. 
     */
    highlightCode() {

        hljs.highlightElement(this.codeContent);
    }

    /**
     * Add a new content to codeWrapper container. The content includes the
     * "language" class attribute. 
     */
    changeLanguage() {

        const code = this.codeContent;
        this.codeWrapper.innerHTML = `<code class="code-content hljs ${this.languageSelect.value}" id="codeContent" contenteditable="true"></code>`;
        this.codeWrapper.firstChild.innerText = code.innerText;
        this.codeContent = this.codeWrapper.firstChild;
    }

    /**
     * Get the Project data from form. Persist the data to the browser 
     * session storage. 
     */
    saveProject() {

        const project = new Project(
            this.projectTitle.value,
            this.projectDescription.value,
            'Harry',
            this.codeContent.innerText,
            this.languageSelect.value,
            this.colorInput.value
        );
        console.log(project);

        this.storage.add(project);
        this._resetForm();

        console.log(this.storage.list());
    }

    /**
     * Private method. Reset all form fields with default values.
     */
    _resetForm() {

        this.projectTitle.value = '';
        this.projectDescription.value = '';
        this.languageSelect.selectedIndex = 0;
        this.colorInput.value = '#6BD1FF';
        this.codeComponent.style['background-color'] = '#6BD1FF';
        this.codeContent.innerText = '';
    }
}

const editController = new EditController();