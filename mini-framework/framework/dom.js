// framework/dom.js

class VirtualDOM {
    render(vNode) {
        if (typeof vNode === 'string' || typeof vNode === 'number') {
            return document.createTextNode(vNode);
        }

        const element = document.createElement(vNode.tag);

        // Set properties and attributes
        Object.entries(vNode.props || {}).forEach(([key, value]) => {
            if (key.startsWith('on')) {
                const eventName = key.slice(2).toLowerCase();
                element.addEventListener(eventName, value);
            } else {
                element.setAttribute(key, value);
            }
        });

        // Render children
        (vNode.children || []).forEach(child => {
            element.appendChild(this.render(child));
        });

        return element;
    }
}