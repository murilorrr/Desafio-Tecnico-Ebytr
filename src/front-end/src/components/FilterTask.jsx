import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { stateFilterAction, bodyFilterAction, titleFilterAction } from '../app/slices/filter';

export default function FilterTask() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState('');

  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    if (name === 'titleState') setTitle(value);
    if (name === 'bodyState') setBody(value);
    if (name === 'statusState') setStatus(value);
    return undefined;
  };

  useEffect(() => {
    dispatch(stateFilterAction(status));
    dispatch(bodyFilterAction(body));
    dispatch(titleFilterAction(title));
  }, [status, body, title]);

  return (
    <div style={{ padding: '2em' }}>
      <div className="filters-tasks">
        <div>
          <input
            data-testid="input-Title"
            type="text"
            name="titleState"
            className="form-control"
            id="InputTitle"
            value={title}
            onChange={handleChange}
            placeholder="Filter by Title Task"
          />

          <select
            onChange={handleChange}
            name="statusState"
            value={status}
            className="form-select"
            aria-label="Default select example">
            <option value="pendente">Pendente</option>
            <option value="em andamento">Em andamento</option>
            <option value="pronto">Pronto</option>
          </select>
        </div>

        <div>
          <textarea
            data-testid="input-Body"
            type="text"
            name="bodyState"
            onChange={handleChange}
            className="form-control"
            placeholder="Filter by task description"
            id="floatingTextarea"
            value={body}
          />
        </div>
      </div>
    </div>
  );
}
