import React, { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import EditTodoModal from '../components/EditTodoModal';

const Home = () => {
    const { todos, loading, error, addTodo, editTodo, removeTodo, toggleTodo } = useTodos();
    const [editingTodo, setEditingTodo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEditClick = (todo) => {
        setEditingTodo(todo);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingTodo(null);
        setIsModalOpen(false);
    };

    return (
        <div className="home-container">
            <header>
                <h1>My Todo List</h1>
            </header>

            <main>
                <AddTodo onAdd={addTodo} />

                {loading && <p className="status-message">Loading todos...</p>}
                {error && <p className="status-message error">{error}</p>}

                {!loading && !error && (
                    <TodoList
                        todos={todos}
                        onToggle={toggleTodo}
                        onDelete={removeTodo}
                        onEdit={handleEditClick}
                    />
                )}
            </main>

            <EditTodoModal
                todo={editingTodo}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={editTodo}
            />
        </div>
    );
};

export default Home;
