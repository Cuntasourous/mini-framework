// framework/index.js

// Create element function
export const createElement = (node) => {
    if (typeof node === 'string' || typeof node === 'number') {
        return document.createTextNode(node);
    }

    const element = document.createElement(node.tag);

    // Set attributes
    Object.entries(node.attrs || {}).forEach(([key, value]) => {
        if (key.startsWith('on')) {
            const eventName = key.slice(2).toLowerCase();
            element.addEventListener(eventName, value);
        } else if (key === 'checked') {
            element.checked = value;
        } else {
            element.setAttribute(key, value);
        }
    });

    // Append children
    (node.children || []).forEach(child => {
        element.appendChild(createElement(child));
    });

    return element;
};

// State management
let state = {};
const subscribers = new Set();

export const setState = (newState) => {
    state = { ...state, ...newState };
    subscribers.forEach(callback => callback());
};

export const getState = () => state;

export const subscribe = (callback) => {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
};

// Event handling
export const on = (eventName, selector, handler) => {
    document.addEventListener(eventName, (e) => {
        if (e.target.matches(selector)) {
            handler(e);
        }
    });
};

// Routing
const routes = new Map();

export const addRoute = (path, handler) => {
    routes.set(path, handler);
};

export const startRouter = () => {
    const handleRoute = () => {
        const hash = window.location.hash.slice(2) || ''; // Remove '#/' from the hash
        const handler = routes.get(hash);
        
        if (handler) {
            handler();
        } else {
            // If no route matches, call the 404 handler
            const notFoundHandler = routes.get('404');
            if (notFoundHandler) {
                notFoundHandler();
            } else {
                console.error('No 404 route handler defined');
            }
        }
    };

    window.addEventListener('hashchange', handleRoute);
    handleRoute();
};