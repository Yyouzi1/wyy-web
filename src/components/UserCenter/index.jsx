import React, { useState, useEffect } from 'react'
import { Input, Button, Modal, Form, message, Avatar, Menu, Dropdown, Row, Tabs } from 'antd'
import { qrkey,qrCreate,qrCheck } from '../../api/user'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import QRCode  from 'qrcode.react';
let timer = null
const LoginDialog = (props) => {
    const { visible, setVisible } = props
    const { dispatch } = props    
    const layout = {
        labelCol: {
            span: 5,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 12,
        },
    };
    const { TabPane } = Tabs;
    const [loading, setLoading] = useState(false)
    const [qrUrl, setQrUrl] = useState('')
    const onFinish = async values => {
        setLoading(true)        
        try {
            await dispatch(actionCreators.login(values))                   
            setVisible(false)
        } catch (error) {            
            setLoading(false)
        }                
        
    };
       
    const handleTabChange = async (activeKey) => {
        if(activeKey == '2'){
            const {data:{unikey,code}} = await qrkey()            
            if (code == '200'){
                const {data:{qrurl}} = await qrCreate({key:unikey})                
                setQrUrl(qrurl)                
                timer = setInterval(async () => {
                    const {code,cookie} = await qrCheck({key:unikey})
                    if(code == 803){
                        localStorage.setItem('cookie', cookie)
                        message.success('登录成功');
                        dispatch(actionCreators.loginstatus())
                        setVisible(false)
                        clearInterval(timer)
                    }
                }, 3000);                
            }
        } else{
            clearInterval(timer)
        }
    }
    return (
        <Modal
            title="登录"
            visible={visible}
            footer={null}
            onCancel={() => { setVisible(false);clearInterval(timer) }}
        >
            <Tabs defaultActiveKey="1" onChange={handleTabChange}>
                <TabPane tab="账号登录" key="1">
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button onClick={() => { setVisible(false) }}>
                                取消
                            </Button>
                            <Button loading={loading} style={{ 'margin-left': '20px' }} type="primary" htmlType="submit">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </TabPane>
                <TabPane tab="二维码登录" key="2">
                    <QRCode value={qrUrl} />
                </TabPane>
            </Tabs>
        </Modal>
    )
}


const UserCenter = (props) => {    
    const {dispatch,userInfo} = props
    const [visible, setVisible] = useState(false)    
            
    useEffect(() => {           
        dispatch(actionCreators.loginstatus())        
    }, [])

    const handleLogout = () => {
        dispatch(actionCreators.logoutPatch())        
    }
    const handleDailySignin = () => {        
        dispatch(actionCreators.dailySigninPatch())
    }
    const menu = (
        <Menu>
            <Menu.Item>个人中心</Menu.Item>
            <Menu.Item onClick={handleDailySignin}>签到</Menu.Item>
            <Menu.Item danger onClick={handleLogout}>退出登录</Menu.Item>
        </Menu>
    )
    if (userInfo!=null) {
        return <>
            <Dropdown overlay={menu}>
                <Row wrap={false}>
                    <Avatar size="large" src={userInfo.avatarUrl} />
                    <span>{userInfo.nickname}</span>
                </Row>
            </Dropdown>
        </>
    } else {
        return (
            <>
                <Button style={{ 'margin-left': '20px' }} onClick={() => { setVisible(true) }}>登录</Button>
                <LoginDialog visible={visible} setVisible={setVisible} {...props} />
            </>
        )
    }
}
const mapStateToProps = state => ({
    userInfo: state.getIn(['user', 'userInfo']),
    
})

export default connect(mapStateToProps)(UserCenter)