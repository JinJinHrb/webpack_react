import React from 'react';
import LogicNote from './LogicNote';
import NoteEditable from '../../NoteEditable';

import LogicTreeActions from '../../actions/LogicTreeActions';

const LogicNotes = ({logicNotes=[], onDelete=()=>{}, editModal={}}) => {
    return (
        <div className="logic-wrapper">
        {logicNotes.map((note, idx) =>
            <LogicNote className="logic"
                       id={note.id + '#' + idx}
                       key={note.id + '#' + idx}
                       onMove={LogicTreeActions.move}
                       treeId={editModal.treeId}
                       nodeId={editModal.nodeId}
            >
                <NoteEditable
                    value={note.value}
                    editing={note.editing}
                    onEdit={a=>a}
                    onDelete={onDelete.bind(null, editModal, note.id)}
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