import React from 'react';

export default ({task, onEdit, onDelete}) => (
  <div>
    <span onClick={onEdit}>{task}</span>
    <button onClick={onDelete}>x</button>
  </div>
);