export class MenuController {

    constructor() {

        const $ = document.querySelector.bind(document);

        this.menuIcon = $('#headerMenuIcon');
        this.menuContainer = $('#menuContainer');
        this.searchIcon = $('#headerSearchIcon');        
        this.searchForm = $('#searchForm');

        this._setEventListeners();
    }

    /**
     * Private method. Set all event listeners once.
     */
    _setEventListeners() {

        this.menuIcon.addEventListener('click', this.toggleMenu.bind(this));
        this.searchIcon.addEventListener('click', this.toggleSearch.bind(this));        
    }

    /**
     * Alternate the exibition of the mobile/tablet menu.
     */
    toggleMenu() {

        if (this.menuContainer.classList.contains('show'))
            this.menuIcon.innerHTML = '<i class="fas fa-bars icon"></i>';
        else 
            this.menuIcon.innerHTML = '<i class="fas fa-times icon"></i>';

        this.menuContainer.classList.toggle('show');
    }

    /**
     * Alternate the exibition of the mobile search.
     */
    toggleSearch() {
        if (this.searchForm.classList.contains('show'))
            this.searchIcon.innerHTML = '<i class="fas fa-search icon"></i>';
        else 
            this.searchIcon.innerHTML = '<i class="fas fa-times icon"></i>';

        this.searchForm.classList.toggle('show');
    }
}

const menuController = new MenuController();