import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {
    constructor(){
        this.bindActions(NoteActions);

        this.notes = [/*
            {
              id: uuid.v4(),
              task: 'Learn React'
            },
            {
              id: uuid.v4(),
              task: 'Do laundry'
            }
        */];

        this.exportPublicMethods({
            getNotesByIds: this.getNotesByIds.bind(this)
        });

    }

    getNotesByIds(ids) {
        // 1. Make sure we are operating on an array and
        // map over the ids
        // [id, id, id, ...] -> [[Note], [], [Note], ...]
        return (ids || []).map(
            // 2. Extract matching notes
            // [Note, Note, Note] -> [Note, ...] (match) or [] (no match)
            id => this.notes.filter(note => note.id === id)
            // 3. Filter out possible empty arrays and get notes
            // [[Note], [], [Note]] -> [[Note], [Note]] -> [Note, Note]
        ).filter(a => a.length).map(a => a[0]);
    }

    create(note){
        const notes = this.notes;

        note.id = uuid.v4();

        this.setState({
            notes: notes.concat(note)
        });

        return note;
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