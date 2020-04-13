import React, { Component } from 'react';
import { Table, Button, Row, Col, Modal, Form, Input, message } from 'antd';
import Search from 'antd/lib/input/Search';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
import BreadcrumbCustom from '../common/BreadcrumbCustom';
import './table.less'
import history from '../common/history';

export default class TableManger extends Component{
constructor(props){
super(props);
this.state={
    visible:false
}

}



 addClick=()=>{
     console.log("dianji");
    this.setState({ visible: true });
 }

 handleCancel = () => {
    this.setState({ visible: false });
};

childClick = (name)=>{
    history.push('/app/strati/tablemanger/child');
}
    
render(){
    const{vistable}=this.state;
    const column=[{
    title:'名称',
    dataIndex:'name',
    key:'name'  
    },{
    title:'描述',
    dataIndex:'desc',
    key:'desc'
    },{
    title:'表名',
    dataIndex:'tablename',
    key:'tablename'  
    },{
    title:'操作',
    dataIndex:'',
    key:'opera',
    render:(name)=>
        <Row>
        <Button type='primary'>查看</Button>
        <Button type='default'>修改</Button>
        <Button type='danger'>删除</Button>
        <Button type='dashed' onClick={()=>this.childClick(name)}>属性管理</Button>
        </Row>
    }]

    const dataSource=[{
        id:1,
        name:'基础数据表',
        desc:'管理基础数据',
        tablename:'TABLE_INIT'
    },{
        id:2,
        name:'动态数据表',
        desc:'管理动态数据',
        tablename:'TABLE_INIT'
    }]
return(
    <div>
        <BreadcrumbCustom paths={['首页','表管理']}/>
    <div>
        <Row gutter={24} className="margin-bottom-20">
        <Col sm={16}>
        <Button type='primary' onClick={this.addClick}> 新增</Button>
        <Button type='primary'>批量删除</Button>
        <Button type='primary'>导入</Button>
        <Button type='primary'>导出</Button>
        <Button type='primary'>精确查找</Button>
        </Col>

        <Col sm={8}>
            <Search placeholder="搜索"></Search>
        </Col>

        </Row>

        <Table columns={column} tableLayout="auto" dataSource={dataSource} >

        </Table>

        <Modal visible={this.state.visible} title="表信息" okText='提交' cancelText='关闭' onOk={this.handleCancel} onCancel={this.handleCancel}>
            <Form layout='horizontal'>
                <FormItem label='名称'>
                <Input></Input>
                </FormItem>

                <FormItem label='描述'>
                <TextArea></TextArea>
                </FormItem>

                <FormItem label='表名'>
                <Input></Input>
                </FormItem>
            </Form>

        </Modal>
        
    </div>
        
    </div>
);
}
	
}
