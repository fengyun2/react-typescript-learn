import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Space, theme } from 'antd';
import type { TableParams } from './interface';

interface IProps {
  onSearch?: (params: TableParams) => void;
}

const GenderList = [
  {
    value: 'male',
    label: '男',
  },
  {
    value: 'female',
    label: '女',
  },
];

const QueryFilter = (props: IProps) => {
  const { onSearch } = props;
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [expand, setExpand] = useState(false);

  const formStyle: React.CSSProperties = {
    maxWidth: 'none',
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };

  const getFields = () => {
    const children = [];
    children.push(
      <Col span={8} key={'gender'}>
        <Form.Item name='gender' label='性别'>
          <Select options={GenderList} placeholder='请选择性别' />
        </Form.Item>
      </Col>
    );
    children.push(
      <Col span={8} key={'password'}>
        <Form.Item name='password' label='密码'>
          <Input placeholder='请输入密码' />
        </Form.Item>
      </Col>
    );
    return children;
  };

  const onFinish = (values: TableParams) => {
    console.log('Received values of form: ', values);
    onSearch?.(values);
  };

  return (
    <Form form={form} name='advanced_search' style={formStyle} onFinish={onFinish}>
      <Row gutter={24}>{getFields()}</Row>
      <div style={{ textAlign: 'right' }}>
        <Space size='small'>
          <Button type='primary' htmlType='submit'>
            Search
          </Button>
          <Button
            onClick={() => {
              form.resetFields();
            }}
          >
            Clear
          </Button>
          <a
            style={{ fontSize: 12 }}
            onClick={() => {
              setExpand(!expand);
            }}
          >
            <DownOutlined rotate={expand ? 180 : 0} /> Collapse
          </a>
        </Space>
      </div>
    </Form>
  );
};

export default QueryFilter;
