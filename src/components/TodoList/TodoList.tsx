import React, { FC } from 'react';
import s from './todo.module.css';
import { ITodo } from '../../types/types_typescript';

interface Todos {
  todos: ITodo[];
}

const TodoList: FC<Todos> = ({ todos }) => {
  console.log(todos);

  return (
    <>
      <h2>TodoList</h2>
      <ul className={s.todo_list}>
        {todos.map(({ id, text, completed }) => (
          <li key={id} className={s.todo_item}>
            <p>{text}</p>
            <p>{completed}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
