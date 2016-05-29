import React from 'react';

export default ({task, onFinish, onDelete}) => (
  <div>
    <input className="note-input" onBlur={onFinish} defaultValue={task} autoFocus={true} readOnly={false}
       ref={ (e) => e ? e.selectionStart = 0/*this.props.task.length*/ : null }
    />
    <button onClick={onDelete}>x</button>
  </div>
);