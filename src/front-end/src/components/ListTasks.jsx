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
  const filtersState = useSelector((state) => state.filters);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchAllTasks = async () => {
      try {
        const allTasks = await getAllTasks(token);
        dispatch(getAllTaskAction(allTasks.data.tasks));
      } catch (err) {
        setWarning('your token was expired, reload the page');
        localStorage.clear();
        setTimeout(() => {
          setWarning('');
        }, 3000);
      }
    };

    fetchAllTasks();
  }, [dispatch]);

  const filters = (tasksLists, filtersParameters) => {
    let filteredList = tasksLists;
    const { stateFilter, bodyFilter, titleFilter } = filtersParameters;
    filteredList = filteredList.filter((task) => task.status.includes(stateFilter));
    filteredList = filteredList.filter((task) => task.title.includes(titleFilter));
    filteredList = filteredList.filter((task) => task.body.includes(bodyFilter));
    return filteredList;
  };

  useEffect(() => {
    const { stateFilter, bodyFilter, titleFilter } = filtersState;
    const filteredList = filters(taskList, { stateFilter, bodyFilter, titleFilter });
    dispatch(filterTask(filteredList));
  }, [taskList, dispatch, filtersState]);

  return (
    <div>
      <Warning warning={warning} />
      <div style={{ padding: '1em', backgroundColor: 'white', margin: '2em' }}>
        {/* recebe do estado global o visualization tasks */}
        {visibleTasks.map(({ _id: id, title, body, your, status }) => (
          <TaskCard id={id} title={title} body={body} status={status} your={your} key={id} />
        ))}
      </div>
    </div>
  );
}
