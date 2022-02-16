import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { deleteTask, updateTask } from '../api/api';

export default function TaskCard(props) {
  const { your, id, title, body, status } = props;

  const [edit, setEdit] = useState(false);
  const [titleEdit, setTitleEdit] = useState(title);
  const [bodyEdit, setBodyEdit] = useState(body);
  const [statusEdit, setStatusEdit] = useState(status);

  const token = localStorage.getItem('token');

  function deleteTaskById() {
    // deleta do banco de dados com requisição da API
    deleteTask(token, id);
    document.getElementById(id).remove();
  }

  const editCard = () => {
    const handleChange = ({ target }) => {
      const { name, value } = target;
      if (name === 'title') setTitleEdit(value);
      if (name === 'body') setBodyEdit(value);
      if (name === 'status') setStatusEdit(value);
      return undefined;
    };

    return (
      <div
        style={{ padding: '10px', backgroundColor: '#66CCCC', border: '1px solid black' }}
        id={id}>
        <div style={{ display: 'flex' }}>
          <input
            data-testid="input-Title"
            type="text"
            name="title"
            className="form-control"
            id="InputTitle"
            value={titleEdit}
            onChange={handleChange}
            placeholder="Enter Title Task"
          />
          <select
            onChange={handleChange}
            name="status"
            value={statusEdit}
            className="form-select custom-select"
            aria-label="Default select example">
            <option value="pendente">Pendente</option>
            <option value="em andamento">Em andamento</option>
            <option value="pronto">Pronto</option>
          </select>
        </div>
        <textarea
          data-testid="input-Body"
          type="text"
          name="body"
          onChange={handleChange}
          className="form-control"
          placeholder="Task description"
          id="floatingTextarea"
          value={bodyEdit}
        />

        <div className="buttons">
          <button
            className="btn btn-danger submit-btn"
            type="button"
            onClick={deleteTaskById}
            hidden={!your}>
            DELETE
          </button>
          <button
            className="btn btn-success submit-btn"
            type="button"
            onClick={() => {
              // troca o h1 e p por select e input
              updateTask({ title: titleEdit, body: bodyEdit, status: statusEdit }, token, id);
              setEdit(false);
            }}
            hidden={!your}>
            EDITED
          </button>
        </div>
      </div>
    );
  };

  const defaultCard = () => {
    return (
      <div
        style={{ padding: '10px', backgroundColor: '#66CCCC', border: '1px solid black' }}
        id={id}>
        <div style={{ display: 'flex' }}>
          <h1>Title: {titleEdit}</h1>
          <h3 style={{ marginLeft: 'auto' }}>{statusEdit}</h3>
        </div>
        <p> {bodyEdit}</p>
        <div className="buttons">
          <button
            className="btn btn-danger submit-btn"
            type="button"
            onClick={deleteTaskById}
            hidden={!your}>
            DELETE
          </button>
          <button
            type="button"
            className="btn btn-warning submit-btn"
            onClick={() => {
              setEdit(true);
            }}
            hidden={!your}>
            EDIT
          </button>
        </div>
      </div>
    );
  };

  if (edit) return editCard();
  return defaultCard();
}

TaskCard.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  your: PropTypes.bool.isRequired
};
