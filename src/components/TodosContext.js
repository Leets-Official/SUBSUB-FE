import React, { createContext, useContext, useState } from 'react';

const TodosContext = createContext();

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const addTodo = (index, dueDate, content) => {
    const newTodo = { index, dueDate, content, isChecked: false };
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const toggleTodo = todoIndex => {
    setTodos(prevTodos =>
      prevTodos.map((todo, index) =>
        index === todoIndex ? { ...todo, isChecked: !todo.isChecked } : todo
      )
    );
  };

  return (
    <TodosContext.Provider value={{ todos, addTodo, toggleTodo }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodosProvider');
  }
  return context;
};