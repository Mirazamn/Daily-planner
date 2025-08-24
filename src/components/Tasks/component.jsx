import { useState, useEffect } from 'react'
import { MdDelete } from "react-icons/md";
import './style.css'

function Tasks({ task }) {
    const [tasks, setTasks] = useState([])
    const [notDeleted, setNotDeleted] = useState([tasks])

    useEffect(() => {
        fetch('https://planner-server-production.up.railway.app/').then(res => res.json())
        .then(data => {
            setTasks(data)
        }).catch(err => {
            alert("Xatoooooo! " + err.message)
        })
    }, [task, notDeleted])

    function PUT (updatedTasks) {
        fetch('https://planner-server-production.up.railway.app/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTasks)
        })
        .catch(err => {alert("Error updating tasks: " + err.message)})
    }

    const DeleteTask = (id) => {
        fetch(`https://planner-server-production.up.railway.app/${id}`, {
            method: 'DELETE'
        }).then(() => {
            const updatedTasks = tasks.filter(task => Number(task.id) !== Number(id));
            setNotDeleted(updatedTasks);
        })
        .catch(err => {
            alert("Error deleting task: " + err.message)
        })
    }

    const onValueChange = (e, id) => {
        const task = tasks.find(task => Number(task.id) === Number(id));
        if (task) {
            task.title = e.target.value;
            const updatedTasks = tasks.map(t => t.id === id ? task : t);
            setTasks(updatedTasks);
        }
    }

  return (
    <section className='tasks'>
        <div className="container">
           {tasks.length === 0 ? (
             <p>Loading...</p>
           ) : (
             <ul>
               {tasks.map((task) => (
                 <li key={task.id} className='flex'>
                    <input 
                        type="checkbox" 
                        name="" 
                        id="" 
                        checked={task.status === "completed"} 
                        onChange={() => {
                          const updatedTasks = tasks.map(t =>
                            t.id === task.id 
                              ? { ...t, status: t.status === "completed" ? "uncompleted" : "completed" }
                              : t
                          )
                          setTasks(updatedTasks)
                          PUT(updatedTasks)
                        }}/>
                    <h3>
                      <input 
                      type="text" 
                      className={task.status} 
                      value={task.title} 
                      onChange={(e) => onValueChange(e, task.id)} 
                      onBlur={() => PUT(tasks)}/>  
                    </h3>  
                    <button className='trash' onClick={() => DeleteTask(task.id)}><MdDelete /></button>
                </li>
               ))}
             </ul>
           )}
        </div>
    </section>
  )
}

export default Tasks