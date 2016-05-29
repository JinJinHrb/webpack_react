import React from 'react';
import Note from './Note';
import NoteEditable from './NoteEditable';

export default ({ notes, onEdit=()=>{}, onDelete=()=>{}, onFinish=()=>{} }) => {

  return (
    <ul className="note-ul">{notes.map(({id, task, editable}) =>
      <li key={id}>
          {generateNote(id, task, editable, onEdit, onDelete, onFinish)}
      </li>
    )}</ul>
  );

}

var generateNote = (id, task, editable, onEdit=()=>{}, onDelete=()=>{}, onFinish=()=>{}) => {
    if(editable){
        return <NoteEditable onFinish={onFinish.bind(null, id)} onDelete={onDelete.bind(null, id)} task={task} />
    }
    return <Note onEdit={onEdit.bind(null, id)} onDelete={onDelete.bind(null, id)} task={task} />
}