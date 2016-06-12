import React from 'react';
import {Modal, Button, Popover, OverlayTrigger, Tooltip, DropdownButton, MenuItem} from 'react-bootstrap';

import LogicTreeActions from '../../actions/LogicTreeActions';

export default class LogicTree_EditModal extends React.Component {

    onClose(){
        LogicTreeActions.closeEditModal();
    }

    render() {
        const {editModal={}, ...props} = this.props;

        let popover = <Popover title="popover" id="10291-21342">very popover. such engagement</Popover>;
        let tooltip = <Tooltip id="10291-21322">wow.</Tooltip>;

        return (
            <Modal show={editModal.showModal} onHide={this.onClose} {...props}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>选择客户选项</h4>
                    <p>
                        <DropdownButton bsStyle='default' title='客户选项' key={'dropdown-basic-1'} id={'dropdown-basic-1'}>
                            <MenuItem eventKey="1">Action</MenuItem>
                            <MenuItem eventKey="2">Another action</MenuItem>
                            <MenuItem eventKey="3" active>Active Item</MenuItem>
                        </DropdownButton>
                    </p>

                    <h4>Popover in a modal</h4>
                    <p>there is a <OverlayTrigger overlay={popover}><a href="#">popover</a></OverlayTrigger> here</p>

                    <h4>Tooltips in a modal</h4>
                    <p>there is a <OverlayTrigger overlay={tooltip}><a href="#">tooltip</a></OverlayTrigger> here</p>

                    <hr />

                    <h4>Overflowing text to show scroll behavior</h4>
                    <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.onClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}