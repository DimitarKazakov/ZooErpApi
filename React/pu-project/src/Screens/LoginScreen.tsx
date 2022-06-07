import React from 'react';
import { Button, Col, Form, Input, Row, Image } from 'antd';
import { nameof } from 'ts-simple-nameof';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import { LoginRequest } from '../Types/LoginRequest';
import { logIn, isAuthenticated } from '../Utils/authentication';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const LoginScreen = () => {
  const history = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      console.log(isAuthenticated());
      history('/');
    }
  });

  const [form] = Form.useForm();

  const onFinish = async (values: LoginRequest) => {
    logIn(values, history);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Row justify="center" align="top" style={{ minHeight: '100vh' }}>
      <Col span={8}>
        <Image
          preview={false}
          width="40vw"
          src="https://i.pinimg.com/originals/8c/a6/49/8ca649e7b26a6297995ae6851bbbbd4d.png"
        />
        <Form
          {...layout}
          form={form}
          name="LoginForm"
          onFinish={async () => onFinish(form.getFieldsValue())}
        >
          <Form.Item
            name={nameof<LoginRequest>((x) => x.username)}
            label="Username"
            rules={[{ required: true }]}
          >
            <Input placeholder="write your username..." />
          </Form.Item>
          <Form.Item
            name={nameof<LoginRequest>((x) => x.password)}
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password
              placeholder="write your password..."
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button htmlType="button" onClick={onReset} style={{ marginRight: '10px' }}>
              Reset
            </Button>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
