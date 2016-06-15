import React from 'react';
import {Modal, Button, Popover, OverlayTrigger, Tooltip, DropdownButton, MenuItem} from 'react-bootstrap';

import AltContainer from 'alt-container';

import LogicTreeActions from '../../actions/LogicTreeActions';
import LaneStore from '../../stores/LaneStore';

import LogicTreeStore from '../../stores/LogicTreeStore';

import $ from 'jquery';

import NoteEditable from '../../NoteEditable';
import LogicNotes from './LogicNotes';
import LogicNote from './LogicNote';

import ParentLogicNotes from './ParentLogicNotes';

export default class LogicTree_EditModal extends React.Component {

    onClose(){
        LogicTreeActions.closeEditModal();
    }

    generateMenuItems = (array, prefix) => {
        prefix = $.trim(prefix);
        return array.map(({id, value})=><MenuItem bsSize="sm" key={`${prefix}${id}`} eventKey={`${prefix}${id}`}>{value}</MenuItem>)
    }
    
    onSelect4DropdownCustomerQuestion({treeId, nodeId}, eventKey, event) {
        if( typeof(eventKey) !== 'string' ){
            return;
        }
        const options = eventKey.split('_');
        const type = options[0];
        const id = options[1];
        if(!type || !id){
            return;
        }
        if(type === 'lane'){
            const lanes = LaneStore.getLanesById(id);
            if(!lanes[0]){
                return;
            }
            LogicTreeActions.addLogicNote(treeId, nodeId, lanes);
        }
    }

    deleteLogicNote({treeId, nodeId}, logicNoteId){
        LogicTreeActions.deleteLogicNote(treeId, nodeId, logicNoteId)
    }

    onCheckParentLogicNoteTree(laneId, checkedKeys, info){
        console.log('laneId', laneId)
        console.log('checkedKeys', checkedKeys)
        console.log('info', info)
    }

    render() {
        const {editModal={}, ...props} = this.props;

        const lanes = LaneStore.getAllLanes();

        return (
            <Modal show={editModal.showModal} onHide={this.onClose} {...props}>
                <Modal.Header closeButton>
                    <Modal.Title>编辑选中的逻辑树节点</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>设置客户选项</h5>
                    <DropdownButton bsStyle={'default'} bsSize={'sm'} title={'客户选项'} key={'dropdown-customer-question'} id={'dropdown-customer-question'}
                        onSelect={this.onSelect4DropdownCustomerQuestion.bind(null, editModal)}
                    >
                        {this.generateMenuItems(lanes, 'lane_')}
                    </DropdownButton>

                    <hr />

                    <h5>客户选项排序</h5>
                    <AltContainer
                        stores={[LogicTreeStore]}
                        inject={{ logicNotes: () => LogicTreeStore.getLogicNotes(editModal.treeId, editModal.nodeId) }}
                    >
                        <LogicNotes onDelete={this.deleteLogicNote} editModal={editModal} />
                    </AltContainer>

                    <AltContainer
                        stores={[LogicTreeStore]}
                        inject={{ parentNodes: () => LogicTreeStore.getParentNode(editModal.treeId, editModal.nodeId) }}
                    >
                        <ParentLogicNotes onCheckParentLogicNoteTree={this.onCheckParentLogicNoteTree} />
                    </AltContainer>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.onClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}