import { useEffect, useState } from 'react';
import './style.css';

function AddTask({setTask}) {
  const [value, setValue] = useState('');
  const [tasks, setTasks] = useState([]);

  const onValueChange = (e) => {
    setValue(e.target.value);
  }

  useEffect(() => {
    fetch('https://planner-server-production.up.railway.app/')
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  const PostTask = () => {
    fetch('https://planner-server-production.up.railway.app/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: value, status: "uncompleted" })
    })
    .then(res => res.json())
    .then(data => {
      setTasks(data);
      setTask(data);
      setValue('');
    });
  }

  return (
    <section className='add-task'>
        <div className="container flex">
            <form onSubmit={(e) => { e.preventDefault(); PostTask(); }}>
              <input 
                type="text" 
                placeholder="Add task here" 
                value={value} 
                onChange={onValueChange} 
              />
              <button type="submit">Add Task</button>
            </form>
        </div>
    </section>
  )
}

export default AddTask