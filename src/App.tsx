import React, { useState } from 'react';
import DataTable from './components/DataTable';
import ExpenseTransactionsMonthlyAnalysis from './components/ExpenseTransactionsMonthlyAnalysis';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';


const { Header, Content, Sider } = Layout;

type MenuLabels = {
  [key: string]: string;
};

const topMenuLabels: MenuLabels = {
  'top0': 'Home',
  'top1': 'Simulations',
  'top2': 'Settings',
};

const topMenuItmes: MenuProps['items'] = ['top0', 'top1', 'top2'].map((key) => ({
  key,
  label: topMenuLabels[key],
}));


const items2: MenuProps['items'] = [
  {
    key: 'sub0',
    label: 'Expense',
    icon: React.createElement(UserOutlined),
    children: [
      {
        key: 'sub0option0',
        label: 'Full Table',
      },
      {
        key: 'sub0option1',
        label: 'Monthly',
      }
    ],
  },
];

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedKey, setSelectedKey] = useState('top0');

  // Handle the click event for menu items
  const handleMenuClick = (e) => {
    setSelectedKey(e.key); // Set the selected key when a menu item is clicked
  };

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['top0']}
          items={topMenuItmes}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]} // Keep the selected key for active state
            onClick={handleMenuClick} // Handle item click
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb
            items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
            style={{ margin: '16px 0' }}
          />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            { selectedKey === 'sub0option0' && <DataTable /> }
            { selectedKey === 'sub0option1' && <ExpenseTransactionsMonthlyAnalysis /> }
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
