import React from 'react';
import LogicNote from './LogicNote';
import NoteEditable from '../../NoteEditable';

import LogicTreeActions from '../../actions/LogicTreeActions';

import Tree, {TreeNode} from 'rc-tree';

export default ({notesExtend})=> (
    <Tree className="parentLogicNotesExtend"
          showLine multiple checkable
    >
        {notesExtend.map((note, idx)=>{
            return <TreeNode title={note.value} key={`parentLogicNotesExtend_${note.id}#${idx}`} isLeaf={true} />;
        })}
    </Tree>
)