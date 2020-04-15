import React, { Component } from 'react'; 
import { TreeSelect } from 'antd';
import axios from 'axios';
const { SHOW_PARENT } = TreeSelect;
/* const data  = []; */
const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0',
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1',
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2',
      },
    ],
  },
];

export default class PrivileDiction extends Component {
  state = {
    value: ['0-0-0'],
  };
  
  //getData
  getData = () => {
      axios.get('/user/getuserlist')
          .then(function (response) {
              console.log(response.data);
              /* this.setState({
                  dataSource: response.data,
                  loading:false
              }) */
          }.bind(this))
          .catch(function (error) {
              console.log(error);
          })
  };

  onChange = value => {
    console.log('onChange ', value);
    this.setState({ value });
	this.getData();
  };

  render() {
    const tProps = {
      treeData,
      onChange: this.onChange,
      treeCheckable: true,
	  treeCheckStrictly: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: '请选择权限！',
	  treeDefaultExpandAll:true,
      style: {
        width: '50%',
      },
    };
    return (
	   <TreeSelect {...tProps} />
	   
	)
  }
}