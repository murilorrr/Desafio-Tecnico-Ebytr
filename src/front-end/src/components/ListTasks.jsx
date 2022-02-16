import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTasks } from '../api/api';
import { TaskCard, Warning } from '.';
import { getAllTaskAction, filterTask } from '../app/slices/task';

export default function ListTasks() {
  const dispatch = useDispatch();

  const [warning, setWarning] = useState('');
  const taskList = useSelector((state) => state.task.allTasks);
  const visibleTasks = useSelector((state) => state.task.visualizationTasks);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchAllTasks = async () => {
      try {
        const allTasks = await getAllTasks(token);
        dispatch(getAllTaskAction(allTasks.data.tasks));
      } catch (err) {
        setWarning('your token was expired');
        setTimeout(() => {
          setWarning('');
        }, 3000);
      }
    };

    fetchAllTasks();
  }, [dispatch]);

  const filters = (tasksLists, { status = 'pendente', title = '', body = '' }) => {
    tasksLists.filter((task) => task.status === status);
    tasksLists.filter((task) => task.status === title);
    tasksLists.filter((task) => task.status === body);
    return tasksLists;
  };

  useEffect(() => {
    const filteredList = filters(taskList, {});
    dispatch(filterTask(filteredList));
  }, [taskList, dispatch]);

  return (
    <div>
      OUTSIDE
      <Warning warning={warning} />
      <div>
        DIV DE CARDS
        {/* recebe do estado global o visualization tasks */}
        {visibleTasks.map(({ _id: id, title, body, your, status }) => (
          <TaskCard id={id} title={title} body={body} status={status} your={your} key={id} />
        ))}
      </div>
    </div>
  );
}
