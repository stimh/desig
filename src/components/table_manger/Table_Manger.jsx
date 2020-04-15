import React, { Component } from 'react';
import { Table, Button, Row, Col, Modal, Form, Input, message } from 'antd';
import Search from 'antd/lib/input/Search';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
import BreadcrumbCustom from '../common/BreadcrumbCustom';
import './table.less'
import history from '../common/history';
import request from '../common/api';

const column=[{
    title:'名称',
    dataIndex:'TITLE',
    key:'TITLE'  
    },{
    title:'描述',
    dataIndex:'DESCRIBE',
    key:'DESCRIBE'
    },{
    title:'表名',
    dataIndex:'TABLENAME',
    key:'TABLENAME'  
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


class TableManger extends Component{
constructor(props){
super(props);
this.state={
    visible:false,
    dataSource:[]
}
}

componentDidMount(){
    //查询数据
    this.btn_search();
}

 /**
  * 查询所有
  */
 btn_search=()=>{
 console.log("加载数据");
 request({
     url:'/tablemanager',
     method:'get',
     data:""
    }).then(res=>{
     console.log("返回结果");    
     console.log(res);  
     this.setState({
     dataSource:res
     }) 
     console.log(this.state);
    }).catch(function(ex){
     console.log("异常");   
     console.log(ex);
    })
 }

 //新增
 addClick=()=>{
    this.setState({ visible: true });
 }

 //提交
 addSubmit=e=>{
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
    if (!err) {
    console.log('Received values of form: ', values);
    request({
        url:'/tablemanager',
        method:'post',
        data:values
    }).then(res=>{
        this.btn_search();
    })

    }
    this.setState({ visible: false });
    });
 }

 //关闭
 handleCancel = () => {
    this.setState({ visible: false });
};


//属性管理
childClick = (name)=>{
    history.push('/app/strati/tablemanger/child');
}
    
render(){
    const{vistable}=this.state;
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;


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

        <Table columns={column} tableLayout="auto" dataSource={this.state.dataSource} >

        </Table>

        <Modal visible={this.state.visible} title="表信息" okText='提交' cancelText='关闭' onOk={this.addSubmit} onCancel={this.handleCancel}>
            <Form layout='horizontal'>
                <FormItem label="名称"  hasFeedback>
                        {getFieldDecorator('TITLE', {
                            rules: [{ required: true, message: '请输名称' }],
                        })(
                            <Input placeholder='名称' />
                        )}
                </FormItem>

                <FormItem label="描述"  hasFeedback>
                        {getFieldDecorator('DESCRIBE', {
                            rules: [{ required: false}],
                        })(
                            <TextArea></TextArea>
                        )}
                </FormItem>

                <FormItem label="表名"  hasFeedback>
                        {getFieldDecorator('TABLENAME', {
                            rules: [{ required: false}],
                        })(
                            <Input></Input>
                        )}
                </FormItem>
            </Form>
        </Modal>
    </div>
        
    </div>
);
}
	
}

const TableMangerForm = Form.create()(TableManger);
export default TableMangerForm;