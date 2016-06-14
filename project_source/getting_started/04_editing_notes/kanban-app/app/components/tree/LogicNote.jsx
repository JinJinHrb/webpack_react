import React from 'react';
import {DragSource, DropTarget} from 'react-dnd';
import ItemTypes from '../../constants/itemTypes';

const noteSource = {
    beginDrag(props) {
        return {id: props.id, treeId: props.treeId, nodeId: props.nodeId};
    }
    , isDragging(props, monitor) {
        return props.id === monitor.getItem().id;
    }
}

const noteTarget = {
    hover(targetProps, monitor) {
        const targetId = targetProps.id;
        const sourceProps = monitor.getItem();
        const sourceId = sourceProps.id;
        const treeId = sourceProps.treeId;
        const nodeId = sourceProps.nodeId;
        if(sourceId !== targetId) {
            targetProps.onMove({sourceId, targetId, treeId, nodeId});
        }
    }

};

@DragSource(ItemTypes.LOGIC, noteSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging() // map isDragging() state to isDragging prop
}))
@DropTarget(ItemTypes.LOGIC, noteTarget, (connect) => ({
    connectDropTarget: connect.dropTarget()
}))
export default class LogicNote extends React.Component {
    render() {
        const {connectDragSource, connectDropTarget, isDragging, onMove, id, editing, ...props} = this.props;
        // Pass through if we are editing
        const dragSource = editing ? a => a : connectDragSource;
        return dragSource(connectDropTarget(
            <div {...props} style={{ opacity: isDragging ? 0 : 1 }}>{this.props.children}</div>
        ));
    }
}
