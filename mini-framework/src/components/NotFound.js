// src/components/NotFound.js
export default function NotFound() {
    return MF.createElement('div', { class: 'not-found-container' },
        MF.createElement('h1', { class: 'error-code' }, '404'),
        MF.createElement('h2', { class: 'error-title' }, 'Page Not Found'),
        MF.createElement('p', { class: 'error-message' },
            'The page you are looking for does not exist or has been moved.'
        ),
        MF.createElement('button', {
            class: 'nav-btn',
            onClick: () => MF.router.navigate('/')
        }, 'Go Back Home')
    );
}