import React from 'react';
import uuid from 'uuid';
import AltContainer from 'alt-container';

import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import LaneStore from './stores/LaneStore';
import LaneActions from './actions/LaneActions';
import Lanes from './Lanes';
import {Col} from 'react-bootstrap';

import LogicTrees from './LogicTrees';
import LogicTree from './components/tree/LogicTree';
import LogicTreeStore from './stores/LogicTreeStore';

import LogicTreeActions from './actions/LogicTreeActions';

import EditModal from './components/tree/EditModal';

import $ from 'jquery';

@DragDropContext(HTML5Backend)
export default class App extends React.Component {
    render() {
        const colStyle = {border: '1px solid grey', margin: '0.5em', padding: '0 0 0.5em 0'};
        const colHeadStyle = {borderBottom: '1px solid grey', margin: '0 auto 0.5em auto', padding: '0.5em', backgroundColor: '#333', color: 'white'};
        return (
          <div className="container-fluid">
              <Col sm={12} style={colStyle}>
                  <Col sm={12} style={colHeadStyle}><span style={{fontSize: '1.2em'}}> 创建全部用户组件 </span></Col>
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
                      <button className="add-lane" onClick={this.addLogicTree}> + 添加 </button>
                      <AltContainer stores={[LogicTreeStore]} inject={{trees: () => LogicTreeStore.getState().trees, editModal: () => LogicTreeStore.getState().editModal}}>
                          <LogicTrees onDel={this.deleteLogicTree} onEdit={this.editLogicTree} onFinish={this.finishEditLogicTree} />
                      </AltContainer>
                  </Col>
              </Col>
          </div>
        );
    }

    addLane = () => {
        LaneActions.create({value: 'New Lane'});
    }

    addLogicTree = () => {
        LogicTreeActions.create({name: 'New Logic Tree'});
    }

    deleteLogicTree = (id) => {
        let yes  = confirm('确认删除?');
        if(!yes){
            return;
        }
        LogicTreeActions.delete(id);
    }

    finishEditLogicTree = (id, e) =>{
        e.stopPropagation();
        const name = $.trim(e.target.value);
        if(name === ''){
            LogicTreeActions.updating(id);
            return;
        }
        LogicTreeActions.update({id, name});
    }

    editLogicTree = (id, e) => {
        e.stopPropagation();
        LogicTreeActions.updating(id);
    }

}