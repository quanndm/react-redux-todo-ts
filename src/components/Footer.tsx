import React, { useState, memo, useEffect } from 'react';
import { filterByStatus } from '../helpers/todoHelper';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { setStatus, clearCompleted, statusType } from '../store/todoSlice/todoSlice';

type filterBtnProps = {
    title: string,
    isActived: boolean,
    onClick: () => {
        payload: statusType;
        type: string;
    },
    link: string
}

export const Footer = () => {
    const dispatch = useAppDispatch();
    const { todoList, status } = useAppSelector(state => state.Todo);
    const [numOfTodos, setNumOfTodos] = useState(todoList.length);
    const [numOfTodosLeft, setNumOfTodosLeft] = useState(filterByStatus(todoList, "ACTIVE").length);
    useEffect(() => {
        setNumOfTodos(todoList.length);
        setNumOfTodosLeft(filterByStatus(todoList, "ACTIVE").length)
    },[todoList])
    const filterBtns = [
        {
            title: "All",
            isActived: status === "ALL",
            onClick: () => dispatch(setStatus("ALL")),
            link: ""
        },
        {
            title: "Active",
            isActived: status === "ACTIVE",
            onClick: () => dispatch(setStatus("ACTIVE")),
            link: "/active"
        },
        {
            title: "Completed",
            isActived: status === "COMPLETED",
            onClick: () => dispatch(setStatus("COMPLETED")),
            link: "/completed"
        },
    ]
    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{numOfTodosLeft}</strong>
                <span> </span>
                <span>{numOfTodosLeft <= 1 ? "item" : "items"}</span>
                <span> left</span>
            </span>
            <ul className="filters">
                {filterBtns.map((item) => (
                    <FilterBtn
                        key={`btn${item.title}`}
                        {...item}
                    />
                ))}
            </ul>
            {
                numOfTodos > numOfTodosLeft && <button className="clear-completed" onClick={() => dispatch(clearCompleted())}>Clear completed</button>
            }

        </footer>
    );
};


const FilterBtn = memo(({ title, isActived, onClick, link }: filterBtnProps) => {

    return (
        <>
            <li>
                <a
                    href={`/#${link}`}
                    className={`${isActived ? "selected" : ""}`}
                    onClick={onClick}
                >
                    {title}
                </a>
            </li>
            <span></span>
        </>
    )
})