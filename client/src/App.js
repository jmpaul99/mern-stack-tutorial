import React from "react";
import 'antd/dist/antd.css';
import {HomeOutlined, FileAddOutlined} from '@ant-design/icons';
import './index.css';

// We use Route in order to define the different routes of our application
import { Route, Link } from "react-router-dom";

// We import all the components we need in our app
import Edit from "./components/edit";
import Create from "./components/create";
import RecordList from "./components/recordList";
import { Layout, Menu, Col} from 'antd';

const { Header, Footer, Content } = Layout;

const App = () => {
  return (
    <div>
      <Layout className="layout">
    <Header>
      <div className="logo"/>
      <Menu theme="dark" mode="horizontal">
      <Menu.Item key="1"><Link to={"/"}><HomeOutlined/></Link></Menu.Item>
        <Menu.Item key="2"><Link to={"/create/"}><FileAddOutlined /></Link></Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '10px 50px' }}>
      <div className="site-layout-content">
      <Route exact path="/">
        <RecordList />
      </Route>
      <Route path="/edit/:id" component={Edit} />
      <Route path="/create">
        <Col lg={6} lg={4}>
        <h3>Create New Record</h3>
        <Create />
        </Col>
      </Route>
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Sample application created by Jeff Paulin</Footer>
  </Layout>,
    </div>
  );
};

export default App;