import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { isNotCheckAll, filterByStatus } from '../../helpers/todoHelper';

export type TodoListType = todoType[]
type todoType={
    id: string,
    text:string,
    isCompleted: boolean
}
export type statusType = "ALL" | "ACTIVE" | "COMPLETED" | "REMOVE"
type initialstateType = {
    todoList: TodoListType,
    todoEditingId: string,
    status: statusType,
    isCheckedAll:boolean
}
type editTodoType = {
    todo: todoType,
    index: number
}
const getItem:initialstateType = localStorage.getItem("todoState")!== null
                                ? JSON.parse(localStorage.getItem("todoState") as string)
                                :{
                                    todoList: [],
                                    todoEditingId: "",
                                    isCheckedAll: false,
                                    status: "ALL"
                                };
const initialState:initialstateType = getItem ;

export const TodoSlice = createSlice({
    name: 'Todos',
    initialState,
    reducers:{
        addTodo: (state, action: PayloadAction<todoType>)=>{
            const list = JSON.parse(JSON.stringify(state.todoList));
            state.todoList = [...list, action.payload];
            localStorage.setItem("todoState", JSON.stringify(state));
            
        },
        editTodo: (state, action: PayloadAction<editTodoType>)=>{
            const list = JSON.parse(JSON.stringify(state.todoList));
            if (action.payload.index >= 0) 
                list.splice(action.payload.index, 1, action.payload.todo);
            state.todoList = [...state.todoList, list]
            state.todoEditingId = "";
            localStorage.setItem("todoState", JSON.stringify(state));
        },
        getIdTodo: (state, action:PayloadAction<string>)=>{
            state.todoEditingId = action.payload;
            localStorage.setItem("todoState", JSON.stringify(state));
        },
        markCompleted: (state, action:PayloadAction<string>)=>{
            const list:TodoListType = JSON.parse(JSON.stringify(state.todoList));
            const updateList:TodoListType = list.map(todo => todo.id === action.payload ? ({ ...todo, isCompleted: !todo.isCompleted }) : todo);
            state.todoList = [...updateList];
            state.isCheckedAll = !isNotCheckAll(updateList);
            localStorage.setItem("todoState", JSON.stringify(state));
        },
        checkAllTodos: (state)=>{
            const updateList = state.todoList.map(todo => ({ ...todo, isCompleted: !state.isCheckedAll }));
            state.todoList = [...updateList];
            state.isCheckedAll =!state.isCheckedAll;
            localStorage.setItem("todoState", JSON.stringify(state));
        },
        removeTodo: (state, action:PayloadAction<string>)=>{
            const list:TodoListType = JSON.parse(JSON.stringify(state.todoList));
            state.todoList = filterByStatus(list, "REMOVE", action.payload)
            localStorage.setItem("todoState", JSON.stringify(state));
            if (state.todoList.length === 0) localStorage.removeItem("todoState");
            
        },
        setStatus:(state, action:PayloadAction<statusType>)=>{
            state.status = action.payload
            localStorage.setItem("todoState", JSON.stringify(state));
        },
        clearCompleted:(state)=>{
            const list:TodoListType = JSON.parse(JSON.stringify(state.todoList));
            state.todoList = filterByStatus(list, "ACTIVE")
            localStorage.setItem("todoState", JSON.stringify(state));
            if (state.todoList.length === 0) localStorage.removeItem("todoState");
        }
    }
})
export const {addTodo,checkAllTodos,clearCompleted,editTodo,getIdTodo,markCompleted,removeTodo,setStatus} = TodoSlice.actions
export default TodoSlice.reducer