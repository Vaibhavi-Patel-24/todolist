import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './MyComponets/Header';
import Todos from './MyComponets/Todos';
import Footer from './MyComponets/Footer';
import AddTodo from './MyComponets/AddTodo';
import About from './MyComponets/About';

function App() {
  let initTodo;
  if (localStorage.getItem('todos') === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem('todos'));
  }

  const onDelete = (todo) => {
    console.log('Deleting todo:', todo);
    setTodos(todos.filter((e) => e !== todo));
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const addTodo = (title, desc) => {
    console.log('Adding todo:', title, desc);
    let sno;
    if (todos.length === 0) {
      sno = 0;
    } else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    };
    setTodos([...todos, myTodo]);
    console.log(myTodo);
  };

  const [todos, setTodos] = useState(initTodo);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <Router>
        <Header title="My Todos List" searchBar={false} />
        <Routes>
          <Route path="/" element={<Home addTodo={addTodo} todos={todos} onDelete={onDelete} />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

function Home({ addTodo, todos, onDelete }) {
  return (
    <>
      <AddTodo addTodo={addTodo} />
      <Todos todos={todos} onDelete={onDelete} />
    </>
  );
}

export default App;
