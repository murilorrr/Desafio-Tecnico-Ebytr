import React, {useEffect, useState} from 'react'
import { getAllTasks } from '../api/api'
import { TaskCard, Warning } from '.'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTaskAction } from '../app/slices/task'

export default function ListTasks() {

  const dispatch = useDispatch();

  const [warning, setWarning] = useState('')
  const taskList = useSelector((state) => state.task.allTasks);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchAllTasks = async () => {
      try {

        const allTasks = await getAllTasks(token);
        dispatch(getAllTaskAction(allTasks.data.tasks))

      } catch (err) {
        setWarning('your token was expired');
        setTimeout(() => {
          setWarning('')
        }, 3000);
      }
    }

    fetchAllTasks();
  },[dispatch])

  return (
    <div>
      OUTSIDE
      <Warning warning={warning}/>
      <div>
        DIV DE CARDS
        {/* recebe do estado global o visualization tasks */}
        {taskList.map((task) => <TaskCard
          id={task._id}
          title={task.title}
          body={task.body}
          status={task.status}
          your={task.your}
          key={task._id}
        ></TaskCard>)}
      </div>
    </div>
  )
}
