import React, { Component } from 'react';
import { Table, Button, Row, Col, Modal, Form, Input ,Radio,Slider, Select} from 'antd';
import Search from 'antd/lib/input/Search';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
import BreadcrumbCustom from '../common/BreadcrumbCustom';
import './table.less'

class Tablechild_Manger extends Component{
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
    
render(){
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    const{vistable}=this.state;
    const column=[{
    title:'名称',
    dataIndex:'showname',
    key:'showname'  
    },
    {title:'字段名称',
    dataIndex:'filedname',
    key:'filedname'  
    },{
    title:'提示信息',
    dataIndex:'desc',
    key:'desc'
    },{
    title:'类型',
    dataIndex:'type',
    key:'type'  
    },{
    title:'是否默认显示',
    dataIndex:'isshow',
    key:'isshow'  
    },{
    title:'是否作为查询条件',
    dataIndex:'issearch',
    key:'issearch'  
    },{
    title:'提交时是否允许为空',
    dataIndex:'isnull',
    key:'isnull'  
    },{
    title:'权重',
    dataIndex:'weight',
    key:'weight'  
    },{
    title:'操作',
    dataIndex:'opera',
    render:(text,recoder)=>
        <Row>
        <Button type='primary'>查看</Button>
        <Button type='default'>修改</Button>
        <Button type='danger'>删除</Button>
        </Row>
    }];

    const dataSource=[{
        id:1,
        showname:'姓名',
        filedname:'name',
        desc:'',
        isshow:true,
        issearch:false,
        type:'INPUT',
        weight:1,
        isnull:false
    },{
        id:2,
        showname:'年龄',
        filedname:'age',
        desc:'',
        isshow:true,
        issearch:false,
        type:'NUMBER',
        weight:1,
        isnull:false
    }]
    const FormItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 },
    };
    return(
    <div>
        <BreadcrumbCustom paths={['首页','表管理','属性管理']}/>
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

        <Table columns={column} tableLayout="auto" dataSource={dataSource}>

        </Table>

        <Modal visible={this.state.visible} title="字段属性" okText='提交' cancelText='关闭' onOk={this.handleCancel} onCancel={this.handleCancel}>
            <Form layout='horizontal'>

            <FormItem label="名称" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('showname', {
                            rules: [{ required: true, message: '请输名称' }],
                        })(
                            <Input placeholder='名称' />
                        )}
            </FormItem>


            <FormItem label="字段名称" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('filedname', {
                            rules: [{ required: true, message: '字段名称' }],
                        })(
                            <Input placeholder='字段名称' />
                        )}
            </FormItem>

            <FormItem label="提示信息" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('desc', {
                            rules: [{ required: false, message: '' }],
                        })(
                            <Input placeholder='提示信息' />
                        )}
            </FormItem>

            <FormItem label="类型" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('type', {
                            rules: [{ required: true, message: '请选择类型' }],
                        })(
                            <Select>
                                <option value='INPUT'>单行文本</option>
                                <option value='TEXTAREA'>多行文本</option>
                                <option value='SELECT'>下拉框</option>
                                <option value='RADIO'>单选</option>
                                <option value='CHECKBOX'>多选</option>
                                <option value='NUMBER'>数字</option>
                                <option value='PHONE'>手机号</option>
                                <option value='CDCARD'>身份证</option>
                                <option value='EMAIL'>邮箱</option>
                                <option value='EDITOR'>编辑器</option>
                                <option value='ADDRESS'>地址</option>
                            </Select>
                        )}
            </FormItem>

            <FormItem label="是否默认显示" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('isshow', {
                            rules: [{ required: true, message: '是否默认显示' }],
                        })(
                            <Radio.Group style={{marginRight: 20}}>
                                <Radio value={true}>是</Radio>
                                <Radio value={false}>否</Radio>      
                            </Radio.Group>
                        )}
            </FormItem>

            <FormItem label="是否作为查询条件" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('issearch', {
                            rules: [{ required: true, message: '是否作为查询条件' }],
                        })(
                            <Radio.Group style={{marginRight: 20}}>
                                <Radio value='true'>是</Radio>
                                <Radio value='false'>否</Radio>      
                            </Radio.Group>
                        )}
            </FormItem>

            <FormItem label="是否允许为空" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('isnull', {
                            rules: [{ required: true, message: '是否允许为空' }],
                        })(
                            <Radio.Group style={{marginRight: 20}}>
                                <Radio value='true'>是</Radio>
                                <Radio value='false'>否</Radio>      
                            </Radio.Group>
                        )}
            </FormItem>


            <FormItem label="是否允许为空" {...FormItemLayout} hasFeedback>
            <Slider disabled={false} defaultValue={0} min={0} max={100} />
            </FormItem>

            </Form>

        </Modal>
        
    </div>
        
    </div>
);
}
	
}



const WrappedRegistrationForm = Form.create()(Tablechild_Manger);
export default WrappedRegistrationForm;

