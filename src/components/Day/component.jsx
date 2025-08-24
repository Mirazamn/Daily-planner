import { useState } from "react";
import AddTask from "../Add-Task/component";
import Tasks from "../Tasks/component";
import { useParams } from "react-router-dom";


function Day() {
  const [task, setTask] = useState([])
  const { id } = useParams()

  return (
    <div>
      <AddTask setTask={setTask} date={id}/>
      <Tasks task={task} date={id}/>
    </div>
  )
}

export default Day;