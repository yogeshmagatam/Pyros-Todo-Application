package com.todoapp.service;

import com.todoapp.dto.TodoDTO;
import com.todoapp.entity.Todo;
import com.todoapp.exception.ResourceNotFoundException;
import com.todoapp.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService {

    private final TodoRepository todoRepository;

    @Override
    public TodoDTO createTodo(TodoDTO todoDTO) {
        Todo todo = mapToEntity(todoDTO);
        Todo savedTodo = todoRepository.save(todo);
        return mapToDTO(savedTodo);
    }

    @Override
    public TodoDTO getTodoById(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found with id: " + id));
        return mapToDTO(todo);
    }

    @Override
    public List<TodoDTO> getAllTodos() {
        return todoRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TodoDTO updateTodo(Long id, TodoDTO todoDTO) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found with id: " + id));
        
        todo.setTitle(todoDTO.getTitle());
        todo.setDescription(todoDTO.getDescription());
        todo.setCompleted(todoDTO.isCompleted());
        
        Todo updatedTodo = todoRepository.save(todo);
        return mapToDTO(updatedTodo);
    }

    @Override
    public void deleteTodo(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found with id: " + id));
        todoRepository.delete(todo);
    }

    private TodoDTO mapToDTO(Todo todo) {
        return new TodoDTO(todo.getId(), todo.getTitle(), todo.getDescription(), todo.isCompleted());
    }

    private Todo mapToEntity(TodoDTO todoDTO) {
        return new Todo(todoDTO.getId(), todoDTO.getTitle(), todoDTO.getDescription(), todoDTO.isCompleted());
    }
}
