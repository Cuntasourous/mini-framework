// src/components/TodoList.js
import { createElement, setState, getState, on, subscribe } from '../../framework/index.js';

export default function TodoList() {
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
            },
            {
                tag: 'div',
                attrs: { class: 'footer' },
                children: [
                    {
                        tag: 'span',
                        attrs: { id: 'todo-count' },
                        children: [`${todos.filter(t => !t.done).length} items left!`]
                    },
                    {
                        tag: 'div',
                        attrs: { class: 'filters' },
                        children: [
                            {
                                tag: 'button',
                                attrs: {
                                    class: `filter ${filter === 'all' ? 'active' : ''}`,
                                    'data-filter': 'all'
                                },
                                children: ['All']
                            },
                            {
                                tag: 'button',
                                attrs: {
                                    class: `filter ${filter === 'active' ? 'active' : ''}`,
                                    'data-filter': 'active'
                                },
                                children: ['Active']
                            },
                            {
                                tag: 'button',
                                attrs: {
                                    class: `filter ${filter === 'completed' ? 'active' : ''}`,
                                    'data-filter': 'completed'
                                },
                                children: ['Completed']
                            }
                        ]
                    },
                    ...(todos.some(t => t.done) ? [{
                        tag: 'button',
                        attrs: { id: 'clear-completed' },
                        children: ['Clear completed']
                    }] : [])
                ]
            }
        ]
    };
}