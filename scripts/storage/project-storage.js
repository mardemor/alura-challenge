export class ProjectStorage {

    storageId = 'projects';

    list() {
        return JSON.parse(sessionStorage.getItem(this.storageId));
    }

    _set(projects) {
        sessionStorage.setItem(this.storageId, JSON.stringify(projects));
    }

    add(project) {
        const projects = this.list() || [];
        projects.push(project);
        this._set(projects);
    }
    
    isEmpty() {
        return !this.list();
    }
}