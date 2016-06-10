import React from 'react';
import uuid from 'uuid';
import AltContainer from 'alt-container';

import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import LaneStore from './stores/LaneStore';
import LaneActions from './actions/LaneActions';
import Lanes from './Lanes';
import {Col} from 'react-bootstrap';

import LogicTree from './components/tree/LogicTree';

@DragDropContext(HTML5Backend)
export default class App extends React.Component {
  render() {
      const appStyle = {width: '98%', margin: 0, padding: 0};
      const colStyle = {border: '1px solid grey', margin: '0.5em', padding: '0 0 0.5em 0'};
      const colHeadStyle = {borderBottom: '1px solid grey', margin: '0 auto 0.5em auto', padding: '0.5em', backgroundColor: '#333', color: 'white'};
    return (
      <div style={appStyle}>
          <Col sm={12} style={colStyle}>
              <Col sm={12} style={colHeadStyle}><span style={{fontSize: '1.2em'}}> 创建全部 Lane </span></Col>
              <Col sm={12}>
                  <button className="add-lane" onClick={this.addLane}> + 添加 </button>
                  <AltContainer stores={[LaneStore]} inject={{lanes: () => LaneStore.getState().lanes}}>
                      <Lanes />
                  </AltContainer>
              </Col>
          </Col>
          <Col sm={12} style={colStyle}>
              <Col sm={12} style={colHeadStyle}><span style={{fontSize: '1.2em'}}> 逻辑树 </span></Col>
              <Col sm={12}>
                    <LogicTree />
              </Col>
          </Col>
      </div>
    );
  }

  addLane = () => {
    LaneActions.create({value: 'New Lane'});
  }

}