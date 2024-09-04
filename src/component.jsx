import React, { useState } from 'react';

function ToDoList() {
    const [tasks, setTasks] = useState(["Organize a Drawer", "Try a New Workout", "Learn a New Skill"]);
    const [newTask, setNewTask] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [editTaskValue, setEditTaskValue] = useState("");

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function handleEditChange(event) {
        setEditTaskValue(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(prevTasks => [...prevTasks, newTask]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function deleteAllTasks() {
        setTasks([]);
    }

    function startEdit(index) {
        setEditIndex(index);
        setEditTaskValue(tasks[index]);
    }

    function saveEdit() {
        if (editTaskValue.trim() !== "") {
            setTasks(prevTasks => prevTasks.map((task, i) => i === editIndex ? editTaskValue : task));
            setEditIndex(null);
            setEditTaskValue("");
        }
    }

    function cancelEdit() {
        setEditIndex(null);
        setEditTaskValue("");
    }

    return (
        <div className="all">
            <h1 className="todo">To-Do-List</h1>
            <div>
                <input
                    className="enter"
                    type="text"
                    placeholder='Enter a task...'
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button className="addButton" onClick={addTask}>Add</button>
            </div>
            <ol className='ordered'>
                {tasks.map((task, index) => (
                    <li className="list" key={index}>
                        {editIndex === index ? (
                            <>
                                <input
                                    className='editing'
                                    type="text"
                                    value={editTaskValue}
                                    onChange={handleEditChange}
                                />
                                <div className='buttonwrapp'>
                                    <button className="save" onClick={saveEdit}>Save</button>
                                    <button className="cancel" onClick={cancelEdit}>Cancel</button>
                                </div>
                            </>
                        ) : 
                        (
                            <>
                                <span className="text">{task} </span>
                                <div className="buttonwrap">
                                    <button className='delete' onClick={() => deleteTask(index)}>
                                        Delete
                                    </button >
                                    <button className="modify" onClick={() => startEdit(index)}>
                                        Edit
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ol>
            <button className="deleteAll" onClick={deleteAllTasks}>Delete All Tasks</button>
        </div>
    );
}

export default ToDoList;
