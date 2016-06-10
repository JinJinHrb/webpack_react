import './tree.less';
import './basic.less';
import React, {PropTypes} from 'react';
import Tree, {TreeNode} from 'rc-tree';

import NoteEditable from '../../NoteEditable'

import $ from 'jquery';
import {Col} from 'react-bootstrap';

export default class LogicTree extends React.Component {

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
                  onSelect={this.onSelect} onCheck={this.onCheck}>
                {treeNodes}
            </Tree>
        </Col>);
    }

}