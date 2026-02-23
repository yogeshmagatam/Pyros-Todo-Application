package com.todoapp.controller;

import com.todoapp.dto.TodoDTO;
import com.todoapp.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    @PostMapping
    public ResponseEntity<TodoDTO> createTodo(@RequestBody TodoDTO todoDTO) {
        TodoDTO savedTodo = todoService.createTodo(todoDTO);
        return new ResponseEntity<>(savedTodo, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<TodoDTO> getTodoById(@PathVariable("id") Long todoId) {
        TodoDTO todoDTO = todoService.getTodoById(todoId);
        return ResponseEntity.ok(todoDTO);
    }

    @GetMapping
    public ResponseEntity<List<TodoDTO>> getAllTodos() {
        List<TodoDTO> todos = todoService.getAllTodos();
        return ResponseEntity.ok(todos);
    }

    @PutMapping("{id}")
    public ResponseEntity<TodoDTO> updateTodo(@PathVariable("id") Long todoId, @RequestBody TodoDTO todoDTO) {
        TodoDTO updatedTodo = todoService.updateTodo(todoId, todoDTO);
        return ResponseEntity.ok(updatedTodo);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable("id") Long todoId) {
        todoService.deleteTodo(todoId);
        return ResponseEntity.ok("Todo deleted successfully!.");
    }
}
