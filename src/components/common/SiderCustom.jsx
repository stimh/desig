import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

export default class SiderCustom extends Component{
    constructor(props){
        super(props);
        const { collapsed }= props;
        this.state = {
            collapsed: collapsed,
            firstHide: true, //第一次先隐藏暴露的子菜单
            selectedKey: '', //选择的路径
            openKey: '', //打开的路径（选择的上一层）
        }
    }
    componentDidMount() {
        this.setMenuOpen(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.onCollapse(nextProps.collapsed);
        this.setMenuOpen(nextProps);
    }
    setMenuOpen = props => {
        const {path} = props;
        this.setState({
            openKey: path.substr(0, path.lastIndexOf('/')),
            selectedKey: path
        });
    };

    onCollapse = (collapsed) => {
        this.setState({
            collapsed,
            firstHide: collapsed,
        });
    };

    menuClick = e => {
        this.setState({
            selectedKey: e.key
        });
    };

    openMenu = v => {
        this.setState({
            openKey: v[v.length - 1],
            firstHide: false,
        })
    };

    render(){
        const { collapsed, firstHide, openKey, selectedKey } = this.state;
        return(
            <Sider
            trigger={null}
            collapsed={collapsed}
            >
                <div className="logo" style={collapsed?{backgroundSize:'70%'}:{backgroundSize:'30%'}}/>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    onClick={this.menuClick}
                    onOpenChange={this.openMenu}
                    openKeys={firstHide ? null : [openKey]}
                >

                    <Menu.Item key={"/app"}>
                        <Link to={"/app"}><Icon type="home" /><span>首页</span></Link>
                    </Menu.Item>
                    <Menu.Item key={"/app/form"}>
                        <Link to={"/app/form"}><Icon type="form" /><span>数据中心</span></Link>
                    </Menu.Item>
                    <SubMenu title={<span><Icon type="file-text"></Icon>基础属性数据</span>}>
                        <Menu.Item key="">
                            <Link to={''}><span>作战力量</span></Link>
                        </Menu.Item>
                        <Menu.Item key="">
                            <Link to={''}><span>指挥控制</span></Link>
                        </Menu.Item>
                        <Menu.Item key="">
                            <Link to={''}><span>战备工程</span></Link>
                        </Menu.Item>
                        <Menu.Item key="">
                            <Link to={''}><span>武器装备</span></Link>
                        </Menu.Item>
                        <Menu.Item key="">
                            <Link to={''}><span>政治工作</span></Link>
                        </Menu.Item>
                        <Menu.Item key="">
                            <Link to={''}><span>后勤保障</span></Link>
                        </Menu.Item>
                        <Menu.Item key="">
                            <Link to={''}><span>装备保障</span></Link>
                        </Menu.Item>
                        <Menu.Item key="">
                            <Link to={''}><span>综合保障</span></Link>
                        </Menu.Item>
                        <Menu.Item key="">
                            <Link to={''}><span>作战计算标准</span></Link>
                        </Menu.Item>
                        <Menu.Item key="">
                            <Link to={''}><span>战场环境</span></Link>
                        </Menu.Item>
                    </SubMenu>

                    <SubMenu title={<span><Icon type="file-text"></Icon>动态情况数据</span>}>
                        <Menu.Item key="">
                            <Link to={''}><span>作战力量动态情况数据</span></Link>
                        </Menu.Item>
                        <Menu.Item key="">
                            <Link to={''}><span>指挥控制活动</span></Link>
                        </Menu.Item>
                        <Menu.Item key="">
                            <Link to={''}><span>部队行动及重大事件数据</span></Link>
                        </Menu.Item>
                        <Menu.Item key="">
                            <Link to={''}><span>战场环境动态</span></Link>
                        </Menu.Item>
                    </SubMenu>

                    <SubMenu title={<span><Icon type="file-text"></Icon>决策支持数据</span>}>
                        <Menu.Item key="">
                            <Link to={''}><span>作战业务资料</span></Link>
                        </Menu.Item>
                        <Menu.Item key="">
                            <Link to={''}><span>作战能力指标数据</span></Link>
                        </Menu.Item>
                        <Menu.Item key="">
                            <Link to={''}><span>综合情况判断数据</span></Link>
                        </Menu.Item>
                        <Menu.Item key="">
                            <Link to={''}><span>作战态势分析数据</span></Link>
                        </Menu.Item>
                        <Menu.Item key="">
                            <Link to={''}><span>综合分析挖掘</span></Link>
                        </Menu.Item>
                        <Menu.Item key="">
                            <Link to={''}><span>作战效果评估数据</span></Link>
                        </Menu.Item>
                        <Menu.Item key="">
                            <Link to={''}><span>战场环境影响分析</span></Link>
                        </Menu.Item>
                    </SubMenu>

                    <SubMenu key={"/app"} title={<span><Icon type="setting"></Icon>管理中心</span>}>
                        <Menu.Item key={"/app/form"}>
                            <Link to={"/app/form"}><span>用户管理</span></Link>
                         </Menu.Item>
                         <Menu.Item key={""}>
                            <Link to={""}><span>组织机构管理</span></Link>
                         </Menu.Item>
                         <Menu.Item key={""}>
                            <Link to={""}><span>权限管理</span></Link>
                         </Menu.Item>
                         <Menu.Item key={""}>
                            <Link to={""}><span>角色管理</span></Link>
                         </Menu.Item>
                    </SubMenu>

                    <SubMenu title={<span><Icon type="user"></Icon>个人中心</span>}>
                        <Menu.Item key={""}>
                            <Link to={""}><span>基本信息</span></Link>
                         </Menu.Item>
                         <Menu.Item key={""}>
                            <Link to={""}><span>密码修改</span></Link>
                         </Menu.Item>
                         
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
}