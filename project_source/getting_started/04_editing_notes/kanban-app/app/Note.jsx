import React from 'react';

export default ({task, onEdit, onDelete}) => (
  <div className="note-wrapper">
    <span className="note" onDoubleClick={onEdit}>{task}</span>
    <button className="delete-note" onClick={onDelete}>x</button>
  </div>
);