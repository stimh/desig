import React, { Component } from 'react';
import {setCookie} from "../../helpers/cookies";
import '../../style/login.less';
import { Form, Icon, Input, Button, Checkbox, message, Spin } from 'antd';
const FormItem = Form.Item;

const client_id = 'b7f8065ab0c7188c2a21';
const users = [{
    username:'admin',
    password:'admin'
},{ 
    username:'zysoft',
    password:'zysoft'
}];

function PatchUser(values) {  //匹配用户
    const {username, password} = values;
    return users.find(user => user.username === username && user.password === password);
}

class NormalLoginForm extends Component {
    state = {
        isLoding:false,
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                if(PatchUser(values)){
                    this.setState({
                        isLoding: true,
                    });

                    setCookie('mspa_user',JSON.stringify(values));
                    message.success('登陆成功!'); //成功信息
                    let that = this;
                    setTimeout(function() { //延迟进入
                        that.props.history.push({pathname:'/app',state:values});
                    }, 500);

                }else{
                    message.error('登陆失败'); //失败信息
                }
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            this.state.isLoding?<Spin size="large" className="loading" />:
            <div className="login">
                 
                <div className="login-form">
                    <div className="login-name">数据上报管理系统</div>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '500px'}}>
                        <FormItem>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名 (admin)" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码 (admin)" />
                            )}
                        </FormItem>
                        <FormItem style={{marginBottom:'0'}}>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}
                            <a className="login-form-forgot" href="" style={{float:'right'}}>忘记密码?</a>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                登录
                            </Button>
                           
                        </FormItem>
                    </Form>
                   
                </div>
            </div>
        );
    }
}

const Login = Form.create()(NormalLoginForm);
export default Login;