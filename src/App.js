import React,{ useState, useRef } from 'react'
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";
// import "./index.css";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  const todoNameRef = useRef();

  const handleAddTodo = () => {
    // タスクを追加する
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, completed: false }];
    });
    todoNameRef.current.value = null;
  };

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  return (
    <div className="wrapper">
      <div className="title">Todo List</div>
      <div className="input">
        <input type="text" ref={todoNameRef} />
        <button className="add" onClick={handleAddTodo}><span className="addSpan">&#0043;</span>タスクを追加</button>
      </div>
      <div className="box">

        <div>残りのタスク：{todos.filter((todo) => !todo.completed).length}</div>
        <button className="delete" onClick={handleClear}>完了したタスクの削除<span className="deleteSpan">&times;</span></button>
      </div>
      <div className="listArea">
        <TodoList todos={todos} toggleTodo={toggleTodo} />
      </div>
    </div>
  );
}

export default App;
