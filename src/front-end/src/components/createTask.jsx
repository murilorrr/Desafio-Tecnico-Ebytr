import React, { useState, useEffect, useCallback } from 'react';
import '../assets/css/createTask.css';
import { createTask } from '../api/api';
import { Warning } from '.';
import { useDispatch } from 'react-redux';
import { createTaskAction } from '../app/slices/task';

const style = {
  padding: '2em'
};

export default function CreateTask() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [warning, setWarning] = useState('');
  const [status, setStatus] = useState('pendente');
  const [lockButton, setLockButton] = useState(false);

  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    if (name === 'title') return setTitle(value);
    if (name === 'body') return setBody(value);
    if (name === 'status') return setStatus(value);
  };

  const memoizedCallback = useCallback(() => {
    const validateCreateTask = (title, body, status) => {
      const statusOptions = ['em andamento', 'pendente', 'pronto'];
      const minTitleLength = 3;
      const minBodyLength = 3;

      const validateTitle = title.length >= minTitleLength;
      const validateBody = body.length >= minBodyLength;
      const validateStatus = statusOptions.includes(status);

      return validateStatus && validateTitle && validateBody;
    };

    if (validateCreateTask(title, body, status)) {
      setLockButton(false);
    } else {
      setLockButton(true);
    }
  }, [title, body, status]);

  useEffect(() => {
    memoizedCallback();
  }, [memoizedCallback]);

  const createTaskFunction = async () => {
    const token = localStorage.getItem('token');

    const { error, data } = await createTask(
      {
        title: title,
        body: body,
        status: status
      },
      token
    );
    if (!error) {
      data.task.your = true;
      dispatch(createTaskAction(data.task));
      return;
    }
    setWarning(`${error}, reload the page`);
    setTimeout(() => {
      setWarning('');
    }, 3000);
  };

  return (
    <div style={style}>
      <div className="form-create-task">
        <Warning warning={warning} />
        <div>
          <input
            data-testid="input-Title"
            type="text"
            name="title"
            className="form-control"
            id="InputTitle"
            value={title}
            onChange={handleChange}
            placeholder="Enter Title Task"
          />

          <select
            onChange={handleChange}
            name="status"
            value={status}
            className="form-select"
            aria-label="Default select example"
          >
            <option value="pendente">Pendente</option>
            <option value="em andamento">Em andamento</option>
            <option value="pronto">Pronto</option>
          </select>
        </div>

        <div>
          <textarea
            data-testid="input-Body"
            type="text"
            name="body"
            onChange={handleChange}
            className="form-control"
            placeholder="Task description"
            id="floatingTextarea"
            value={body}
          ></textarea>

          <button onClick={createTaskFunction} disabled={lockButton}>
            CREATE TASK
          </button>
        </div>
      </div>
    </div>
  );
}
