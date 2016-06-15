import React from 'react';
import LogicNote from './LogicNote';
import NoteEditable from '../../NoteEditable';

import LogicTreeActions from '../../actions/LogicTreeActions';
import ParentLogicNotesExtend from './ParentLogicNotesExtend';

const LogicNotes = ({ parentNodes=[], onCheckParentLogicNoteTree=()=>{}, editModal={}, parentLogicCheckObj={} }) => {

    const parentNode = parentNodes[0];
    if(!parentNode){
        return null;
    }
    const logicNotes = parentNode.logicNotes;
    return (
        <div>
            <hr />
            <h5>设置客户进入当前节点的条件</h5>
            {
            logicNotes.map(lane =>
                <div id={lane.id} key={lane.id}>
                    <span>{lane.value}</span>
                    <ParentLogicNotesExtend
                        notesExtend={lane.notesExtend}
                        onCheck={onCheckParentLogicNoteTree.bind(null, {laneId: lane.id, nodeId: editModal.nodeId, treeId: editModal.treeId})}
                        parentLogicChecks={parentLogicCheckObj[lane.id]}
                    />
                </div>
            )
        }</div>
    );
}

LogicNotes.propTypes = {
    parentNodes: React.PropTypes.array
    , editModal: React.PropTypes.object
    , parentLogicCheckObj: React.PropTypes.object
    //onDelete: React.PropTypes.func,
    //editModal: React.PropTypes.object
};

LogicNotes.defaultProps = {
    parentNodes: [],
    editModal: {},
    parentLogicCheckObj: {}
};

export default LogicNotes;