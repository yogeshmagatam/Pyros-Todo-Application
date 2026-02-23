import React, { useState } from 'react';

const AddTodo = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        onAdd({ title, description, completed: false });
        setTitle('');
        setDescription('');
    };

    return (
        <form className="add-todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Todo Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Add Todo</button>
        </form>
    );
};

export default AddTodo;
