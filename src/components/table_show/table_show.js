import React,{Component} from 'react'
import {Row,Col,Button, Table, Modal,Form,Input,Radio} from 'antd'
import Search from 'antd/lib/input/Search';
import  './table_show.less';
import '../../index.css'


let FromData = {
  "code": 0,
  "itemList": [{
      "itemId": 65,
      "itemName": "审核意见",
      "itemNameEn": "shyj",
      "type": "TEXT",
      "options": "",
      "optionsEn": "",
      "ifrequire": 1,
      "listOrder": 1,
      "val": ""
  }, {
      "itemId": 66,
      "itemName": "审核结果",
      "itemNameEn": "shjg",
      "type": "RADIO",
      "options": "PASS:通过\r\nNOT_PASS:不通过",
      "optionsEn": "NOT_PASS:Not Pass",
      "ifrequire": 1,
      "listOrder": 2,
      "val": ""
  }]
}

class table_show extends Component{
constructor(props){
super(props);
this.state={
  modal_visable:false,
  modal_title:'新增',
  btn_add_visable:true,
  btn_delete_visable:false,
  btn_import_visable:false,
  btn_export_visable:false,
  btn_search_visable:false,
  btn_search_jq_visable:false,
  btn_update_visable:false,
  btn_show_visable:false
}
}

componentDidMount() {
  console.log(FromData)
}

onChange =(value)=>{

}

handleSubmit = e => {
  e.preventDefault();
  this.props.form.validateFieldsAndScroll((err, values) => {
    if (!err) {
      console.log('Received values of form: ', values);
    }
    this.setState({
      modal_visable:false
    })
  });
};

addClick =()=>{
  console.log("新增");
  this.setState({
    modal_visable:true
  })
};

handleCancel = () => {
  this.setState({
    modal_visable:false
  })
};

render(){

    const columns=[{
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

    const {getFieldDecorator } = this.props.form;

    return(
      <div>
      <Row gutter={24} className="margin-bottom-20 margin-top-30">
      <Col sm={16}>
      <Button type='primary' onClick={this.addClick}  className={this.state.btn_add_visable?'show':'hide'} > 新增</Button>
      <Button type='primary' className={this.state.btn_add_visable?'show':'hide'}>批量删除</Button>
      <Button type='primary' className={this.state.btn_import_visable?'show':'hide'}>导入</Button>
      <Button type='primary' className={this.state.btn_export_visable?'show':'hide'}>导出</Button>
      <Button type='primary' className={this.state.btn_search_jq_visable?'show':'hide'}>精确查找</Button>
      </Col>

      <Col sm={8}>
          <Search placeholder="搜索"  className={this.state.btn_search_visable?'show':'hide'}></Search>
      </Col>

      </Row>

      <Modal visible={this.state.modal_visable} title={this.state.modal_title} okText='提交' cancelText='关闭' onOk={this.handleCancel} onCancel={this.handleCancel}>
            <div id="analysisTree">
                        <Form onSubmit={this.handleSubmit}>
                          {
                                FromData.itemList.map((data,i)=>{
                                switch (data.type){
                                    case 'TEXT':
                                            return(
                                                <Form.Item label={data.itemName}>
                                                    {getFieldDecorator(JSON.stringify(data.itemId),{
                                                        rules: [{
                                                            required: true, 
                                                            message: '请填写正确的' + data.itemName}],
                                                    })(
                                                        <Input style={{ width: 230 }} />
                                                    )}
                                            </Form.Item>
                                            );
                                        case 'RADIO':
                                        return(
                                            <Form.Item label={data.itemName}>
                                                    {getFieldDecorator(JSON.stringify(data.itemId),{
                                                        rules: [{
                                                            required: true, 
                                                            message: '请填写正确的' + data.itemName}],
                                                    })(
                                                        <Radio.Group style={{ width: 230 }} onChange={this.onChange} >
                                                                <Radio  value={0}>完成</Radio>
                                                                <Radio  value={1}>未完成</Radio>
                                                        </Radio.Group>
                                                    )}
                                            </Form.Item>
                                        );
                                        default :
                                    return '';
                               }
                            })
                          }
                  </Form>
            </div>
      </Modal>


      <Table columns={columns} dataSource={dataSource} tableLayout="auto">

      </Table>


      
      </div>
    );
}
}

const TableshowForm = Form.create()(table_show);
export default TableshowForm;