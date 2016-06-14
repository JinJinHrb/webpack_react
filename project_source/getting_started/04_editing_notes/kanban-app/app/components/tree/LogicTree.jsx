import './contextmenu.less';
import './tree.less';
import './basic.less';
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Tree, {TreeNode} from 'rc-tree';
import Tooltip from 'rc-tooltip';
import assign from 'object-assign';

import NoteEditable from '../../NoteEditable';

import LogicTreeActions from '../../actions/LogicTreeActions';

import $ from 'jquery';
import {Col, Button} from 'react-bootstrap';

export default class LogicTree extends React.Component {

    /* triggered after initial rendering */
    componentDidMount = () => {
        this.getContainer();
        // console.log(ReactDOM.findDOMNode(this), this.cmContainer);
        console.log(this.contains(ReactDOM.findDOMNode(this), this.cmContainer));
    }

    /* triggered just before a component is unmounted from the DOM */
    componentWillUnmount = () => {
        if (this.cmContainer) {
            ReactDOM.unmountComponentAtNode(this.cmContainer);
            document.body.removeChild(this.cmContainer);
            this.cmContainer = null;
        }
    }

    contains = (root, n) => {
        let node = n;
        while (node) {
            if (node === root) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    }

    getContainer = () => {
        if (!this.cmContainer) {
            this.cmContainer = document.createElement('div');
            document.body.appendChild(this.cmContainer);
        }
        return this.cmContainer;
    }

    onExpand = (expandedKeys) => {
        console.log('onExpand', expandedKeys, arguments);
    }

    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
        this.selKey = info.node.props.eventKey;
    }

    onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
    }

    onEdit = (e) => {
        e.stopPropagation();
        setTimeout(() => {
            console.log('current key: ', this.selKey);
        }, 0);
    }

    onDel = (e) => {
        e.stopPropagation();
        if (!window.confirm('确认删除?')) {
            return;
        }

    }

    customLabelHandler = (obj) => {
        const {text, hasEdit, editStyle={}, hasDelete, deleteStyle={}, ...prop} = obj;
        return (
            <span className="cus-label">
              <span>{text}</span>
                {hasEdit? <span style={editStyle} onClick={this.onEdit}>编辑</span>:''}
                {hasDelete? <span style={deleteStyle} onClick={this.onDel}>删除</span>:''}
            </span>
        )
    }

    onRightClick = (info) => {
        this.renderCm(info);
    }

    editTreeNode = (nodeId) => {
        LogicTreeActions.openEditModal(this.props.treeId, nodeId);
        this.cleanCmContainer();
    }

    deleteTreeNode = (nodeId) => {
        LogicTreeActions.deleteNode(this.props.treeId, nodeId);
        this.cleanCmContainer();
    }

    addTreeNode = (nodeId) => {
        if(!this.counter){
            this.counter = 0;
        }
        this.counter++;
        LogicTreeActions.add(this.props.treeId, nodeId, this.counter);
        this.cleanCmContainer();
    }

    cleanCmContainer = () => {
        if (this.toolTip) {
            ReactDOM.unmountComponentAtNode(this.cmContainer);
            this.toolTip = null;
        }
    }

    renderCm = (info) => {
        this.cleanCmContainer();
        const selKey = info.node.props.eventKey;
        const isRoot = info.node.props.isRoot;
        const overLay = (
            <span>
                <Button bsSize="xsmall" className="edit" onClick={this.editTreeNode.bind(null, selKey)}>编&emsp;辑</Button>
                <Button bsSize="xsmall" bsStyle="success" onClick={this.addTreeNode.bind(null, selKey)}>+ 添加</Button>
                {isRoot? '' : <Button bsSize="xsmall" bsStyle="danger" onClick={this.deleteTreeNode.bind(null, selKey)}>&#8209; 删除</Button>}
            </span>
        )
        this.toolTip = (
            <Tooltip trigger="click" placement="bottomRight" prefixCls="rc-tree-contextmenu"
                     defaultVisible overlay={overLay}
            >
                <span></span>
            </Tooltip>
        );

        const container = this.getContainer();
        assign(this.cmContainer.style, {
            position: 'absolute',
            left: info.event.pageX + 'px',
            top: info.event.pageY + 'px'
        });

        ReactDOM.render(this.toolTip, container);
    }

    render() {
        const loop = (data) => {
            if(!data){
                return;
            }
            return data.map((item) => {
                let {title, id, isLeaf=true, logicNotes, ...props} = item;
                if( typeof(title) === 'object' ){
                    title = this.customLabelHandler(title);
                }
                if( (logicNotes instanceof Array) && logicNotes.length>0 ){
                    const someLogicNotes = logicNotes.map((note, index)=>{
                        if(index>5){
                            return null;
                        }
                        return note.value;
                    }).filter(a=>a!==null); // 只显示 5 条
                    title = someLogicNotes.join('=>');
                    if(logicNotes.length > someLogicNotes.length){
                        title += '...';
                    }
                }
                if (item.children) {
                    return <TreeNode title={title} key={id} {...props}>{loop(item.children)}</TreeNode>;
                }
                return <TreeNode title={title} key={id} isLeaf={isLeaf} {...props} />;
            });
        };

        const {name, tree, onDelLogicTree=()=>{}, onEditLogicTreeName=()=>{}, onFinishEditLogicTreeName=()=>{}, defaultExpandedKeys=[], defaultSelectedKeys=[], defaultCheckedKeys=[], editingLogicTreeName, ...props} = this.props;
        const treeNodes = loop(tree);
        return (<Col className="treeWrapper" sm={12}>
            <NoteEditable
                className="tree-header"
                onDelete={onDelLogicTree}
                onEdit={onEditLogicTreeName}
                onFinish={onFinishEditLogicTreeName}
                editing={editingLogicTreeName}
                value={name}
            />
            <Tree className="myCls" {...props}
                  showLine multiple checkable
                  defaultExpandedKeys={defaultExpandedKeys}
                  onExpand={this.onExpand}
                  defaultSelectedKeys={defaultSelectedKeys}
                  defaultCheckedKeys={defaultCheckedKeys}
                  onSelect={this.onSelect} onCheck={this.onCheck}
                  onRightClick={this.onRightClick}
            >
                {treeNodes}
            </Tree>
        </Col>);
    }

}