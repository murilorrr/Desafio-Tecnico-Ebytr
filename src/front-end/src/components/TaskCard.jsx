import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../api/api';
import { deleteTaskAction } from '../app/slices/task';

export default function TaskCard(props) {
  const { title, body, status, id, your } = props;

  const task = { title, body, status, id, your };

  const dispatch = useDispatch();

  const token = localStorage.getItem('token');

  function deleteTaskById() {
    // deleta do banco de dados com requisição da API
    deleteTask(token, id);
    // deleta do state global
    dispatch(deleteTaskAction(task));
  }

  return (
    <div id={id}>
      <h1>{title}</h1>
      <button type="button" onClick={deleteTaskById} hidden={!your}>
        X
      </button>
      <button type="button" onClick={() => console.log('clicou')} hidden={!your}>
        O
      </button>
      <p>{body}</p>
      <h3>{status}</h3>
    </div>
  );
}

TaskCard.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  your: PropTypes.bool.isRequired
};
