export class MenuController {

    constructor() {

        const $ = document.querySelector.bind(document);

        this.menuButton = $('#headerMenuButton');
        this.menuContainer = $('#menuContainer');
        this.searchButton = $('#headerSearchButton');        
        this.searchForm = $('#searchForm');

        this._setEventListeners();
    }

    /**
     * Private method. Set all event listeners once.
     */
    _setEventListeners() {

        this.menuButton.addEventListener('click', this.toggleMenu.bind(this));
        this.searchButton.addEventListener('click', this.toggleSearch.bind(this));        
    }

    /**
     * Alternate the exibition of the mobile/tablet menu.
     */
    toggleMenu() {

        if (this.menuContainer.classList.contains('show'))
            this.menuButton.innerHTML = '<i class="fas fa-bars icon"></i>';
        else 
            this.menuButton.innerHTML = '<i class="fas fa-times icon"></i>';

        this.menuContainer.classList.toggle('show');
    }

    /**
     * Alternate the exibition of the mobile search.
     */
    toggleSearch() {
        if (this.searchForm.classList.contains('show'))
            this.searchButton.innerHTML = '<i class="fas fa-search icon"></i>';
        else 
            this.searchButton.innerHTML = '<i class="fas fa-times icon"></i>';

        this.searchForm.classList.toggle('show');
    }
}

const menuController = new MenuController();