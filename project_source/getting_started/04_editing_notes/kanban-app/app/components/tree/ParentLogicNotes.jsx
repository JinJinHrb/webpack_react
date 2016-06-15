import React from 'react';
import LogicNote from './LogicNote';
import NoteEditable from '../../NoteEditable';

import LogicTreeActions from '../../actions/LogicTreeActions';
import ParentLogicNotesExtend from './ParentLogicNotesExtend';

const LogicNotes = ({parentNodes=[]}) => {

    const parentNode = parentNodes[0];
    if(!parentNode){
        return null;
    }
    const logicNotes = parentNode.logicNotes;
    return (
        <div>
            <hr />
            <h5>父节点的客户选项设置进入当前节点的条件</h5>
            {
            logicNotes.map(note =>
                <div id={note.id} key={note.id}>
                    <span>{note.value}</span>
                    <ParentLogicNotesExtend notesExtend={note.notesExtend} />
                </div>
            )
        }</div>
    );
}

LogicNotes.propTypes = {
    parentNodes: React.PropTypes.array
    //onDelete: React.PropTypes.func,
    //editModal: React.PropTypes.object
};

LogicNotes.defaultProps = {
    parentNodes: []
};

export default LogicNotes;