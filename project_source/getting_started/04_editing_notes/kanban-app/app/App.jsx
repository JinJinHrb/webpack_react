import React from 'react';
import uuid from 'uuid';
import AltContainer from 'alt-container';

import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import LaneStore from './stores/LaneStore';
import LaneActions from './actions/LaneActions';
import Lanes from './Lanes';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <button className="add-lane" onClick={this.addLane}>+</button>
        <AltContainer stores={[LaneStore]} inject={{lanes: () => LaneStore.getState().lanes}}>
          <Lanes />
        </AltContainer>
      </div>
    );
  }

  addLane = () => {
    LaneActions.create({value: 'New Lane'});
  }

  //editLane = (id, e) => {
  //  e.stopPropagation();
  //  LaneActions.updating(id);
  //}
  //
  //finishEditLane = (id, e) =>{
  //  e.stopPropagation();
  //  const task = e.target.value;
  //  LaneActions.update({id, task});
  //}
  //
  //deleteLane = (id, e) => {
  //  e.stopPropagation();
  //  LaneActions.delete(id);
  //}

}