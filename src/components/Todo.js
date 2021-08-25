import React, { useState, useEffect } from "react";

function Todo() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [deletedTodos,setDeletedTodos] = useState([]);
    const [tabIndex,setTabIndex] = useState(0)
    const [completedTodos,setCompletedTodos]=useState([]);
    const saveData = (newTodos) => {
        localStorage.setItem("todos", JSON.stringify(newTodos));
    };
    const saveDeletedData = (deletedTodos) => {
        localStorage.setItem("DeletedTodos", JSON.stringify(deletedTodos));
    };
    const saveCompletedData = (completedTodos) => {
        localStorage.setItem("CompletedTodos", JSON.stringify(completedTodos));
    };

    useEffect(() => {
        if (localStorage.getItem("todos")) {
            setTodos(JSON.parse(localStorage.getItem("todos")));
        }
        if (localStorage.getItem("DeletedTodos")){
            setDeletedTodos(JSON.parse(localStorage.getItem("DeletedTodos")))
        }
        if (localStorage.getItem("CompletedTodos")){
            setCompletedTodos(JSON.parse(localStorage.getItem("CompletedTodos")))
        }
        if(localStorage.getItem("TabIndex")){
            setTabIndex(JSON.parse(localStorage.getItem("TabIndex")))
        }
    }, []);

    const onAddTodo = () => {
        if (newTodo.trim()) {
            let newTodos = [...todos, { todo: newTodo.trim(), id: Date.now(),date:new Date().toLocaleTimeString()}];
            setTodos(newTodos);
            setNewTodo("");
            saveData(newTodos);
        }
    };

    const deleteTodo = (id) => {
        let deletedTodo = todos.filter((todo)=>todo.id===id)
        let delTodos = [...deletedTodos,deletedTodo[0]]
        if(delTodos.length>10){
           delTodos =  delTodos.slice(delTodos.length-10,delTodos.length)
        }
        setDeletedTodos(delTodos)
        saveDeletedData(delTodos)
        let newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);

        saveData(newTodos);
    };


    const completeTodo = (id)=>{
        let completedTodo = todos.filter((todo)=>todo.id===id)
        let complTodos = [...completedTodos,completedTodo[0]]
        if(complTodos.length>10){
            complTodos =  complTodos.slice(complTodos.length-10,complTodos.length)
        }
        setCompletedTodos(complTodos)
        saveCompletedData(complTodos)
        let newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
        saveData(newTodos);
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center">Todo</h2>

            <table className="table table-dark mt-5">
                <thead>
                <tr>
                    <th>
                        <div style={{display:'flex'}}>
                        <input
                            type="text"
                            id="todoInput"
                            className="form-control"
                            placeholder="add todo"
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                        />
                        <button className="btn btn-primary ml-1" onClick={onAddTodo}>
                            Add
                        </button>
                        </div>
                    </th>
                    <th></th>
                    <th>
                        <div className="btn-group" role="group" aria-label="Basic outlined example">
                        <button className="btn btn-primary" onClick={()=>{setTabIndex(0);localStorage.setItem('TabIndex',JSON.stringify(0))}}>
                            Show Todos
                        </button>
                        <button className="btn btn-danger" onClick={()=>{setTabIndex(1);localStorage.setItem('TabIndex',JSON.stringify(1))}}>
                            Show Deleted
                        </button>
                            <button className="btn btn-success" onClick={()=>{setTabIndex(2);localStorage.setItem('TabIndex',JSON.stringify(2))}}>
                                Show Completed
                            </button>
                        </div>
                    </th>
                </tr>
                </thead>

                <thead>
                <tr>
                    <th scope="col" colSpan="1">
                        id
                    </th>
                    <th scope="col" colSpan="2">
                        Task
                    </th>
                    <th scope="col" colSpan="1">
                        Time
                    </th>
                    <th></th>
                </tr>
                </thead>
                <tbody id="table">
                {tabIndex === 0 ? (todos.map((todo,idx) => (
                        <tr key={todo.id}>
                            <td colSpan='1'>{idx+1}</td>
                            <td colSpan='2'>{todo.todo}</td>
                            <td colSpan='1'>{todo.date}</td>
                            <td colSpan="1">
                                <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                    <button type="button" className="btn btn-danger" onClick={()=>deleteTodo(todo.id)}>
                                        <i className="fas fa-trash"></i></button>
                                    <button type="button" className="btn btn-success" onClick={()=>completeTodo(todo.id)}><i
                                        className="fas fa-check-square"></i></button>
                                </div>
                            </td>
                        </tr>
                    ))): null}
                {tabIndex === 1 ? (deletedTodos.map((todo,idx) => (

                    <tr key={todo.id}>
                        <td colSpan='1'>{idx+1}</td>
                        <td colSpan='2'>{todo.todo}</td>
                        <td colSpan='1'>{todo.date}</td>

                    </tr>
                ))): null}
                {tabIndex === 2 ? (completedTodos.map((todo,idx) => (

                    <tr key={todo.id}>
                        <td colSpan='1'>{idx+1}</td>
                        <td colSpan='2'>{todo.todo}</td>
                        <td colSpan='1'>{todo.date}</td>

                    </tr>
                ))): null}
                    </tbody>
            </table>
        </div>
    );
}

export default Todo;