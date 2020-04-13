import React, { Component } from 'react'; 
import {Card,Form,Input,Tooltip,Icon,Cascader,Select,Row,Col,Checkbox,Button,AutoComplete,
} from 'antd';
import BreadcrumbCustom from '../common/BreadcrumbCustom';
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class UpPassword extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('您输入的两个密码不一致！');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
		<div>
		   <BreadcrumbCustom paths={['首页','密码修改']}/>
		   <Card style={{cursor:'pointer', marginBottom:16}}>
		      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
		        <Form.Item label="旧密码">
		          {getFieldDecorator('oldPassword', {
		            rules: [
		              {
		                required: true,
		                message: '请输入旧密码！',
		              },
		            ],
		          })(<Input />)}
		        </Form.Item>
		        <Form.Item label="新密码" hasFeedback>
		          {getFieldDecorator('password', {
		            rules: [
		              {
		                required: true,
		                message: '请输入新密码!',
		              },
		              {
		                validator: this.validateToNextPassword,
		              },
		            ],
		          })(<Input.Password />)}
		        </Form.Item>
		        <Form.Item label="确认新密码" hasFeedback>
		          {getFieldDecorator('confirm', {
		            rules: [
		              {
		                required: true,
		                message: '请确认新密码!',
		              },
		              {
		                validator: this.compareToFirstPassword,
		              },
		            ],
		          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
		        </Form.Item>
		       
		        <Form.Item {...tailFormItemLayout}>
		          <Button type="primary" htmlType="submit">
		            提交
		          </Button>
		        </Form.Item>
		      </Form>
		   </Card>
		</div>
    );
  }
}
export default Form.create()(UpPassword)