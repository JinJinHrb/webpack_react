import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {
    constructor(){
        this.bindActions(NoteActions);

        this.notes = [
            {
              id: uuid.v4(),
              task: 'Learn React'
            },
            {
              id: uuid.v4(),
              task: 'Do laundry'
            }
        ];
    }

    create(note){
        const notes = this.notes;

        note.id = uuid.v4();

        this.setState({
            notes: notes.concat(note)
        });
    }

    updating(id){
        const notes = this.notes.map(note => {
            if(note.id === id){
                note.editable = true;
            }
            return note;
        });

        this.setState({notes});
    }

    update(updatedNote){
        const notes = this.notes.map(note => {
            if(note.id === updatedNote.id){
                note.editable = false;
                return Object.assign({}, note, updatedNote);
            }
            return note;
        });

        this.setState({notes});
    }

    delete(id){
        this.setState({
            notes: this.notes.filter(note => note.id !== id )
        })
    }
}

export default alt.createStore(NoteStore, 'NoteStore');