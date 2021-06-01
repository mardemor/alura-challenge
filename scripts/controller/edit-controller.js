import { Project } from '../model/project.js';
import { ProjectStorage } from '../storage/project-storage.js';

export class EditController {

    constructor() {

        this.projectId = 0;
        this.storage = new ProjectStorage();

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
        this.snapShotButton = $('#snapShotButton');
        this.downloadButton = $('#downloadButton');

        this._setEventListeners();
        this._setProject();
    }

    /**
     * Private method. Set all event listeners once.
     */
    _setEventListeners() {

        this.colorInput.addEventListener('change', this.setCodeContainerBgColor.bind(this));
        this.languageSelect.addEventListener('change', this.changeLanguage.bind(this));
        this.highlightButton.addEventListener('click', this.highlightCode.bind(this));
        this.saveButton.addEventListener('click', this.saveProject.bind(this));
        this.snapShotButton.addEventListener('click', this.takeCodeSnapShot.bind(this));
        this.downloadButton.addEventListener('click', this.downloadCode.bind(this));
    }

    /**
     * Private method. Load project data from the url sent by comunity-controller.
     */
    _setProject() {

        const url = new URL(window.location);
        this.projectId = url.searchParams.get('id') || 0;

        if (this.projectId > 0) {
            const project = this.storage.getById(this.projectId);
            this.projectTitle.value = project.title;
            this.projectDescription.value = project.description;
            this.languageSelect.value = project.language;
            this.colorInput.value = project.color;
            this.codeComponent.style['background-color'] = project.color;
            this.codeContent.innerText = project.code;
        }      
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
        project.id = this.projectId;

        if (project.id == 0) {
            this.storage.add(project);
        }
        else {
            this.storage.update(project);
        }

        this._resetForm();
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

    /**
     * Take a snapshot from code component, generate and download the 
     * image as a png file.
     */
    takeCodeSnapShot() {
        this.snapShotButton.style.visibility = 'hidden';
        this.downloadButton.style.visibility = 'hidden';
        window.scrollTo(0, 0);
        html2canvas(this.codeComponent).then(
            function (canvas) {
                var imgageData = canvas.toDataURL("image/png");
                var newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream");
                const linke = document.createElement('a');
                linke.setAttribute('download', 'code.png');
                linke.setAttribute('href', newData);
                linke.click();            
            }
        );
        this.snapShotButton.style.visibility = 'visible';
        this.downloadButton.style.visibility = 'visible';
    }

    /**
     * Generate and download a html, js or css file with the code content.
     */
    downloadCode() {
        const extension = this.languageSelect.options[this.languageSelect.selectedIndex].dataset.extension;
        const fileName = 'code.' + extension;
        const encodedContent = encodeURIComponent(this.codeContent.innerText);
        const linke = document.createElement('a');
        linke.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodedContent);
        linke.setAttribute('download', fileName);
        linke.click();
    }
}

const editController = new EditController();

