export class Project {

    constructor(
        title,
        description,
        author,
        code,
        language,
        color,
    ) {
        this.title = title;
        this.description = description;
        this.author = author;
        this.code = code;
        this.language = language;
        this.color = color;
        this.comments = 0;
        this.likes = 0;
    }
    
}