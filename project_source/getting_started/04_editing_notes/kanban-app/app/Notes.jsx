import React from 'react';
import Note from './Note';
import NoteEditable from './NoteEditable';

export default ({ notes, onEdit=()=>{}, onDelete=()=>{}, onFinish=()=>{} }) => {

  return (
    <ul>{notes.map(({id, task, editable}) =>
      <li key={id}>
          {editable?
              <NoteEditable onFinish={onFinish.bind(null, id)} onDelete={onDelete.bind(null, id)} task={task} />
              :
              <Note onEdit={onEdit.bind(null, id)} onDelete={onDelete.bind(null, id)} task={task} />
          }
      </li>
    )}</ul>
  );
}