import React from 'react'
import '../assets/css/tasksPage.css'
import { CreateTask } from '../components'

const Tasks = () => {
  return (
    <div className='tasksPage'>
      <CreateTask />
      <div>FILTER TASK</div>
      <div>ALL TAKS</div>
    </div>
  )
};

export default Tasks;
