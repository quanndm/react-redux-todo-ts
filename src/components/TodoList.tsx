import React, {memo} from 'react';
import { filterByStatus } from '../helpers/todoHelper';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { checkAllTodos } from '../store/todoSlice/todoSlice';
import Todo from "./Todo"

export const TodoList = memo((props:React.PropsWithChildren<object>) => {
    const dispatch = useAppDispatch();
    const {todoList, status, isCheckedAll} = useAppSelector((state)=>state.Todo)    
    return (
        <section className="main">
            <input className="toggle-all" type="checkbox" checked={isCheckedAll} readOnly/>
            <label htmlFor="toggle-all" onClick={()=>dispatch(checkAllTodos())} style={{cursor: 'pointer'}}></label>
            <ul className="todo-list">
                {/* render */}
                {
                    filterByStatus(todoList, status).map((todo, index)=>(
                        <Todo key={`todo${todo.id}`} {...{todo}} {...props} index={index}/>
                    ))
                }
            </ul>
        </section>
    )
})
