import React from 'react';
import LogicNote from './LogicNote';
import NoteEditable from '../../NoteEditable';

import LogicTreeActions from '../../actions/LogicTreeActions';

import Tree, {TreeNode} from 'rc-tree';

export default ({notesExtend, onCheck=()=>{}, parentLogicChecks=[]})=> {

    if( !(notesExtend instanceof Array) || notesExtend.length<0){
        return null;
    }
    const notes = notesExtend[0];
    return <Tree className="parentLogicNotesExtend"
                 showLine multiple checkable
                 onCheck={onCheck}
                 defaultCheckedKeys={parentLogicChecks}
    >
        {notes.map((note)=>{
            return <TreeNode title={note.value} key={note.id} isLeaf={true} />;
        })}
    </Tree>
}