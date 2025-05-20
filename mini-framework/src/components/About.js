// src/components/About.js
export default function About() {
    return MF.createElement('div', { class: 'about-container' },
        MF.createElement('h1', { class: 'about-title' }, 'About Us'),
        MF.createElement('div', { class: 'about-content' },
            MF.createElement('p', {},
                'Welcome to our Mini Framework Todo App! This application was built using our custom-made JavaScript framework that implements core features like:'
            ),
            MF.createElement('ul', { class: 'feature-list' },
                MF.createElement('li', {}, '• Virtual DOM for efficient rendering'),
                MF.createElement('li', {}, '• State management system'),
                MF.createElement('li', {}, '• Custom routing solution'),
                MF.createElement('li', {}, '• Event handling system')
            ),
            MF.createElement('p', { class: 'mt-4' },
                'This project demonstrates how modern frontend frameworks work under the hood.'
            )
        ),
        MF.createElement('button', {
            class: 'nav-btn',
            onClick: () => MF.router.navigate('/')
        }, 'Back to Todo List')
    );
}