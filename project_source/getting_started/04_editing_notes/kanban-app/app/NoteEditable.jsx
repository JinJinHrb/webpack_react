import React from 'react';

export default ({task, onFinish, onDelete}) => (
  <div>
    <input onBlur={onFinish} defaultValue={task} autoFocus={true} readOnly={false} />
    <button onClick={onDelete}>x</button>
  </div>
);