import { Project } from '../model/project.js';
import { ProjectStorage } from '../storage/project-storage.js';

export class IndexController {

    constructor() {
        this.storage = new ProjectStorage();
        this.sampleList = this._createSampleList();
    }

    _createSampleList() {

        const list = [];

        const p1 = new Project(
            'Projeto Javascript',
            'Esta é a descrição do meu projeto.',
            'Harry',
            `function teste() { alert('Hello!'); }`,
            'javascript',
            'lightblue'
        );

        const p2 = new Project(
            'Projeto CSS',
            'Esta é a descrição do meu projeto.',
            'Harry',
            `.classe { color: #FF0000; }`,
            'css',
            'salmon'
        );

        const p3 = new Project(
            'Projeto HTML',
            'Esta é a descrição do meu projeto.',
            'Harry',
            `<span class="bold">Hello !</span>`,
            'html',
            'lightgreen'
        );

        list.push(p1);
        list.push(p2);
        list.push(p3);

        return list;
    }

    persistSampleList() {

        if (this.storage.isEmpty()) {
            this.sampleList.forEach(item => {
                this.storage.add(item);
            });
        }
    }
}

const indexController = new IndexController();
indexController.persistSampleList();
console.log(indexController.storage.list());