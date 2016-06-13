import React from 'react';
import LogicNote from './LogicNote';
import NoteEditable from '../../NoteEditable';

const LogicNotes = ({logicNotes=[], onDelete=()=>{}}) => {
    return (
        <div className="logic-wrapper">
        {logicNotes.map((note, idx) =>
            <LogicNote className="logic" id={note.id + '#' + idx} key={note.id + '#' + idx}>
                <NoteEditable
                    value={note.value}
                    editing={note.editing}
                    onEdit={a=>a}
                    onDelete={onDelete.bind(null, note.id)}
                    onFinish={a=>a}
                    arrow={<span> => </span>}
                />
            </LogicNote>
        )}
        </div>
    );
}

//LogicNotes.propTypes = {
//    notes: React.PropTypes.array,
//    onEdit: React.PropTypes.func,
//    onDelete: React.PropTypes.func,
//    onFinish: React.PropTypes.func
//};
//
//LogicNotes.defaultProps = {
//    notes: []
//};

export default LogicNotes;