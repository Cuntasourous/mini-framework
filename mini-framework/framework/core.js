// framework/core.js

class MiniFramework {
    constructor() {
        this.state = new State();
        this.router = new Router();
        this.virtualDOM = new VirtualDOM();
    }

    // Create a new element
    createElement(tag, props = {}, ...children) {
        return {
            tag,
            props,
            children: children.flat()
        };
    }

    // Mount component to DOM
    mount(component, container) {
        const vNode = typeof component === 'function' ? component() : component;
        const element = this.virtualDOM.render(vNode);
        container.appendChild(element);
        return element;
    }

    // Create event handler
    createEvent(name, handler) {
        return {
            type: 'event',
            name,
            handler
        };
    }
}

// Create global instance
window.MF = new MiniFramework();