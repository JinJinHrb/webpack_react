import './tree.less';
import './basic.less';
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Tree, {TreeNode} from 'rc-tree';
import Tooltip from 'rc-tooltip';
import assign from 'object-assign';

import NoteEditable from '../../NoteEditable'

import $ from 'jquery';
import {Col} from 'react-bootstrap';

export default class LogicTree extends React.Component {

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

    componentWillUnmount = () => {
        if (this.cmContainer) {
            ReactDOM.unmountComponentAtNode(this.cmContainer);
            document.body.removeChild(this.cmContainer);
            this.cmContainer = null;
        }
    }

    componentDidMount = () => {
        this.getContainer();
        // console.log(ReactDOM.findDOMNode(this), this.cmContainer);
        console.log(this.contains(ReactDOM.findDOMNode(this), this.cmContainer));
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

    renderCm = (info) => {
        if (this.toolTip) {
            ReactDOM.unmountComponentAtNode(this.cmContainer);
            this.toolTip = null;
        }
        this.toolTip = (
            <Tooltip trigger="click" placement="bottomRight" prefixCls="rc-tree-contextmenu"
                     defaultVisible overlay={<h4>{info.node.props.title}</h4>}
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
                let {title, id, isLeaf=true, ...props} = item;
                if( typeof(title) === 'object' ){
                    title = this.customLabelHandler(title);
                }
                if (item.children) {
                    return <TreeNode title={title} key={id}  {...props}>{loop(item.children)}</TreeNode>;
                }
                return <TreeNode title={title} key={id} isLeaf={isLeaf} {...props} />;
            });
        };

        const {name, tree, onDelLogicTree=()=>{}, defaultExpandedKeys=[], defaultSelectedKeys=[], defaultCheckedKeys=[], ...props} = this.props;

        const treeNodes = loop(tree);
        return (<Col sm={12} {...props}>
            <NoteEditable className="tree-header" onDelete={onDelLogicTree} value={name} />
            <Tree className="myCls" showLine multiple checkable
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