import { statusType } from "../store/todoSlice/todoSlice";

type TodoListType = {
    id: string,
    text:string,
    isCompleted: boolean
}[]
const isNotCheckAll = (todos:TodoListType) => todos.find(todo => !todo.isCompleted);
const filterByStatus = (todos:TodoListType, status:statusType, id:string = "") => {
  switch (status) {
    case "ACTIVE":
      return todos.filter(todo => !todo.isCompleted);
    case "COMPLETED":
      return todos.filter(todo => todo.isCompleted);
    case "REMOVE":
      return todos.filter(todo => !todo.id.toString().includes(id));
    default:
      return todos
  }
}
export {isNotCheckAll, filterByStatus}