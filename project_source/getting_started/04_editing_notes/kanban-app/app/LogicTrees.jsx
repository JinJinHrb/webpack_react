import React from 'react';
import LogicTree from './components/tree/LogicTree';
import LaneActions from './actions/LaneActions'

export default ({ trees, onDel=()=>{} }) => {
  return (
    <div className="trees">{trees.map(obj =>
        <LogicTree key={obj.id} name={obj.name} tree={obj.tree} onDelLogicTree={onDel.bind(null, obj.id)} />
    )}</div>
  );

}
