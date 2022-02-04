import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/hooks';
import { addTodo } from '../store/todoSlice/todoSlice';

export const Header = () => {
    const [text, setText] = useState("");
    const dispatch = useAppDispatch();
    const onAddTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && text) {
            const todo = {
                id: new Date().valueOf().toString(),
                text,
                isCompleted: false
            }
            dispatch(addTodo(todo));
            setText("");
        }
    }
    return (
        <header className="header">
            <h1>todos</h1>
            <input type="text"
                value={text}
                className="new-todo"
                onChange={(e) => setText(e.target.value)}
                onKeyPress={(e) => onAddTodo(e)}
            />
        </header>
    );
};
