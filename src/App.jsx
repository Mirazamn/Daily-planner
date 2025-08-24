import { useState } from 'react'
import './App.css'
import AddTask from './components/Add-Task/component'
import Header from './components/Header/component'
import Tasks from './components/Tasks/component'
import Calendar from './components/Calendar/component'

function App() {
  const [task, setTask] = useState([])

  return (
    <>
      <Header />
      <Calendar />
      <AddTask setTask={setTask}/>
      <Tasks task={task}/>
    </>
  )
}

export default App
