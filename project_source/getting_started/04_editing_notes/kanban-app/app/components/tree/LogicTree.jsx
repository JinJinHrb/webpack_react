import './tree.less';
import './basic.less';
import React, {PropTypes} from 'react';
import Tree, {TreeNode} from 'rc-tree';

export default class LogicTree extends React.Component {

    constructor(props) {
        super(props);
        this.defaultExpandedKeys = ['0-0-0-0', '0-0-1'];
        this.defaultSelectedKeys = ['0-0-0-0', '0-0-1'];
        this.defaultCheckedKeys = ['0-0-0-0', '0-0-1'];
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

    onEdit = () => {
        setTimeout(() => {
            console.log('current key: ', this.selKey);
        }, 0);
    }

    onDel = (e) => {
        if (!window.confirm('sure to delete?')) {
            return;
        }
        e.stopPropagation();
    }

    render() {
        const customLabel = (
            <span className="cus-label">
              <span>operations: </span>
              <span style={{color: 'blue'}} onClick={this.onEdit}>Edit</span>
              <span style={{color: 'red'}} onClick={this.onDel}>Delete</span>
            </span>
        );
        return (<div style={{margin: '0 20px'}}>
            <h2>simple</h2>
            <Tree className="myCls" showLine multiple checkable
                  defaultExpandedKeys={this.defaultExpandedKeys}
                  onExpand={this.onExpand}
                  defaultSelectedKeys={this.defaultSelectedKeys}
                  defaultCheckedKeys={this.defaultCheckedKeys}
                  onSelect={this.onSelect} onCheck={this.onCheck}>
                <TreeNode title="parent 1" key="0-0">
                    <TreeNode title={customLabel} key="0-0-0">
                        <TreeNode title="leaf" key="0-0-0-0" />
                        <TreeNode title="leaf" key="0-0-0-1" />
                    </TreeNode>
                    <TreeNode title="parent 1-1" key="0-0-1" disabled>
                        <TreeNode title="parent 1-1-0" key="0-0-1-0" disableCheckbox />
                        <TreeNode title="parent 1-1-1" key="0-0-1-1" />
                    </TreeNode>
                </TreeNode>
            </Tree>
        </div>);
    }

}