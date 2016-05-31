import React from 'react';
import uuid from 'uuid';
import AltContainer from 'alt-container';
import Notes from './Notes';
import NoteStore from './stores/NoteStore';
import NoteActions from './actions/NoteActions';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <button className="add-note" onClick={this.addNote}>+</button>
        <AltContainer stores={[NoteStore]} inject={{notes: () => NoteStore.getState().notes}}>
          <Notes onEdit={this.editNote} onDelete={this.deleteNote} onFinish={this.finishEdit} />
        </AltContainer>

      </div>
    );
  }

  addNote = () => {
    NoteActions.create({task: 'New task'});
  }

  editNote = (id, e) => {
    e.stopPropagation();
    NoteActions.updating(id);
  }

  finishEdit = (id, e) =>{
    e.stopPropagation();
    const task = e.target.value;
    NoteActions.update({id, task});
  }

  deleteNote = (id, e) => {
    e.stopPropagation();
    NoteActions.delete(id);
  }

}