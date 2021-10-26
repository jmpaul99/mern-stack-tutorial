import React from "react";

// We use Route in order to define the different routes of our application
import { Route } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import Edit from "./components/edit";
import Create from "./components/create";
import RecordList from "./components/recordList";
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const App = () => {
  return (
    <div style={{
      display: 'block', width: 700, padding: 30
    }}>
      <h4>ReactJS Ant-Design Layout Component</h4>
      <>
        <Layout>
          <Sider style={{ backgroundColor: 'grey' }}>
            Sample Sider
          </Sider>
          <Layout style={{ backgroundColor: 'lightblue' }}>
            <Header style={{ backgroundColor: 'green' }}>
              Sample Header
            </Header>
            <Content style={{ backgroundColor: 'yellow' }}>
              Sample Content
            </Content>
            <Footer style={{ backgroundColor: 'green' }}>
              Sample Footer
            </Footer>
          </Layout>
        </Layout>
      </>
    </div>
  );
};

export default App;