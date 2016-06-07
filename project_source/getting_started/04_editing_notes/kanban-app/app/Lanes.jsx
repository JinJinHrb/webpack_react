import React from 'react';
import Lane from './Lane';
import LaneActions from './actions/LaneActions'

export default ({ lanes }) => {
  return (
    <div className="lanes">{lanes.map(lane =>
        <Lane className="lane" key={lane.id} lane={lane} onMove={LaneActions.move2EmptyLane} />
    )}</div>
  );

}
