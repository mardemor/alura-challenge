import { Project } from '../model/project.js';
import { ProjectStorage } from '../storage/project-storage.js';

export class IndexController {

    constructor() {
        this.storage = new ProjectStorage();
        this.sampleList = this._createSampleList();
        this._persistSampleList();
        console.log(this.storage.list());
    }

    _createSampleList() {

        const list = [];

        const p1 = new Project(
            'Projeto Javascript',
            'Esta é a descrição do meu projeto.',
            'Harry',
            `function teste() { alert('Hello!'); }`,
            'javascript',
            '#6BD1FF'
        );

        const p2 = new Project(
            'Projeto CSS',
            'Esta é a descrição do meu projeto.',
            'Harry',
            `.classe { color: #FF0000; }`,
            'css',
            '#FF6B6B'
        );

        const p3 = new Project(
            'Projeto HTML',
            'Esta é a descrição do meu projeto.',
            'Harry',
            `<span class="bold">Hello !</span>`,
            'html',
            '#6BFF90'
        );

        list.push(p1);
        list.push(p2);
        list.push(p3);

        return list;
    }

    _persistSampleList() {

        if (this.storage.isEmpty()) {
            this.sampleList.forEach(item => {
                this.storage.add(item);
            });
        }
    }
}

const indexController = new IndexController();