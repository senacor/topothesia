import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { AmplifySignOut } from '@aws-amplify/ui-react';

Amplify.configure(awsconfig);

// You can get the current config object
const currentConfig = Auth.configure();
const { Header, Content, Footer } = Layout;

ReactDOM.render(
    <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%', paddingRight: 0 }}>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} >
                <Menu.Item key="1">Home</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
                <Menu.Item key="4" style={{ float: 'right', paddingRight: 0, paddingLeft: 0 }}>
                    <AmplifySignOut/>
                </Menu.Item>
            </Menu>
        </Header>
        <Content
            className="site-layout"
            style={{ padding: '0 50px', marginTop: 64 }}
        >
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 380 }}
            >
                {/*App Component*/}
                <App/>
            </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
        </Footer>
    </Layout>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
