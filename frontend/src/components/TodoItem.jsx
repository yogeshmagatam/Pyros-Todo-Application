import React from 'react';
import { Trash2, Edit, CheckCircle, Circle } from 'lucide-react';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <div className="todo-content" onClick={() => onToggle(todo)}>
                {todo.completed ? (
                    <CheckCircle className="icon-check" />
                ) : (
                    <Circle className="icon-uncheck" />
                )}
                <div className="todo-text">
                    <h3>{todo.title}</h3>
                    {todo.description && <p>{todo.description}</p>}
                </div>
            </div>
            <div className="todo-actions">
                <button onClick={() => onEdit(todo)} className="btn-edit">
                    <Edit size={18} />
                </button>
                <button onClick={() => onDelete(todo.id)} className="btn-delete">
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
