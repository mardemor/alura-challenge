export class ProjectStorage {

    storageId = 'projects';

    constructor() {
        if (!this.exists()) {
            const projects = [];
            this._set(projects);
        }
    }

    list() {
        return JSON.parse(sessionStorage.getItem(this.storageId));
    }

    exists() {
        return !!sessionStorage.getItem(this.storageId);
    }

    isEmpty() {
        return !JSON.parse(sessionStorage.getItem(this.storageId)).length;
    }

    add(project) {
        project.id = this.lastIndex() + 1;
        const projects = this.list();
        projects.push(project);
        this._set(projects);
    }

    update(project) {
        const projects = this.list();
        projects.forEach((item, index) => {
            if(item.id == project.id) {
                projects[index] = project;
            }
        });
        this._set(projects);        
    }

    lastIndex() {
        return JSON.parse(sessionStorage.getItem(this.storageId)).length;
    }

    getById(id) {
        const projects = this.list();
        return projects.filter((project) => {
            return project.id == id;
        })[0];
    }

    _set(projects) {
        sessionStorage.setItem(this.storageId, JSON.stringify(projects));
    }
}