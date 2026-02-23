import { useState, useEffect } from 'react';
import * as todoApi from '../api/todoApi';

export const useTodos = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadTodos = async () => {
        try {
            setLoading(true);
            const response = await todoApi.fetchTodos();
            setTodos(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch todos');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTodos();
    }, []);

    const addTodo = async (todo) => {
        try {
            const response = await todoApi.createTodo(todo);
            setTodos([...todos, response.data]);
        } catch (err) {
            setError('Failed to add todo');
            console.error(err);
        }
    };

    const editTodo = async (id, updatedTodo) => {
        try {
            const response = await todoApi.updateTodo(id, updatedTodo);
            setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
        } catch (err) {
            setError('Failed to update todo');
            console.error(err);
        }
    };

    const removeTodo = async (id) => {
        try {
            await todoApi.deleteTodo(id);
            setTodos(todos.filter((todo) => todo.id !== id));
        } catch (err) {
            setError('Failed to delete todo');
            console.error(err);
        }
    };

    const toggleTodo = async (todo) => {
        await editTodo(todo.id, { ...todo, completed: !todo.completed });
    };

    return {
        todos,
        loading,
        error,
        addTodo,
        editTodo,
        removeTodo,
        toggleTodo,
        refreshTodos: loadTodos
    };
};
