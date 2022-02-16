import React from 'react';

const warningVisibleStyle = {
  backgroundColor: 'red',
  position: 'absolute',
  top: 0,
  visibility: 'visible'
};
const warningNonVisibleStyle = {
  backgroundColor: 'red',
  position: 'absolute',
  top: 0,
  visibility: 'hidden'
};

export default function Warning(props) {
  const { warning } = props;

  return (
    <div style={warning === '' ? warningNonVisibleStyle : warningVisibleStyle}>
      WARNING: {warning}
    </div>
  );
}
