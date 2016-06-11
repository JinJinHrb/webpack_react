import React from 'react';
import Note from './Note';
import NoteEditable from './NoteEditable';
import LaneActions from './actions/LaneActions';

const Notes = ({notes, onEdit, onDelete, onFinish}) => {
    return (
        <ul className="note-ul">{notes.map(note =>
            <Note className="note" id={note.id} key={note.id}
                  editing={note.editing} onMove={LaneActions.move}
            >
                <NoteEditable className="note-wrapper"
                              editing={note.editing}
                              value={note.value}
                              onEdit={onEdit.bind(null, note.id)}
                              onDelete={onDelete.bind(null, note.id)}
                              onFinish={onFinish.bind(null, note.id)}
                />
            </Note>
        )}</ul>
    );
}

Notes.propTypes = {
    notes: React.PropTypes.array,
    onEdit: React.PropTypes.func,
    onDelete: React.PropTypes.func,
    onFinish: React.PropTypes.func
};
Notes.defaultProps = {
    notes: []
};

export default Notes;