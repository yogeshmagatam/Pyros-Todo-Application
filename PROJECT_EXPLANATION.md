# Pyros Todo Application - Fresher Interview Guide

This document explains every single file in your Full-Stack Todo Application. You can use this to review and prep for your interview, as it covers the purpose and flow of the entire application.

## 1. Project Overview
This is a standard Full-Stack Web Application containing:
*   **Backend:** Java with Spring Boot 3, using Spring Web (REST API), Spring Data JPA (Database queries), and an H2 In-Memory database.
*   **Frontend:** React 18 using functional components, Custom Hooks state management, and Axios for making API calls.

---

## 2. Backend Files Explanation (`backend/`)

### Project Configuration
*   **`pom.xml`**: The Maven configuration file. It manages all the Java dependencies (like Spring Boot Web, Spring Data JPA, H2 database, Lombok) and build plugins required to run the backend.
*   **`src/main/resources/application.properties`**: The main configuration file for Spring Boot. It defines the server port (`8080`), enables the H2 database console, sets database connection URLs, and configures Hibernate (the JPA implementation) to automatically update the schema based on your entities.
*   **`src/main/resources/data.sql`**: A SQL script that Spring Boot runs automatically at startup. It inserts dummy/initial data into the `todos` table so you have something to see right away.

### Core Architecture (The "Layers")
The backend follows a typical **N-Tier Architecture**: Controller -> Service -> Repository -> Database.

*   **`TodoBackendApplication.java`**: The entry point of the backend application. The `@SpringBootApplication` annotation tells Spring to auto-configure the app and start the embedded Tomcat server.
*   **`config/CorsConfig.java`**: A configuration class that tackles CORS (Cross-Origin Resource Sharing). Because the React frontend runs on port `3000` (or `5173`) and the backend on `8080`, browsers block requests by default. This file tells Spring Boot to allow backend requests coming from your frontend URLs.

*   **`entity/Todo.java`**: The database model. Annotated with `@Entity` and `@Table(name = "todos")`, it represents the table in the H2 database. It uses Lombok (`@Data`) to automatically generate Getters, Setters, and Constructors. Fields include `id`, `title`, `description`, and `completed`.
*   **`dto/TodoDTO.java`**: The Data Transfer Object. Instead of exposing the raw database entity (`Todo.java`) directly to the internet, we pass a `TodoDTO`. This is a security and design best practice to separate database layer representations from API representations.

*   **`repository/TodoRepository.java`**: The data access layer. It is an interface that extends `JpaRepository<Todo, Long>`. Spring Data JPA automatically provides all the basic CRUD (Create, Read, Update, Delete) database operations behind the scenes without you needing to write SQL queries.

*   **`service/TodoService.java`**: An interface defining the business logic operations for the application (`createTodo`, `getTodoById`, `getAllTodos`, `updateTodo`, `deleteTodo`). Using an interface allows for loose coupling.
*   **`service/TodoServiceImpl.java`**: The actual implementation of the business logic. This class interacts with the `TodoRepository` to fetch/save entities, and uses helper methods (`mapToDTO`, `mapToEntity`) to convert data flowing between the API and the database.

*   **`controller/TodoController.java`**: The REST API layer. Annotated with `@RestController` and mapped to `/api/todos`. This class receives HTTP Requests (GET, POST, PUT, DELETE) from the React frontend, calls the appropriate methods in `TodoService`, and returns a JSON response packaged in a `ResponseEntity`.

### Exception Handling
*   **`exception/ResourceNotFoundException.java`**: A custom exception class created specifically to be thrown when a user tries to access a Todo ID that doesn't exist in the database.
*   **`exception/GlobalExceptionHandler.java`**: Annotated with `@ControllerAdvice`, this acts as a global safety net. If any error gets thrown anywhere in the app (like `ResourceNotFoundException`), it intercepts the error and returns a clean, structured JSON response to the user instead of an ugly Java stack trace.

---

## 3. Frontend Files Explanation (`frontend/`)

### Project Configuration
*   **`package.json`**: The NPM configuration file. It defines the project name, scripts (`start`, `build`), and all the JavaScript dependencies like `react`, `react-dom`, `axios`, and `lucide-react` (for icons).

### Entry Points
*   **`src/index.js`**: The main entry point of the React app. It uses `ReactDOM.createRoot` to grab the `<div id="root">` from the HTML file and injects the parent `<App />` component into it.
*   **`src/App.jsx`**: The root React component. It simply acts as a wrapper, importing global CSS styles (`app.css`) and rendering the main `<Home />` view.

### API & State Management
*   **`src/constants.js`**: Stores global constants, specifically the `API_BASE_URL` (`http://localhost:8080/api/todos`), making it easy to change the backend URL in one place if needed.
*   **`src/api/todoApi.js`**: A utility file that centralizes all API calls. It uses Axios to export functions (`fetchTodos`, `createTodo`, `updateTodo`, `deleteTodo`) matching the backend's REST endpoints.
*   **`src/hooks/useTodos.js`**: A brilliant piece of architecture! This is a **Custom React Hook** that handles *all* the state (`todos`, `loading`, `error`) and logic of the application. It fetches the data via `todoApi.js` inside a `useEffect` and returns the data and functions (`addTodo`, `editTodo`, etc.) to be used by any component.

### Pages & Components
*   **`src/pages/Home.jsx`**: The main parent view. It imports the `useTodos` hook to get the state and functions, then passes them down as **props** to its child components (`AddTodo`, `TodoList`, `EditTodoModal`). It also manages the local state for whether the Edit Modal is currently open.
*   **`src/components/AddTodo.jsx`**: A form component for adding new items. It holds local state for `title` and `description` inputs, and calls the `onAdd` prop when submitted.
*   **`src/components/TodoList.jsx`**: A list component that receives an array of `todos` as a prop. If empty, it shows a message. Otherwise, it maps over the array and renders a `TodoItem` for each entry.
*   **`src/components/TodoItem.jsx`**: The individual item presentation component. It displays the title, description, and completion status using `lucide-react` icons. It contains buttons that fire the `onToggle`, `onEdit`, and `onDelete` props passed down from the top.
*   **`src/components/EditTodoModal.jsx`**: A popup modal component used to edit existing items. When opened, it fills its local state with the selected todo's data, allows modifications, and triggers `onSave` to update the backend.

---

## 🎓 Interview Tips (To Impress!)
If asked about this project in an interview, make sure to highlight these points:
1.  **"I used separation of concerns."**: Point out how your backend separates `Controllers` (API interaction), `Services` (business logic), and `Repositories` (database). 
2.  **"I used the DTO Pattern."**: Explain that using `TodoDTO.java` instead of exposing `Todo.java` directly prevents sensitive database structure leakage.
3.  **"I abstracted logic using a Custom Hook."**: In the frontend, point out `useTodos.js`. Highlight that separating logic from presentation components makes the app easier to test and maintain.
4.  **"I built a centralized API layer."**: Emphasize `todoApi.js`, which prevents Axios calls from being scattered messily throughout your React components.
