import React from 'react';
import {Modal, Button, OverlayTrigger} from 'react-bootstrap';
import LogicTree_EditModal from './LogicTree_EditModal';

const EditModal = React.createClass({

    getInitialState() {
        return { showModal: false };
    },

    close() {
        this.setState({ showModal: false });
    },

    open() {
        this.setState({ showModal: true });
    },

    render() {
        return (
            <div>
                <p>Click to get the full Modal experience!</p>

                <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={this.open}
                >
                    Launch demo modal
                </Button>

                <LogicTree_EditModal showModal={this.state.showModal} onClose={this.close} bsSize="middle" />
            </div>
        );
    }
});

export default EditModal;