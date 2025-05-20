// app/app.js

const TodoApp = () => {
    const state = {
        todos: [],
        filter: 'all'
    };

    const addTodo = (text) => {
        const todo = {
            id: Date.now(),
            text,
            completed: false
        };
        state.todos.push(todo);
        MF.state.setState({ todos: state.todos });
    };

    const toggleTodo = (id) => {
        state.todos = state.todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        MF.state.setState({ todos: state.todos });
    };

    return MF.createElement('div', { class: 'todo-app' },
        MF.createElement('h1', {}, 'Todo App'),
        MF.createElement('input', {
            type: 'text',
            placeholder: 'What needs to be done?',
            onKeyPress: (e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                    addTodo(e.target.value.trim());
                    e.target.value = '';
                }
            }
        }),
        MF.createElement('ul', { class: 'todo-list' },
            ...state.todos.map(todo =>
                MF.createElement('li', {
                    class: todo.completed ? 'completed' : '',
                    onClick: () => toggleTodo(todo.id)
                }, todo.text)
            )
        )
    );
};