import React from 'react';
import PropTypes from 'prop-types';

export default function TaskCard(props) {
  const { title, body, status, id, your } = props;

  return (
    <div id={id}>
      <h1>{title}</h1>
      <button type="button" onClick={() => console.log('clicou')} hidden={!your}>
        X
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
