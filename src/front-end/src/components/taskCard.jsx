import React from 'react';

export default function TaskCard(props) {
  const { title, body, status, id, your } = props;

  return (
    <div id={id}>
      <h1>{title}</h1>
      <button onClick={() => console.log('clicou')} hidden={!your}>
        X
      </button>
      <p>{body}</p>
      <h3>{status}</h3>
    </div>
  );
}
