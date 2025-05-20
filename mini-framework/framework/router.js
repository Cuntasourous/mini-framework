// framework/router.js

class Router {
    constructor() {
        this.routes = new Map();
        this.currentRoute = null;
        
        window.addEventListener('popstate', () => this.handleRoute());
    }

    addRoute(path, component) {
        this.routes.set(path, component);
    }

    navigate(path) {
        history.pushState(null, '', path);
        this.handleRoute();
    }

    handleRoute() {
        const path = window.location.pathname;
        const component = this.routes.get(path) || this.routes.get('/404');
        
        if (component) {
            const rootElement = document.getElementById('app');
            rootElement.innerHTML = '';
            MF.mount(component, rootElement);
        }
    }
}