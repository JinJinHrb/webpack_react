import React from 'react';
import LogicTree from './components/tree/LogicTree';
import LaneActions from './actions/LaneActions'

import LogicTree_EditModal from './components/tree/LogicTree_EditModal';

const LogicTrees = ({ trees, editModal={}, onDel=()=>{}, onEdit=()=>{}, onFinish=()=>{} }) => {
  return (
      <div className="trees">{trees.map(obj =>{
          const {id, ...props} = obj;
          return <LogicTree
              key={id} treeId={id} {...props}
              onDelLogicTree={onDel.bind(null, obj.id)}
              onEditLogicTreeName={onEdit.bind(null, obj.id)}
              onFinishEditLogicTreeName={onFinish.bind(null, obj.id)}
              editingLogicTreeName={obj.editing}
            />
          }
      )}
          <LogicTree_EditModal editModal={editModal} />
      </div>
  );

}

LogicTrees.propTypes = {
  trees: React.PropTypes.array,
  onDel: React.PropTypes.func
};

LogicTrees.defaultProps = {
  notes: [],
  onDel: () => {}
};

export default LogicTrees;