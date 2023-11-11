import React, { createContext, useContext, useState } from "react";

const TodosContext = createContext();

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const addTodo = (index, dueDate, content) => {
    const newTodo = {
      index: index,
      dueDate: dueDate,
      content: content,
      isChecked: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const toggleTodo = (todoIndex) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) =>
        i === todoIndex ? { ...todo, isChecked: !todo.isChecked } : todo
      )
    );
  };
  const deleteTodo = (todoIndex) => {
    setTodos((prevTodos) => prevTodos.filter((todo, i) => i !== todoIndex));
  };
  return (
    <TodosContext.Provider
      value={{ todos, addTodo, toggleTodo, deleteTodo, setTodos }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodosProvider");
  }
  return context;
};
