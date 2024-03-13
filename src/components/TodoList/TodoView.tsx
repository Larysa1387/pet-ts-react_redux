import { useState } from 'react';
import TodoList from './TodoList';
import todoList from './todo.json';
import Navigate, { ITodo } from '../../types/types_typescript';
import s from './todo.module.css';

const TodoView = ({ navigate }: Navigate) => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<ITodo[]>(todoList);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(evt.currentTarget.value);
  };
  const handlSubmitTodo = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (todo.trim() === '') {
      alert('put todo here');
      return;
    }
    const newTodo = {
      id: Date.now().toString(),
      text: todo,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
    console.log(todos);
    setTodo('');
  };
  return (
    <>
      <button onClick={() => navigate('/')}>Home</button>
      <form onSubmit={handlSubmitTodo}>
        <input
          type='text'
          placeholder="What's todo?"
          value={todo}
          onChange={handleChange}
        ></input>
        <button type='submit'>Add new todo</button>
      </form>
      <TodoList todos={todos} />
    </>
  );
};

export default TodoView;
