import React from 'react';
import LogicTree from './components/tree/LogicTree';
import LaneActions from './actions/LaneActions'

const LogicTrees = ({ trees, onDel=()=>{} }) => {
  return (
      <div className="trees">{trees.map(obj =>
          <LogicTree key={obj.id} treeId={obj.id} name={obj.name} tree={obj.tree} onDelLogicTree={onDel.bind(null, obj.id)} />
      )}</div>
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