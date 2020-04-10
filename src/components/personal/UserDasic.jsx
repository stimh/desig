import React, { Component } from 'react'; 
import BreadcrumbCustom from '../common/BreadcrumbCustom';
import { Mentions,Card, Avatar, Row, Col, Progress, Timeline, Collapse, Table, Icon } from 'antd';
import zysoft from '../../style/img/avatar.jpg';
import './userDasic.less';
import CountUp from 'react-countup';
import ReactEcharts from 'echarts-for-react';
import { StepBackwardOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
const { Option } = Mentions;

function getOptions() {
  return ['afc163', 'zombiej', 'yesmeck'].map(value => (
    <Option key={value} value={value}>
      {value}
    </Option>
  ));
}
const { Meta } = Card;

const Panel = Collapse.Panel;
const columns = [
    { title: '', width: '35%', dataIndex: 'img', key: 'img'},
	{ title: '', width: '15%', dataIndex: 'name', key: 'name'},
    { title: '', width: '60%', dataIndex: 'written', key: 'written', className:'column-written' },
];
const data = [{
    key: '2',
    img: <Avatar style={{ backgroundColor: '#7265e6' }}>X</Avatar>,
    name: '性别',
    written: '女',
},{
    key: '3',
    img: <Avatar style={{ backgroundColor: '#ffbf00' }}>N</Avatar>,
    name: '年龄',
    written: '23',
},{
    key: '4',
    img: <Avatar style={{ backgroundColor: '#00a2ae' }}>D</Avatar>,
    name: '地址',
    written: '江苏省 / 南京市 / 栖霞区',
},{
    key: '5',
    img: <Avatar style={{ backgroundColor: '#48ae6a' }}>S</Avatar>,
    name: '手机',
    written: '18745896565',
},{
    key: '6',
    img: <Avatar style={{ backgroundColor: '#ae007c' }}>Y</Avatar>,
    name: '邮箱',
    written: 'zx123@qq.com',
}];

export default class MIndex extends Component {
    CountUp(){
        let imgSrc = ["mail","chat","cart","heart"];
        let imgName = ["Mails","Dialogue","Carts","Collection"];
        let count = ["1379","768","192","413"];
        let cu = imgSrc.map(function(item,index){
            return(
                <Col md={6} key={item}>
                    <Card style={{cursor:'pointer', marginBottom:16}}
                          actions={[<Icon type="info-circle-o" />, <Icon type="ellipsis" />]}>
                        <Meta
                            style={{fontSize:22}}
                            avatar={<img src={require('../../style/img/'+item+'.png')} alt=""/>}
                            title={imgName[index]}
                            description={<CountUp start={0} end={count[index]} duration={2.75}/>}
                        />
                    </Card>
                </Col>
            )
        });
        return cu;
    }
    render() {
        return (
            <div>
                <BreadcrumbCustom paths={['首页','个人中心']}/>
                <div className='mindex'>	
                    <Row gutter={16}>
                        <Col md={24}>
                            <Card
                                style={{marginBottom:16}}
                                bodyStyle={{padding: 0}}>
                                <div className='avatar'>
                                    <Avatar
                                        shape='circle'
                                        src={zysoft}
                                        style={{width: '80px', height: '80px', borderRadius: '50%', marginBottom:16}}
                                    />
                                    <div><h3>zysoft</h3></div>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={24}>
                            <Card>
                                <Table
                                    columns={columns}
                                    dataSource={data}
                                    scroll={false}
                                    pagination = {false}
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
   