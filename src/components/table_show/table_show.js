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

let {
  btn_add_visable,
  btn_delete_visable,
  btn_import_visable,
  btn_export_visable,
  btn_search_visable,
  btn_search_jq_visable,
  btn_update_visable,
  btn_show_visable
  } = true;

  let modal_visable=false;
  let modal_title="新增";


class table_show extends Component{
constructor(props){
super(props);
this.state={}


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
    this.modal_visable=false;
  });
};

addClick =()=>{
  console.log("新增");
  this.modal_visable=true;
};

handleCancel = () => {
  this.modal_visable=false;
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
      <Row gutter={24} className="margin-bottom-20">
      <Col sm={16}>
      <Button type='primary' onClick={this.addClick} className={btn_add_visable?'show':'hide'} > 新增</Button>
      <Button type='primary' className={btn_add_visable?'show':'hide'}>批量删除</Button>
      <Button type='primary' className={btn_import_visable?'show':'hide'}>导入</Button>
      <Button type='primary' className={btn_export_visable?'show':'hide'}>导出</Button>
      <Button type='primary' className={btn_search_jq_visable?'show':'hide'}>精确查找</Button>
      </Col>

      <Col sm={8}>
          <Search placeholder="搜索"  addclassName={btn_search_visable?'show':'hide'}></Search>
      </Col>

      </Row>

      <Table columns={columns} dataSource={dataSource} tableLayout="auto">

      </Table>


      <Modal visible={modal_visable=true} title="{modan_title}" okText='提交' cancelText='关闭' onOk={this.handleCancel} onCancel={this.handleCancel}>
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
                          <Form.Item>
                            <Button htmlType='submit'>提交</Button>
                          </Form.Item>
                        </Form>
            </div>
      </Modal>
      </div>
    );
}
}

const TableshowForm = Form.create()(table_show);
export default TableshowForm;