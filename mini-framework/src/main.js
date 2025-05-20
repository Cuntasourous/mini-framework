// src/main.js
import { 
    createElement, 
    setState, 
    getState, 
    subscribe, 
    on, 
    addRoute, 
    startRouter 
} from '../framework/index.js';

// Initialize state
setState({
    todos: [],
    filter: 'all',
    currentPage: 'todos'
});

function renderNavbar() {
    return {
        tag: 'nav',
        attrs: { class: 'navbar' },
        children: [
            {
                tag: 'a',
                attrs: { 
                    href: '#/todos',
                    class: 'nav-link'
                },
                children: ['Todos']
            },
            {
                tag: 'span',
                children: [' | ']
            },
            {
                tag: 'a',
                attrs: { 
                    href: '#/about',
                    class: 'nav-link'
                },
                children: ['About']
            }
        ]
    };
}

function TodoList() {
    const state = getState();
    const todos = state.todos || [];
    const filter = state.filter || 'all';

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.done;
        if (filter === 'completed') return todo.done;
        return true;
    });

    return {
        tag: 'div',
        attrs: { class: 'todo-container' },
        children: [
            {
                tag: 'h1',
                attrs: { class: 'title' },
                children: ['todos']
            },
            {
                tag: 'input',
                attrs: {
                    id: 'todo-input',
                    type: 'text',
                    placeholder: 'What needs to be done?',
                    class: 'todo-input'
                }
            },
            {
                tag: 'ul',
                attrs: { id: 'todo-list' },
                children: filteredTodos.map((todo, index) => ({
                    tag: 'li',
                    attrs: {
                        'data-index': index,
                        class: todo.done ? 'done' : ''
                    },
                    children: [
                        {
                            tag: 'input',
                            attrs: {
                                type: 'checkbox',
                                class: 'todo-checkbox',
                                checked: todo.done
                            }
                        },
                        {
                            tag: 'span',
                            attrs: { class: 'todo-text' },
                            children: [todo.text]
                        },
                        {
                            tag: 'button',
                            attrs: { class: 'delete-btn' },
                            children: ['×']
                        }
                    ]
                }))
            }
        ]
    };
}

function About() {
    return {
        tag: 'div',
        attrs: { class: 'about-container' },
        children: [
            {
                tag: 'h1',
                children: ['About Page']
            },
            {
                tag: 'p',
                children: ['This is a simple todo application built with our custom framework.']
            }
        ]
    };
}

function NotFound() {
    return {
        tag: 'div',
        attrs: { class: 'not-found-container' },
        children: [
            {
                tag: 'h1',
                attrs: { class: 'error-code' },
                children: ['404']
            },
            {
                tag: 'h2',
                attrs: { class: 'error-title' },
                children: ['Page Not Found']
            },
            {
                tag: 'p',
                attrs: { class: 'error-message' },
                children: ['The page you are looking for does not exist.']
            },
            {
                tag: 'a',
                attrs: { 
                    href: '#/todos',
                    class: 'nav-btn'
                },
                children: ['Go Back to Home']
            }
        ]
    };
}

function renderApp() {
    const app = document.getElementById('app');
    app.innerHTML = '';
    
    // Add navbar
    app.appendChild(createElement(renderNavbar()));

    const state = getState();
    
    // Render current page
    if (state.currentPage === 'todos') {
        app.appendChild(createElement(TodoList()));
    } else if (state.currentPage === 'about') {
        app.appendChild(createElement(About()));
    } else if (state.currentPage === '404') {
        app.appendChild(createElement(NotFound()));
    }
}

// Event handlers
on('keydown', '#todo-input', e => {
    if (e.key === 'Enter') {
        const value = e.target.value.trim();
        if (value) {
            const state = getState();
            setState({
                todos: [...state.todos, { text: value, done: false }]
            });
            e.target.value = '';
        }
    }
});

on('click', '.todo-checkbox', e => {
    const index = e.target.closest('li').dataset.index;
    const state = getState();
    const newTodos = [...state.todos];
    newTodos[index].done = !newTodos[index].done;
    setState({ todos: newTodos });
});

on('click', '.delete-btn', e => {
    const index = e.target.closest('li').dataset.index;
    const state = getState();
    setState({
        todos: state.todos.filter((_, i) => i != index)
    });
});

// Set up routes
addRoute('todos', () => setState({ currentPage: 'todos' }));
addRoute('about', () => setState({ currentPage: 'about' }));
addRoute('', () => setState({ currentPage: 'todos' }));
addRoute('404', () => setState({ currentPage: '404' }));

// Start the application
subscribe(renderApp);
startRouter();
renderApp();