import React from 'react';
import NoteEditable from './NoteEditable';

export default ({ notes, onEdit=()=>{}, onDelete=()=>{}, onFinish=()=>{} }) => {
    //debugger;
  return (
    <ul className="note-ul">{notes.map(note =>
      <li key={note.id}>
          <NoteEditable className="note-wrapper"
                        editing={note.editing}
                        value={note.value}
                        onEdit={onEdit.bind(null, note.id)}
                        onDelete={onDelete.bind(null, note.id)}
                        onFinish={onFinish.bind(null, note.id)}
          />
      </li>
    )}</ul>
  );

}
