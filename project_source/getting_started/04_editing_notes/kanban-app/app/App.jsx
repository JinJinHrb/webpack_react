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
    // It would be possible to write this in an imperative style.
    // I.e., through `this.state.notes.push` and then
    // `this.setState({notes: this.state.notes})` to commit.
    //
    // I tend to favor functional style whenever that makes sense.
    // Even though it might take more code sometimes, I feel
    // the benefits (easy to reason about, no side effects)
    // more than make up for it.
    //
    // Libraries, such as Immutable.js, go a notch further.

    //this.setState({
    //  notes: this.state.notes.concat([{
    //    id: uuid.v4(),
    //    task: 'New task'
    //  }])
    //});

    NoteActions.create({task: 'New task'});
  }

  editNote = (id, e) => {
    e.stopPropagation();
    //if(this.state.editing){
    //  return;
    //}
    //this.setState({
    //  notes: this.state.notes.map(note => {if(note.id === id) note.editable = true; return note;})
    //});
    NoteActions.updating(id);
  }

  finishEdit = (id, e) =>{
    e.stopPropagation();
    const task = e.target.value;

    //this.setState({
    //  notes: this.state.notes.map(note => {if(note.id === id) { note.editable = false; note.task = value;} return note;})
    //  , editing: false
    //});
    NoteActions.update({id, task});
  }

  deleteNote = (id, e) => {
    // Avoid bubbling to edit
    e.stopPropagation();

    //this.setState({
    //  notes: this.state.notes.filter(note => note.id !== id)
    //});
    NoteActions.delete(id);
  }

}