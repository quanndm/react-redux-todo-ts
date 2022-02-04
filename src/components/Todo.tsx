import React, { memo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getIdTodo, editTodo as edit, markCompleted, removeTodo } from "../store/todoSlice/todoSlice";
type TodoProps = {
  todo: {
    id: string;
    text: string;
    isCompleted: boolean;
  },
  index: number
}
const Todo = memo(({ todo, index }: TodoProps) => {
  const dispatch = useAppDispatch();
  const { todoEditingId } = useAppSelector(state => state.Todo);
  const isEditing = todoEditingId === todo.id;
  const [text, setText] = useState(todo.text);
  const editTodo = () => {
    todo = {...todo, text};
    dispatch(edit({todo, index}))
  }
  return (
    <li className={`${isEditing && "editing"} ${todo.isCompleted && "completed"}`}>
      {
        !isEditing
          ? <div className="view">
            <input className="toggle"
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => dispatch(markCompleted(todo.id))}
            />
            <label onDoubleClick={() => dispatch(getIdTodo(todo.id))}>{todo.text}</label>
            <button className="destroy" onClick={() => dispatch(removeTodo(todo.id))}></button>
          </div>
          : <input
            className='edit'
            type="text"
            value={text}
            onChange={(e) => { setText(e.target.value) }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                editTodo()
              }
            }}
          />
      }
    </li>
  );
});

export default Todo;
