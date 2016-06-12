import React from 'react';
import LogicTree from './components/tree/LogicTree';
import LaneActions from './actions/LaneActions'

import LogicTree_EditModal from './components/tree/LogicTree_EditModal';

const LogicTrees = ({ trees, editModal={}, onDel=()=>{} }) => {
  return (
      <div className="trees">{trees.map(obj =>{
          const {id, name, tree, ...props} = obj;
          return <LogicTree key={id} treeId={id} name={name} tree={tree} {...props} onDelLogicTree={onDel.bind(null, obj.id)} />
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